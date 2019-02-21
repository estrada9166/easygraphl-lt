# easygraphql-lt

This a client and a server used to run load testing to a GraphQL server using [easygraphql-load-tester](https://github.com/EasyGraphQL/easygraphql-load-tester).

<img src='https://cl.ly/7f5b55d30a5c/Screen%252520Recording%2525202019-02-20%252520at%25252010.51%252520PM.gif' />>

## How it works.

clone this repo:
```bash
$ git clone
```

On one terminal open the front and install the package, then run.
```bash
$ cd front
$ npm i
$ npm run dev
```


On the other terminal open the server and install the package, then run.
```bash
$ cd server
$ npm i
$ npm run dev
```

Then on the client, set the URL, duration, arrival rate and used arguments (*It should be a JSON*).
