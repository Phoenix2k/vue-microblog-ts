# Deploying to Heroku
This project could be deployed in a number of ways, but for this excercise I decided to stick with Heroku, since it makes deploying Node apps very easy and free.

You can do the following steps using the [Heroku dashboard][heroku-dashboard], but since you will need the [Heroku CLI][heroku-cli] to push the production files to the cloud, you might as well get started in the terminal.

## Getting started
1. Create an account on [Heroku][heroku]

2. Download and install the [Heroku CLI][heroku-cli]

3. Log-in with your credentials:
```bash
$ heroku login
```

4. Create a new application:
```bash
$ heroku apps:create --region eu
```
If you're in the US or elsewhere, you can view a full list of available regions [here][heroku-regions]. Locations marked [Private Spaces][heroku-private-spaces] are only available for [Heroku Enterprise][heroku-enterprise] accounts.

5. Open your local `.env` file and replace the name of the app in `HEROKU_APP=your-app-name`

6. Add the free *Sandboxed* version of the [mLab add-on][mlab-addon] by replacing `your-app-name` with the name of your app in the following command:
```bash
$ heroku addons:create mongolab --app your-app-name
```

7. Get the `MONGODB_URI`:
```bash
$ heroku config
```

8. Copy the `MONGODB_URI` to your local `.env` file and you should be good to go.

## Pushing to Heroku
Start the deployment:
```bash
$ npm run deploy:heroku
```
This will automatically build the current project and deploy the compiled files using a simplified version of `package.json` located in the `dist` folder. The process should abort if there are any errors or something is missing from the `.env` file.

You might get prompted for your login information again as it uses a temporary Git repository to push the content to Heroku.

The entire process should take about 45 seconds to complete.

## Deployment process explained
There were several different approaches I could have taken to deploy this project to Heroku:
1. Push the entire project to Heroku and let it do all the work
>This turned out to be too slow and frankly made less sense at every push when I tried to make it work.
2. Create a release using [GitHub releases][github-releases] and instruct Heroku to fetch the files from there
>This felt a bit too official and would have involved spending more time learning how the releases API works to automate the process.
3. Create a [tarball][tarball], figure out a place to host it and instruct Heroku to fetch the compiled project from there
>Again, a lot of work and the need to have extra hosting for the tar files.
4. Create a separate branch in the same Git repository as this project and create a new commit with only the static files included
>Switching back and forth between a master branch and a deployment branch didn't seem very logical.
5. Create a temporary Git on the local machine and push the compiled files from there
>A bit hacky, but it turned out to be the easiest choice by far

At first I would have been perfectly happy pushing the entire project to Heroku without the production files included hoping that Heroku would be able to build them on-the-fly using the versions specified in the `package.json` file and serve the generated files after the build process was complete. This had some unforseen obstacles such as not working and being extremely slow, but more importantly it exposed the whole process to a variety of side-effects that were out of my control.

The whole point in deploying a production-ready application is to have it tested, built and re-tested before pushing it somewhere where it can do its magic. Having Heroku do all the hard work seemed pointless, since it had already been done and tested. All that was needed was to figure out a way to push the compiled files to the remote server.

As I was going through the documentation for [VuePress][vuepress], I came over their long list of [deployment methods][vuepress-deployment] and created my own script that did more or less the same. What VuePress does is to nuke the `dist` folder entirely, regenerate it and have a script create a temporary Git repository inside it which pushes the built files to a remote Git repository where they get served as static files on the web.

Here's what I came up with:

<<< @/scripts/deploy-heroku.bash

Hopefully this example will have given you ideas on how to push your own files to production. If you've figured out an even easier way to do this or see something wrong with this process, please drop me a line in the [issues](https://github.com/Phoenix2k/vue-microblog-ts/issues) section here on GitHub.

Big thanks to the VuePress team for pointing me in the right direction!

[github-releases]: https://help.github.com/articles/creating-releases/ "GitHub Releases"
[heroku]: https://www.heroku.com/ "Heroku CLI"
[heroku-cli]: https://toolbelt.heroku.com/ "Heroku CLI"
[heroku-dashboard]: https://dashboard.heroku.com/ "Heroku Dashboard"
[heroku-enterprise]: https://www.heroku.com/enterprise "Heroku Enterprise"
[heroku-private-spaces]: https://devcenter.heroku.com/articles/private-spaces "Heroku Private Spaces"
[heroku-regions]: https://devcenter.heroku.com/articles/regions "Heroku regions"
[mlab-addon]: https://elements.heroku.com/addons/mongolab "mLab MongoDB"
[tarball]: https://en.wikipedia.org/wiki/Tar_(computing) "Tarball"
[vuepress]: https://vuepress.vuejs.org/ "Vue-powered Static Site Generator"
[vuepress-deployment]: https://vuepress.vuejs.org/guide/deploy.html "VuePress deployment"
