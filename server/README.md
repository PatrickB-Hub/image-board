# Image-Board Backend

An Express REST API service, and MongoDB database for [Image-Board](https://patrickb-hub.github.io/image-board/). See [Image-Board Frontend](https://github.com/PatrickB-Hub/image-board/tree/main/client) for the front end code and the [README](https://github.com/PatrickB-Hub/image-board/tree/main/README.md) for more details about the project.

## Table of Contents

- [Installing](https://github.com/PatrickB-Hub/image-board/tree/main/server/README.md#Installing)
- [Running](https://github.com/PatrickB-Hub/image-board/tree/main/server/master/README.md#Running)
- [Testing](https://github.com/PatrickB-Hub/image-board/tree/main/server/master/README.md#Testing)
- [Technologies](https://github.com/PatrickB-Hub/image-board/tree/main/server/master/README.md#Technologies)

## Installing

After you have forked the project and downloaded the code, install the necessary dependencies using [npm](https://docs.npmjs.com/about-npm/) or [yarn](https://yarnpkg.com/getting-started).

To install the packages through npm, run the command `npm install`

To install the packages through yarn, run the command `yarn add`

NOTE: In the rest of the documentation, you will come across npm being used for running commands. To use yarn in place of npm for the commands, simply substitute npm for yarn. Example, `npm start` as `yarn start`. For more help, checkout [migrating from npm](https://classic.yarnpkg.com/en/docs/migrating-from-npm/).

## Running

After installing dependencies run `npm run build` and create a Keypair consisting of a public and private key by running `node ./dist/generateKeypair.js`

### 1. Add environment variables

- See [.sample.env](https://github.com/PatrickB-Hub/image-board/tree/main/server/.sample.env) for reference.

### 2. Run `npm run dev` for development

## Testing

There are currently no tests. (This would be a great way to contribute!)

## Technologies

- [Docker](https://www.docker.com)
- [Node.js](https://www.nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](http://www.expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://www.mongoosejs.com/)
