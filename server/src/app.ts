import express from "express";
import fileUpload from "express-fileupload";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

import configure from "./config/passport";
import router from "./routes/index";
import "./config/database";

const app = express();

// allow files to be uploaded (limited to 5mb)
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

configure(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use('/static', express.static('public'))

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});