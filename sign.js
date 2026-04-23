const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const privateKeyPath = path.join(__dirname, "private.pem");
const scriptPath = path.join(__dirname, "script.js");
const outputSigPath = path.join(__dirname, "script.sig");

const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const script = fs.readFileSync(scriptPath, "utf8");

const sign = crypto.createSign("SHA256");
sign.update(script);
sign.end();

const signature = sign.sign(privateKey, "base64");

fs.writeFileSync(outputSigPath, signature);

console.log("Script signé avec succès");