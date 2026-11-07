// ==============================================
// FREE ESPORTS BACKEND - Google Apps Script
// ==============================================

const SHEET_ID = 'YAHAN_SHEET_ID_DALO'; // Step 2 mein bataya hai
const ADMIN_KEY = 'change-this-secret-key-123';

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const action = e.parameter.action;
  const callback = e.parameter.callback;
  let result;

  try {
    switch (action) {
      case 'getTournaments': result = getTournaments(); break;
      case 'getPlayers': result = getPlayers(); break;
      case 'getRegistrations': result = getRegistrations(e.parameter.tournamentId); break;
      case 'join': result = joinTournament(e.parameter); break;
      case 'addTournament': result = addTournament(e.parameter); break;
      case 'deleteTournament': result = deleteTournament(e.parameter); break;
      case 'updateKills': result = updateKills(e.parameter); break;
      case 'getLeaderboard': result = getLeaderboard(); break;
      default: result = { error: 'Unknown action' };
    }
  } catch (err) {
    result = { error: err.toString() };
  }

  const output = JSON.stringify(result);
  // JSONP support (browser se call karne ke liye)
  return ContentService
    .createTextOutput(callback ? callback + '(' + output + ')' : output)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === 'Tournaments') {
      sheet.appendRow(['id','name','game','date','time','maxPlayers','prize','status']);
    } else if (name === 'Players') {
      sheet.appendRow(['id','name','uid','phone','coins','kills','matches','joinedAt']);
    } else if (name === 'Registrations') {
      sheet.appendRow(['id','tournamentId','playerId','joinedAt']);
    }
  }
  return sheet;
}

function sheetToJson(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

// ==================== TOURNAMENTS ====================
function getTournaments() {
  const tours = sheetToJson(getSheet('Tournaments'));
  const regs = sheetToJson(getSheet('Registrations'));
  return tours.map(t => ({
    ...t,
    joined: regs.filter(r => r.tournamentId === t.id).length
  }));
}

function addTournament(p) {
  if (p.key !== ADMIN_KEY) return { error: 'Unauthorized' };
  if (!p.name || !p.game || !p.date || !p.time || !p.maxPlayers || !p.prize) {
    return { error: 'Missing fields' };
  }
  const sheet = getSheet('Tournaments');
  const id = 't' + Date.now();
  sheet.appendRow([id, p.name, p.game, p.date, p.time, +p.maxPlayers, p.prize, 'open']);
  return { ok: true, id };
}

function deleteTournament(p) {
  if (p.key !== ADMIN_KEY) return { error: 'Unauthorized' };
  const sheet = getSheet('Tournaments');
  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === p.id) sheet.deleteRow(i + 1);
  }
  return { ok: true };
}

// ==================== PLAYERS ====================
function getPlayers() {
  return sheetToJson(getSheet('Players')).map(p => ({
    id: p.id, name: p.name, uid: p.uid, coins: p.coins,
    kills: p.kills, matches: p.matches,
  }));
}

function getLeaderboard() {
  const players = getPlayers();
  players.sort((a, b) => b.kills - a.kills);
  return players.slice(0, 50);
}

function updateKills(p) {
  if (p.key !== ADMIN_KEY) return { error: 'Unauthorized' };
  const sheet = getSheet('Players');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === p.playerId) {
      const newKills = +data[i][5] + (+p.kills || 0);
      const newCoins = +data[i][4] + (+p.kills || 0) * 7; // ₹7 = 7 coins
      sheet.getRange(i + 1, 5, 1, 2).setValues([[newCoins, newKills]]);
      return { ok: true, newKills, newCoins };
    }
  }
  return { error: 'Player not found' };
}

// ==================== REGISTRATIONS ====================
function getRegistrations(tournamentId) {
  return sheetToJson(getSheet('Registrations'))
    .filter(r => !tournamentId || r.tournamentId === tournamentId);
}

function joinTournament(p) {
  const name = (p.name || '').trim();
  const uid = (p.uid || '').trim();
  const phone = (p.phone || '').trim();
  const tournamentId = p.tournamentId;

  if (!name || !uid || phone.length !== 10 || !tournamentId) {
    return { error: 'Invalid fields' };
  }

  // Check tournament full
  const tours = getTournaments();
  const tour = tours.find(t => t.id === tournamentId);
  if (!tour) return { error: 'Tournament not found' };
  if (tour.joined >= tour.maxPlayers) return { error: 'Tournament full' };

  // Check player exists or create
  const playerSheet = getSheet('Players');
  const playerData = playerSheet.getDataRange().getValues();
  let playerId = null;

  for (let i = 1; i < playerData.length; i++) {
    if (playerData[i][2] === uid) { playerId = playerData[i][0]; break; }
  }

  if (!playerId) {
    playerId = 'p' + Date.now();
    playerSheet.appendRow([playerId, name, uid, phone, 0, 0, 0, new Date().toISOString()]);
  }

  // Check duplicate registration
  const regSheet = getSheet('Registrations');
  const regData = regSheet.getDataRange().getValues();
  for (let i = 1; i < regData.length; i++) {
    if (regData[i][1] === tournamentId && regData[i][2] === playerId) {
      return { error: 'Already registered' };
    }
  }

  const regId = 'r' + Date.now();
  regSheet.appendRow([regId, tournamentId, playerId, new Date().toISOString()]);
  return { ok: true, playerId, regId };
}

// ==================== SETUP HELPER ====================
function setupSheets() {
  getSheet('Tournaments');
  getSheet('Players');
  getSheet('Registrations');
  return 'Sheets created';
}
