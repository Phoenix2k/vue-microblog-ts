Client
======
> Source files: `src/client`

The client was originally built with [Vue CLI 3][vue-cli] using the [TypeScript][typescript] variation as a starting point and later heavily modified to fit the needs of this project.

Most of the original files and functions are still here, but you will most likely find them in different places as I needed to make space for the server files and avoid clashes between configurations and build processes.

The project was originally set up with the following options:
* [Cypress][cypress] for end-to-end testing
* [Jest][jest] for unit testing
* Progressive Web App ([PWA][pwa]) Support
* [Sass][sass] for style compilation
* [TSLint][tslint] for handling errors
* [Vue Router][vue-router] for handling routes
* [Vuex][vuex] for state handling

## Commands

All of the following commands are also available using Vue's GUI tool. I strongly recommend trying it out as it gives you a better understanding of how the Vue app is performing:
```bash
$ npm run vue:ui
```

### Development
Serve with hot reload:
```bash
$ npm run dev:client
```
The client will be available at `http://localhost:8080/` or a different port if you have multiple sessions running the same time. The development instance can also be accessed using your local IP address, which it will display when starting the task.

### Linting files for errors
Check for errors:
```bash
$ npm run lint:client
```

Fix errors automatically:
```bash
$ npm run lint:fix:client
```
This will mainly fix aesthetic issues reported by [TSLint][tslint]. If you have actual errors in your code, you will need to fix them manually.

The `tslint.conf` configuration file is shared between both the client and server and can be found in the root of the project.

### Testing
See the [testing section](../home/#testing) in the main documentation.

### Building for production
Build the client for production:
```bash
$ npm run build:client
```
This will compile all the source files from `src/vue` and place them under the `dist/public` folder in the root of the project.

#### Small side note
The `public` folder located in the root of the project is used by Vue to generate the static files under the `dist` folder. I initially moved it under the `src` folder to make it more obvious that these were *raw files* used to create the actual files served in production, but the Vue CLI insisted on creating an empty folder in the root so I moved it back to where Vue though it should be.

At the time of writing, it was possible to specify a custom directory in the `vue.config.js` file, but the CLI would crash if an empty public folder was not present in the root. I got around this by creating one on-the-fly and removing it later when the scripts had finished running, but it seemed a bit hacky and way too much trouble for what it was worth. See [this commit](https://github.com/Phoenix2k/vue-microblog-ts/commit/fd67f214f3681b9739f1a98c89206a824908bf60#diff-0e893b3578ae3d5c8b98bac1c80756a7) for the initial configuration.

For a better understanding on how to build this for production, see the [main documentation](../home/#building-for-production).

[cypress]: https://www.cypress.io/ "Fast, easy and reliable testing for anything that runs in a browser."
[jest]: https://jestjs.io/ "Delightful JavaScript Testing"
[pwa]: https://en.wikipedia.org/wiki/Progressive_Web_Apps "Progressive Web Apps"
[sass]: https://sass-lang.com/ "CSS with superpowers"
[tslint]: https://palantir.github.io/tslint/ "An extensible linter for the TypeScript language."
[vue-cli]: https://cli.vuejs.org/ "Standard Tooling for Vue.js Development"
[vue-router]: https://router.vuejs.org/ "The official router for Vue.js"
[vuex]: https://vuex.vuejs.org/ "State management pattern + library for Vue.js applications"
[typescript]: https://www.typescriptlang.org "TypeScript"
