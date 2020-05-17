import fs from "fs";
import path from "path";
import { PassportStatic } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import User from "../models/user";

const privKeyPath = path.join(__dirname, "../", "id_rsa_pub.pem");
const privKey = fs.readFileSync(privKeyPath, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: privKey,
  algorithms: ["RS256"],
};

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, (jwtPayload, done) => {
      User.findById(jwtPayload.sub)
        .then(user => {
          if (!user)
            return done(null, false);

          return done(null, user);
        })
        .catch(err => done(err, false))
    })
  );
};