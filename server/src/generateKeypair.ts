import crypto from "crypto";
import fs from "fs";
import path from "path";

/**
 * This module will generate a public and private keypair and save them to the current directory
 */

function genKeyPair() {

  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem"
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem"
    },
  });

  fs.writeFileSync(path.join(__dirname, "id_rsa_pub.pem"), keyPair.publicKey);

  fs.writeFileSync(path.join(__dirname, "id_rsa_priv.pem"), keyPair.privateKey);
}

genKeyPair();