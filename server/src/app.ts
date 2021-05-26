import express from "express";
import fileUpload from "express-fileupload";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import https from "https";
import cors from "cors";

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

app.use(cors());

app.use(router);
app.use('/static', express.static('public'));

if (!process.env.SSL_CERTIFICATE) {
  const port = process.env.EXPRESS_PORT || 8085;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} else {
  // OPTIONAL - SSL-Certificate
  const privateKey = fs.readFileSync('./privkey.pem', 'utf8');
  const certificate = fs.readFileSync('./cert.pem', 'utf8');
  const ca = fs.readFileSync('./chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  // OPTIONAL - only works with SSL-Certificate
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    console.log('Server running on port 443');
  });
}