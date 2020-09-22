FROM node:latest AS stage

WORKDIR /workdir

COPY src /workdir/src

COPY public /workdir/public

COPY .editorconfig .eslintrc.js package.json vue.config.js babel.config.js /workdir/

RUN yarn && yarn build

RUN cp -r ./dist /dist
