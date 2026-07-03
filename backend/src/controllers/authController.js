const { readDb, writeDb, createId } = require("../utils/fileDb");
const {
  createToken,
  hashPassword,
  verifyPassword,
  publicUser,
} = require("../utils/auth");

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function signup(req, res) {
  const name = String(req.body.name || "").trim();
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || "");

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters.",
    });
  }

  const db = readDb();
  const exists = db.users.some((user) => user.email === email);

  if (exists) {
    return res.status(409).json({
      success: false,
      message: "Email already exists.",
    });
  }

  const passwordData = hashPassword(password);
  const user = {
    id: createId("usr"),
    name,
    email,
    passwordHash: passwordData.hash,
    passwordSalt: passwordData.salt,
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDb(db);

  return res.status(201).json({
    success: true,
    message: "Account created successfully.",
    user: publicUser(user),
    token: createToken(user),
  });
}

function login(req, res) {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || "");

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  const db = readDb();
  const user = db.users.find((item) => item.email === email);

  if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  return res.json({
    success: true,
    message: "Logged in successfully.",
    user: publicUser(user),
    token: createToken(user),
  });
}

function me(req, res) {
  return res.json({
    success: true,
    user: req.user,
  });
}

module.exports = {
  signup,
  login,
  me,
};
