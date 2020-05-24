import * as express from "express";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";

import Post from "../models/post";

const router = express.Router();

router.post("/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.files) {
      res.status(400).json({ success: false, msg: 'No file uploaded.' });

    } else {
      if (req.user) {
        const file: any = req.files.file;

        const { _id, username } = req.user;
        const fileName = uuidv4();

        // move image to upload folder
        file.mv(`./public/${fileName}.jpg`, (err: any) => {
          if (err) {

            console.error(err);
            res.status(500).json({ success: false, msg: "Internal server error" });
          } else {

            const camera = req.body.camera.trim();
            const location = req.body.location.trim();
            const description = req.body.description.trim();
            const filePath = `/static/${fileName}.jpg`;

            const newPost = new Post({
              camera,
              location,
              description,
              filePath,
              user: _id,
              rating: { overallRating: 0, totalRating: 0, individualRatings: [] },
              comments: []
            });

            newPost.save()
              .then(post => {
                let modPost = post.toObject();
                modPost.user = { _id, username };
                res.status(200).json({ success: true, post: modPost })
              })
              .catch(err => console.log(err))
          }
        });
      }
    }
  });


export default router;