# Introduction
This folder contains the source code for the solution to question 3. It is a web extension for chrome, 
that captures all requests sent by Chrome and forward them to our [backend](server/readme.md)
This extension provides also a simple popup UI to add whitelist URLs that will not be captured.

## Technologies
This plugin has been developed using [Vue.js](https://vuejs.org/) as framework. 
Other libraries have been used to build up this extension 
(an exhaustive list is available inside the [package.json](package.json))
Webpack and babel are used to package all different files in a single one.

## Get started
The easiest way to build this extension and start up the server is to using the script file [startup.sh](startup.sh).
It would generate the extension in the [dist folder](dist) and it will run the back-end server
(for more details check the [readme](server/readme.md)).  
Because of the strict rules of Google Chrome, you need to import the extension manually
(you can follow [this guide]((https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/)))
#### Prerequisites
- docker
- docker-compose
- curl or wget

## How to test the plugin (Development)
The first time you need to install all dependencies via [npm](https://nodejs.org/en/)/[yarn](https://yarnpkg.com/):
```
npm install
```
OR 
```
yarn
```
Now you are ready to build your application.
To compile it with hot-reloads for development environment:
 ```
npm run serve
```
OR
```
yarn serve
```
Then the compiled extension will be located inside the [dist folder](dist)
Now, you can install your unpacked extension in Chrome following [this guide]
(https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/)

## How to deliver the plugin (Production)
To compile the extension minified for production:
```
npm run build
```
OR
```
yarn build
```
Then you can import you compiled extension in Chrome following [this guide]
(https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/)

## How to trigger unit test
The unit test are based on [jest](https://jestjs.io/) wrapped with
[vue/cli-plugin-unit-jest](https://cli.vuejs.org/core-plugins/unit-jest.html).  
To execute trigger the unit test:
```
npm run test:unit
```
OR
```
yarn test:unit
```
## Lints and fixes files
To fix eventual errors raised by eslint:
```
npm run lint
```
OR
```
yarn lint
```
