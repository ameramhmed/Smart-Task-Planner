const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "..", "..", "data", "db.json");
const DEFAULT_DB = { users: [], tasks: [] };

function ensureDbFile() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
  }
}

function readDb() {
  ensureDbFile();

  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    const db = JSON.parse(raw || "{}");

    return {
      users: Array.isArray(db.users) ? db.users : [],
      tasks: Array.isArray(db.tasks) ? db.tasks : [],
    };
  } catch (error) {
    const backupPath = `${DB_PATH}.corrupted-${Date.now()}`;
    if (fs.existsSync(DB_PATH)) fs.copyFileSync(DB_PATH, backupPath);
    fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
    return { ...DEFAULT_DB };
  }
}

function writeDb(db) {
  ensureDbFile();
  const safeDb = {
    users: Array.isArray(db.users) ? db.users : [],
    tasks: Array.isArray(db.tasks) ? db.tasks : [],
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(safeDb, null, 2));
}

function resetDb() {
  ensureDbFile();
  fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
}

function createId(prefix) {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
}

module.exports = {
  readDb,
  writeDb,
  resetDb,
  createId,
};
