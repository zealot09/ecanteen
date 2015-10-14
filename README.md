# ecanteen
a simple sample with express, backbone, mongo, just offer api &amp; frontend

## ecanteenadmin
  based on [ng-admin](https://github.com/marmelab/ng-admin), restful API from ecanteenapi

  get started:
  1. `cd /ecanteenadmin`
  2. `npm install -d`
  3. `cd /ecanteenadmin/public`
  4. `bower install`
  5. `cd /ecanteenadmin & npm start`

## ecanteenapi
  provide some administration api for the ecanteenadmin
  provide some client api for the ecanteenapp
  auth with [jwt-simple](https://github.com/hokaccha/node-jwt-simple)
  using mongodb

  get started:
  1. ensure your local mongodb is running and config the mongodb database
  2. `cd /ecanteenapi`
  3. `npm install -d`
  4. `npm start`

## ecanteenapp
  provide desktop version and mobile version, major on mobile,
  using backbone & requirejs

  get started:
  1. `cd /ecanteenapp`
  2. `npm install -d`
  3. `npm start`
