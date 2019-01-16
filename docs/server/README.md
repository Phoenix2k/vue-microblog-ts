Server
======
> Source files: `src/server`

The server is build on top of [Node][node-js] using the [Express][express] framework and [Mongoose][mongoose] for handling the [MongoDB][mongodb] side of things.

I chose [Mongoose][mongoose], because it had some extra features I was looking for such [schemas][mongoose-schemas] and [validation][mongoose-validation] and [Express][express], since it's been around forever and it had all the extra typings for TypeScript needed for development.

The source files for the server are located under the `src/server` folder and are served locally using [Nodemon][nodemon] and [TS-Node][ts-node].

## API
Apart from serving the static files generated by the Vue CLI, the Node server also has an important role in providing the endpoints the client uses to communicate with the database.

### Base URL
`/api`

Since this is a rather simple project, it currently only has a single enpoint which handles all basic CRUD commands that you would expect: `POST`, `GET`, `PUT` and `DELETE`.

### DELETE
Deletes an existing post:
```php
DELETE /api
```

#### Params
| Params | Type     | Description
|:------:|:--------:|:-----------
| postId | `String` | ID of the post being deleted

#### Response code
| Code | Description
|:----:|:------------
| 200  | Post successfully deleted
| 404  | `postId` not found
| 500  | Server not available

#### Return
Response code only.

### `GET`
Gets all the posts from the collection:
```php
GET /api
```

#### Response code
| Code | Description
|:----:|:------------
| 200  | Request OK
| 500  | Server not available

#### Return
Type: `JSON` or `Error`

### `POST`
Adds a post to the collection:
```php
POST /api
```

#### Params
| Params | Type     | Description
|:-------|:--------:|:-----------
| body   | `String` | Body text
| title  | `String` | Title of the post

Mongoose will automatically check the values and add both the `createdAt` date and `_id` values if everything cheks out.

#### Response code
| Code | Description
|:----:|:------------
| 201  | Post created
| 500  | Server not available

#### Return
Response code only.

### `PUT`
Updates an existing post:
```php
PUT /api
```

#### Params
| Params | Type     | Description
|:------:|:--------:|:-----------
| postId | `String` | ID of the post being deleted

#### Response code
| Code | Description
|:----:|:-------------------------
| 200  | Post successfully updated
| 500  | Server not available

#### Return
Response code only.

## Commands
The following commands are meant to be run from the root of the project.

### Development
Serve with watch service:
```bash
$ npm run dev:server
```
The server will be available at `http://localhost:5000`.

### Linting files for errors
Check for errors:
```bash
$ npm run lint:server
```

Fix errors automatically:
```bash
$ npm run lint:fix:server
```
This will mainly fix aesthetic issues reported by [TSLint][tslint]. If you have actual errors in your code, you will need to fix them manually.

The `tslint.conf` configuration file is shared between both the client and server and can be found in the root of the project.

### Testing
See the [testing section](../home/#testing) in the main documentation.

### Building for production
Build the server for production:
```bash
$ npm run build:server
```
The production files will be available under the `dist/server` folder.

See the [main documentation](../home/#building-for-production) for more details on how to start the server.

[express]: https://expressjs.com "Express - Fast, unopinionated, minimalist web framework for Node.js"
[mongodb]: https://www.mongodb.com "MongoDB"
[mongoose]: https://mongoosejs.com/ "Elegant mongodb object modeling for node.js"
[mongoose-schemas]: https://mongoosejs.com/docs/guide.html "Mongoose schemas"
[mongoose-validation]: https://mongoosejs.com/docs/validation.html "Mongoose validation"
[nodemon]: https://nodemon.io/ "Nodemon is a utility that will monitor for any changes in your source and automatically restart your server"
[node-js]: https://nodejs.org/ "Node.js"
[ts-node]: https://github.com/TypeStrong/ts-node "TypeScript execution and REPL for Node.js"
[tslint]: https://palantir.github.io/tslint/ "An extensible linter for the TypeScript language."
[typescript]: https://www.typescriptlang.org "TypeScript"