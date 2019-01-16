vue-microblog-ts
================
> Simple microblogging service written in [TypeScript][typescript] that uses [Vue.js][vue-js] for the front-end and [Node.js][node-js] + [MongoDB][mongodb] for the back-end.

## Introduction
This is an example project showing how to build a JavaScript-based [CRUD][crud] [API][api] using [TypeScript][typescript] with some of the latest tools available.

::: warning
This is by no means ready for production and serves only to satisfy your curiosity in case you are planning on building something similar.
:::

## Background
I was originally inspired by [Brad Traversy][traversy-media]'s video series on how to create a [Full Stack Vue.js, Express & MongoDB][traversy-video] application and wanted to build something similar using TypeScript. With most of the popular front-end frameworks moving in that direction, I figured this was the perfect opportunity to see how [Vue][vue-js] is handling this transition after having initially made [this announcement][vue-blog-post-2017] back in 2017 and later [this revelation][vue-blog-post-2018] in 2018.

[TypeScript][typescript] happens to be a great choice when it comes to building JavaScript-based APIs, since it has very strong type support which comes in handy when dealing with data. It has the added benefit of giving you access to some of the latest features of JavaScript that are still in the planning phase, while still giving you full freedom to write plain old JS if you choose to do so.

At the time of writing (*October 2018*), the Vue project is still very much in a transition phase when it comes to TypeScript and I have to admit it took some time to piece things together. Documentation on how to tackle specific issues are still buried deep within GitHub issues and Stack Overflow discussions. Having said that, an experienced developer would have no trouble getting by as all the features are already there if you just know where to look.

Hopefully this project will provide you with some insight on how to use these new tools and how to structure your project in case you're thinking on embarking on a similar mission.

