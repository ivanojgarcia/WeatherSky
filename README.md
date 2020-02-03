# WheaterSky

The present project it consists of consuming a weather API and displaying the values ​​according to the City.

The project seeks to show the values ​​of the API being managed from the Backend through GraphQL and Angular 8 services.

The technology for endpoint manipulation and data insertion is GraphQL.

Likewise, the Server responsible for raising the application from the backend is Apollo Server

The technologies used to develop it were:.

  - Express
  - GraphQL
  - Apollo Server
  - NodeJS
  - Angular 8
  - Apollo Client
  - MongoDB (Atlas Cloud)

# Get started

Clone the repository
```sh
git clone https://github.com/ivanojgarcia/WeatherSky.git
```

Install developer dependencies (installation of dependencies from the package-json)

-First we start the server, for this we will do the following:

```sh
$ cd wheatersky
$ cd server
$ npm install
$ npm start
```
If is necesary can you delete the package-lock.json
### Installation of client

To start the client we just have to install the dependencies

```sh
$ cd wheatersky
$ cd client
$ npm install
$ npm start
```
With these configurations the server must be running locally, it is important to note that Mongodb must be installed and running before each step

### Configuration of MongoDB

You must to change the mongoURL in the file server/data/db.js in the variable baseUrl

License
----

MIT


**Thanks!**

