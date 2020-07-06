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
  const expiresIn = Date.now() + 2 * 84600 * 1000;
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

/**
 * 
 * @param currOverallRating - The overall rating.  
 * @param totalRating - The number of users that rated.  
 * @param individualRatings - Array with userIds and ratings. 
 * @param newRating - The new Rating.  
 * @param currentUserId - The id of the logged in user, that is rating the post.  
 *  
 * We use this to update the rating whenever a user rates a post.
 * 
 */
const calcOverallRating = (
  overallRating: number,
  totalRating: number,
  individualRatings: {
    userId: string;
    rating: number;
  }[],
  newRating: number,
  currentUserId: string) => {

  const existingUserIndex = individualRatings.findIndex(rating => rating.userId.toString() === currentUserId.toString());
  const existingUserRating = (existingUserIndex !== -1) ? individualRatings.splice(existingUserIndex, 1) : [];

  const newRatingObj = {
    overallRating,
    totalRating,
    individualRatings
  };

  if (existingUserRating.length === 0) {
    newRatingObj.overallRating = ((overallRating * totalRating) + newRating) / (totalRating + 1);
    newRatingObj.totalRating += 1;
    newRatingObj.individualRatings.push({ userId: currentUserId, rating: newRating });
  } else {
    newRatingObj.overallRating = ((overallRating * totalRating) + (newRating - existingUserRating[0].rating)) / (totalRating);
    newRatingObj.individualRatings.push({ userId: currentUserId, rating: newRating });
  }

  return newRatingObj;
}

export { validPassword, genPassword, issueJWT, calcOverallRating };

