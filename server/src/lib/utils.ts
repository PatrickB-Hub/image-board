import crypto from "crypto";
import fs from "fs";
import path from "path";
import jsonwebtoken from "jsonwebtoken";

const privKeyPath = path.join(__dirname, "../", "id_rsa_priv.pem");
const privKey = fs.readFileSync(privKeyPath, "utf8");

/**
 *
 * @param password - The plain text password
 * @param hash - The hash stored in the database
 * @param salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 * 
 */
const validPassword = (
  password: crypto.BinaryLike,
  hash: string,
  salt: crypto.BinaryLike
) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

/**
 *
 * @param password - The password string from the register form
 *
 * This function takes a plain text password and creates a salt 
 * and hash out of it. Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 */
const genPassword = (password: crypto.BinaryLike) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * @param id - The user id. 
 *  
 * We need this to set the JWT `sub` payload property to the MongoDB user ID
 * 
 */
const issueJWT = (id: string) => {

  // set to expire in 48 hours
  const expiresIn = Math.floor(Date.now() / 1000) + 2 * 84600;
  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, privKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

export { validPassword, genPassword, issueJWT };

