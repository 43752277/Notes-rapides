const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "keys");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

fs.writeFileSync(
  path.join(OUTPUT_DIR, "public.pem"),
  publicKey.export({ type: "pkcs1", format: "pem" })
);

fs.writeFileSync(
  path.join(OUTPUT_DIR, "private.pem"),
  privateKey.export({ type: "pkcs1", format: "pem" })
);

console.log("Clés générées dans /keys");