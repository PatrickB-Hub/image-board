# [Image-Board](https://patrickb-hub.github.io/image-board)

Post your images and see what your friends are posting. Comment and rate other posts. Register/Login functionality using JWT. Persistent data storage with MongoDB. The complete Backend is ready to be deployed as a docker container. See [Image-Board Backend](https://github.com/PatrickB-Hub/image-board/tree/main/server) for the back end code.

![Image-Board Posts](https://patrickbecker.me/static/media/image-board.1af3cbdb.jpg)

## Features

- Sign up or log in
- Post images with descriptions
- View posts by other users
- Search for users by name
- Follow users
- Filter for posts by followed users
- Comment and rate other users posts
- Delete your own posts
- Uses localy stored JWT for authentication

## Table of Contents

- [Installing](https://github.com/PatrickB-Hub/image-board/tree/main/README.md#Installing)
- [Running](https://github.com/PatrickB-Hub/image-board/tree/main/README.md#Running)
- [Testing](https://github.com/PatrickB-Hub/image-board/tree/main/README.md#Testing)
- [Technologies](https://github.com/PatrickB-Hub/image-board/tree/main/README.md#Technologies)

## Installing

After you have forked the project and downloaded the code, install the necessary dependencies using [npm](https://docs.npmjs.com/about-npm/) or [yarn](https://yarnpkg.com/getting-started).

To install the packages through npm, run the command `npm install`

To install the packages through yarn, run the command `yarn add`

NOTE: In the rest of the documentation, you will come across npm being used for running commands. To use yarn in place of npm for the commands, simply substitute npm for yarn. Example, npm start as yarn start. For more help, checkout [migrating from npm](https://classic.yarnpkg.com/en/docs/migrating-from-npm/).

### Environment Variables

**API**  
 `REACT_APP_API_URL` - backend url (i.e. - 'http://localhost:8085/api')

## Running

NOTE: The backend code should be running in order for the front end to behave correctly. See [Image-Board Backend](https://github.com/PatrickB-Hub/image-board/tree/main/server/README.md).

Make sure the necessary dependencies are installed, add environment variables, and type the command `npm start`

## Testing

There are currently no tests. (This would be a great way to contribute!)

## Technologies

- [React](https://www.reactjs.org/) ([Create React App](https://www.create-react-app.dev/))
- [React Redux](https://www.react-redux.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://www.material-ui.com/)
