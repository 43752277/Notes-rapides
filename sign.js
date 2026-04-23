const crypto = require("crypto");
const fs = require("fs");

const privateKey = fs.readFileSync("private.pem");
const data = fs.readFileSync("script.js");

const signature = crypto.sign("sha256", data, privateKey);

fs.writeFileSync("script.sig", signature.toString("base64"));

console.log("Script signé");