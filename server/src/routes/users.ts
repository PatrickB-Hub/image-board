import * as express from "express";
import passport from "passport";

import { validPassword, genPassword, issueJWT } from "../lib/utils";

import validateRegisterInput from "../validation/register";
import validateLoginInput from "../validation/login";

import User from "../models/user";


const router = express.Router();

router.post("/register", (req, res, next) => {
  const { isValid, errors } = validateRegisterInput(req.body)

  if (!isValid) {
    res.status(404).json({ success: false, errors });
    return;
  }

  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  try {
    newUser.save().then((user) => {
      const { email, createdAt } = user;
      res.json({ success: true, user: { email, createdAt } });
    });
  } catch (err) {
    res.json({ success: false, msg: "Could not write user to db." });
    next(err);
  }
});

// Validate an existing user and issue a JWT
router.post("/login", (req, res, next) => {
  const { isValid, errors } = validateLoginInput(req.body)

  if (!isValid) {
    res.status(404).json({ success: false, errors });
    return;
  }

  User.findOne({ email: req.body.email })
    .then((user) => {

      if (!user) {
        res.status(401).json({ success: false, errors: { email: `User: ${req.body.email} does not exist.` } });
        return;
      }

      const isValid = validPassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = issueJWT(user.id);

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({ success: false, errors: { password: "You entered the wrong password." } });
      }
    })
    .catch((err) => next(err));
});

router.get("/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    try {
      if (req.user) {
        const { _id, email, username } = req.user;
        res.status(200).json({
          success: true,
          user: {
            _id: _id,
            email,
            username
          }
        });
      }
    } catch (err) {
      next(err);
    }
  });

router.route("/follow")
  .post(
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      if (req.user) {
        const { _id } = req.user;
        const { profileId } = req.body;

        User.findOneAndUpdate({
          _id: _id
        }, {
          $push: { following: profileId }
        },
          { new: true })
          .then(user => {
            if (!user) {
              res.status(401).json({ success: false, msg: `Could not find user: ${_id}` });
              return;
            }

            User.findOneAndUpdate({
              _id: profileId
            }, {
              $push: { followers: _id }
            }, { new: true })
              .then(user => {
                if (!user) {
                  res.status(401).json({ success: false, msg: `Could not find profile: ${profileId}` });
                  return;
                }

                res.status(200).json({ success: true, userId: _id })
              })
              .catch(err => console.log(err))
          })
          .catch((err) => next(err));
      }
    });

router.route("/unfollow")
  .post(
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      if (req.user) {
        const { _id } = req.user;
        const { profileId } = req.body;

        User.findOneAndUpdate({
          _id: _id
        }, {
          $pull: { following: profileId }
        }, { new: true })
          .then(user => {
            if (!user) {
              res.status(401).json({ success: false, msg: `Could not find user: ${_id}` });
              return;
            }

            User.findOneAndUpdate({
              _id: profileId
            }, {
              $pull: { followers: _id }
            }, { new: true })
              .then(user => {
                if (!user) {
                  res.status(401).json({ success: false, msg: `Could not find profile: ${profileId}` });
                  return;
                }

                res.status(200).json({ success: true, userId: _id })
              })
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      }
    });

export default router;