Feel free to submit an issue here on [GitHub](https://github.com/Phoenix2k/vue-microblog-ts/issues) if you have any questions. I'll do my best to share my experiences and redirect you to the right places in case I don't have the answers myself.

## How this works
This project is divided into two parts:

| Name       | Description                                                                                                                                          |
|:----------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Client** | Vue.js application used to display the content in the browser                                                                                        |
| **Server** | Node server in charge of serving the static content generated by the [Vue CLI][vue-cli] and the API endpoints used to communicate with the database |

During development, you will need to have both services running simultaneously in the background. In this scenario, you would load the address provided by the Vue CLI service to view your application, while the Node server would only act as a bridge between the client and the Mongo database.

In a production environment however, the Vue CLI service would no longer be needed as it would have generated a static version of the site which the Node server would be more than capable of serving itself, while still handling all the API calls to the database in the background.

You could take this a step further an install a third element such as [Nginx][nginx] to handle the static files, but as things stand this build was more than enough for what I set out to do.

## Project structure
```bash
├── babel.config.js        # Config for Babel
├── cypress.json           # Config for Cypress (e2e)
├── dist                   # Production files will be generated here
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json       # Custom instructions for deployment
│   ├── public             # Production client
│   └── server             # Production server
├── docs                   # VuePress documentation
├── jest.config.js         # Config for Jest (unit tests)
├── jest.setup.js          # Setup file Jest (unit tests)
├── node_modules           # Local dependencies
├── nodemon.json           # Config for Nodemon
├── package-lock.json
├── package.json
├── postcss.config.js
├── public                 # Raw files for serving the client
├── scripts                # Scripts for deployment
├── src                    # Source files
│   ├── client
│   └── server
├── tests                  # e2e and unit tests
├── tsconfig-server.json   # TypeScript config for server
├── tsconfig.json          # TypeScript config for Vue
├── tslint.json            # TSLint file for client and server
└── vue.config.js          # Vue config
```

## Getting started
Make sure your have all the requirements listed below before proceeding. I have only tested this in a MacOS environment, but all the tools used in this project are universal so you should have no trouble running these on Linux or Windows assuming you follow these instructions in the order provided.

## Requirements
* [Git][git]
* [Node Package Manager (npm)][npm]
* [Heroku CLI][heroku-cli] (optional)

You will only need the third option if you want to try and deploy this to the cloud using the methods described in the [Deployment](../deployment/) section.

## Installation
Open a terminal window and clone the repository:
```bash
$ git clone --depth=1 https://github.com/Phoenix2k/vue-microblog-ts.git
```

### Dependencies
Go to the newly created folder and install the project dependencies:
```bash
$ cd vue-microblog-ts
$ npm install
```
This will download all the files needed to compile and generate the source files as well as serve the content in development mode, which I suggest you do first before deploying this anywhere.

### Local environment
Create a local `.env` file based on the example provided with this project:
```bash
$ cp .env.example .env
```
This file holds the following information:
* `MONGODB_URI` address where the content is stored
* `NODE_ENV` lets the client and server know if are running in `development` or `production` mode
* `HEROKU_APP` tells the depoloyment script which app it should use if you choose to deploy this to Heroku

### Mongo database
You can set up the database either [locally][mongodb-install] or remotely on a server.

If you're just curious to test this out, you can easily set one up for free on [mLab][mlab] by creating an account and following their instructions or by adding it as an add-on to an existing application on [Heroku][heroku].

Once you have your database installed, replace the `MONGODB_URI` inside the `.env` file located in the root of the project. This will enable your local server to serve content to the client while you are running everything in development mode.

## Development
The source files are located under the `src` folder.

### Starting the services
You can start each service separetly in your browser using Vue's GUI tool:
```bash
$ npm run vue:ui
```
Activate both `dev:client` and `dev:server` tasks to get everything up and running.

Here's a list of the default addresses provided by each service:

| Name         | Address                   | Function
|:-------------|:------------------------- |:---------------------------------------------------------
| `dev:server` | http://localhost:5000/api | Provides API endpoints and communicates with the database
| `dev:client` | http://localhost:8080     | Serves content with hot-reload for the browser
| `vue:ui    ` | http://localhost:8000     | Manages tasks and scripts in the browser

See the [Client](../client/) and [Server](../server/) sections for more information.

If for some reason one of these instances is left running in the background after you're done testing, you can try to find it with this:
```bash
$ ps aux | grep node
```
Look for an application that points to this project, copy the `PID` and kill the process by replacing `1234` in the following command:
```bash
$ kill 1234
```

### Testing
This project comes with both end-to-end tests and unit tests.

#### End-to-end
[End-to-end][e2e] tests are used to test that the flow of the application is performing as designed from start to finish. For this project, I chose [Cypress][cypress] since it was one of the options provided by Vue CLI.

At the time of writing it only supports a [headless][headless-chrome] version of [Chrome][chrome] and while ideally you would test an application on a variety of browsers, the solution offered by Cypress was more than enough for this project.

To run the end-to-end tests, enter the following command:
```bash
$ npm run test:e2e
```
This will make sure the app is responding and that the [Vue Router][vue-router] is functionning properly.

The tests are located under the `tests/e2e` folder.

#### Unit testing
[Unit tests][unit-testing] are used to test various aspects of an application, from rendering components correctly to testing out actual functionality and state management.

The tests in this project are orchestrated by [Jest][jest] which was originally developed by [Facebook][facebook] for internal testing and later [released into the wild][jest-github] as an open source project.

To give this a spin, enter the following command in your terminal:
```bash
$ npm run test:unit
```
You can find the individual tests under the `tests/vue` folder.

## Building for production
Build both applications for production:
```bash
$ npm run build
```

Launch the production server:
```bash
$ cd dist
$ npm start
```
This will serve the static files from the `public` folder (also located under `dist`) and provide the necessary endpoints for the API.

::: tip
If you are planning on running the production versions from your local machine, you will need to make a copy of the root `.env` file to the `dist` folder in order for Node to understand how to connect to the database.

The contents of the `dist` folder is meant to be run in an actual production environment where these variables are already available.
:::

## Sources
* [Cypress documentation][cypress-docs]
* [Express documentation][express]
* [Full Stack Vue.js, Express & MongoDB][traversy-video] by [Traversy Media][traversy-media]
* [Heroku Dev Center][heroku-dev-center]
* [JSON API][json-api]
* [Jest documentation][jest-docs]
* [MDN Web Docs][mdn-web-docs]
* [Mongoose documentation][mongoose-docs]
* [Stack Overflow][stack-overflow] :pray:
* [TypeScript documentation][typescript]
* [TypeScript Node][ts-node]
* [TypeScript Node Starter][typescript-node-starter]
* [Vue.js][vue-js] + [TypeScript documentation][vue-ts]
* [Vue Class Component][vue-class-component]
* [Vue CLI documentation][vue-cli]
* [Vue Notification][vue-notification]
* [Vue Progressbar][vue-progressbar]
* [Vue Test Utils][vue-test-utils]
* [VuePress][vuepress] for generating this documentation
* [Vuex Mock Store][vuex-mock-store]
* [Vuex Property Decorator][vuex-property-decorator]

>This list doesn't contain the countless amount of GitHub issues I had to dig through to make this project work in TypeScript since the documentation is still being worked on, but thanks to everyone involved in making these wonderful things a reality!

## License
![MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

[api]: https://en.wikipedia.org/wiki/Application_programming_interface "Application programming interface"
[chrome]: https://www.google.com/chrome/ "Chrome browser"
[cypress]: https://www.cypress.io/ "Fast, easy and reliable testing for anything that runs in a browser"
[cypress-docs]: https://docs.cypress.io/ "Cypress documentation"
[e2e]: https://www.techopedia.com/definition/7035/end-to-end-test "Read more about end-to-end testing on Technopedia"
[express]: https://expressjs.com "Express - Fast, unopinionated, minimalist web framework for Node.js"
[facebook]: https://www.facebook.com/ "Facebook"
[crud]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete "Create, read, update and delete"
[headless-chrome]: https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md "Headless Chromium"
[heroku]: https://www.heroku.com/ "Heroku CLI"
[heroku-cli]: https://toolbelt.heroku.com/ "Heroku CLI"
[heroku-dev-center]: https://devcenter.heroku.com/ "Heroku Dev Center"
[git]: https://git-scm.com/ "Git version control"
[jest]: https://jestjs.io/ "Delightful JavaScript Testing"
[jest-docs]: https://jestjs.io/docs/en/getting-started "Jest documentation"
[jest-github]: https://github.com/facebook/jest "Jest on GitHub"
[mlab]: https://mlab.com/ "mLab"
[mongodb]: https://www.mongodb.com "MongoDB"
[mongodb-install]: https://docs.mongodb.com/manual/installation/ "Install MongoDB"
[mongoose]: https://mongoosejs.com/ "Elegant Mongodb object modeling for Node.js"
[mongoose-docs]: https://mongoosejs.com/docs/ "Mongoose documentation"
[json-api]: https://jsonapi.org/ "A specification for building APIs in JSON"
[mdn-web-docs]: https://developer.mozilla.org/ "MDN web docs"
[node-js]: https://nodejs.org/ "Node.js"
[nginx]: https://nginx.org/ "Nginx"
[npm]: https://www.npmjs.com/ "npm - The package manager for JavaScript"
[stack-overflow]: https://stackoverflow.com/ "Stack Overflow"
[tslint]: https://palantir.github.io/tslint/ "TSLint - An extensible linter for the TypeScript language"
[ts-node]: https://github.com/TypeStrong/ts-node "TypeScript execution and REPL for node.js, with source map support"
[traversy-media]: http://www.traversymedia.com/ "Traversy Media"
[traversy-video]: https://www.youtube.com/watch?v=j55fHUJqtyw&list=PLillGF-RfqbYSx-Ab1xWVanGKtowTsnNm "Full Stack Vue.js, Express & MongoDB"
[typescript]: https://www.typescriptlang.org "TypeScript"
[typescript-docs]: https://www.typescriptlang.org/docs/ "TypeScript documentation"
[typescript-node-starter]: https://github.com/Microsoft/TypeScript-Node-Starter "A starter template for TypeScript and Node"
[unit-testing]: https://en.wikipedia.org/wiki/Unit_testing "Read more about unit testing on Wikipedia"
[vue-blog-post-2017]: https://medium.com/the-vue-point/upcoming-typescript-changes-in-vue-2-5-e9bd7e2ecf08 "Upcoming TypeScript Changes in Vue 2.5"
[vue-blog-post-2018]: https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf "Plans for the Next Iteration of Vue.js"
[vue-class-component]: https://github.com/vuejs/vue-class-component "ES / TypeScript decorator for class-style Vue components"
[vue-cli]: https://cli.vuejs.org/ "Vue CLI - Standard Tooling for Vue.js Development"
[vue-js]: https://vuejs.org "Vue.js - The Progressive JavaScript Framework"
[vue-notification]: https://github.com/euvl/vue-notification "Vue.js 2 library for showing notifications"
[vue-progressbar]: https://github.com/hilongjw/vue-progressbar "A lightweight progress bar for Vue"
[vue-router]: https://router.vuejs.org/ "The official router for Vue.js"
[vue-test-utils]: https://vue-test-utils.vuejs.org/ "Vue Test Utils"
[vue-ts]: https://vuejs.org/v2/guide/typescript.html "Vue.js - TypeScript Support"
[vuex-mock-store]: https://github.com/posva/vuex-mock-store "Simple and straightforward Vuex Store mock for vue-test-utils"
[vuex-property-decorator]: https://github.com/kaorun343/vue-property-decorator "Vue.js and Property Decorator"
[vuepress]: https://vuepress.vuejs.org/ "Vue-powered Static Site Generator"