(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{198:function(e,t,a){"use strict";a.r(t);var s=a(0),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"deploying-to-heroku"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploying-to-heroku"}},[e._v("#")]),e._v(" Deploying to Heroku")]),e._v(" "),a("p",[e._v("This project could be deployed in a number of ways, but for this excercise I decided to stick with Heroku, since it makes deploying Node apps very easy and free.")]),e._v(" "),a("p",[e._v("You can do the following steps using the "),a("a",{attrs:{href:"https://dashboard.heroku.com/",title:"Heroku Dashboard",target:"_blank",rel:"noopener noreferrer"}},[e._v("Heroku dashboard"),a("OutboundLink")],1),e._v(", but since you will need the "),a("a",{attrs:{href:"https://toolbelt.heroku.com/",title:"Heroku CLI",target:"_blank",rel:"noopener noreferrer"}},[e._v("Heroku CLI"),a("OutboundLink")],1),e._v(" to push the production files to the cloud, you might as well get started in the terminal.")]),e._v(" "),a("h2",{attrs:{id:"getting-started"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[e._v("#")]),e._v(" Getting started")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Create an account on "),a("a",{attrs:{href:"https://www.heroku.com/",title:"Heroku CLI",target:"_blank",rel:"noopener noreferrer"}},[e._v("Heroku"),a("OutboundLink")],1)])]),e._v(" "),a("li",[a("p",[e._v("Download and install the "),a("a",{attrs:{href:"https://toolbelt.heroku.com/",title:"Heroku CLI",target:"_blank",rel:"noopener noreferrer"}},[e._v("Heroku CLI"),a("OutboundLink")],1)])]),e._v(" "),a("li",[a("p",[e._v("Log-in with your credentials:")])])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ heroku login\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[e._v("Create a new application:")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ heroku apps:create --region eu\n")])])]),a("p",[e._v("If you're in the US or elsewhere, you can view a full list of available regions "),a("a",{attrs:{href:"https://devcenter.heroku.com/articles/regions",title:"Heroku regions",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(". Locations marked "),a("a",{attrs:{href:"https://devcenter.heroku.com/articles/private-spaces",title:"Heroku Private Spaces",target:"_blank",rel:"noopener noreferrer"}},[e._v("Private Spaces"),a("OutboundLink")],1),e._v(" are only available for "),a("a",{attrs:{href:"https://www.heroku.com/enterprise",title:"Heroku Enterprise",target:"_blank",rel:"noopener noreferrer"}},[e._v("Heroku Enterprise"),a("OutboundLink")],1),e._v(" accounts.")]),e._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[a("p",[e._v("Open your local "),a("code",[e._v(".env")]),e._v(" file and replace the name of the app in "),a("code",[e._v("HEROKU_APP=your-app-name")])])]),e._v(" "),a("li",[a("p",[e._v("Add the free "),a("em",[e._v("Sandboxed")]),e._v(" version of the "),a("a",{attrs:{href:"https://elements.heroku.com/addons/mongolab",title:"mLab MongoDB",target:"_blank",rel:"noopener noreferrer"}},[e._v("mLab add-on"),a("OutboundLink")],1),e._v(" by replacing "),a("code",[e._v("your-app-name")]),e._v(" with the name of your app in the following command:")])])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ heroku addons:create mongolab --app your-app-name\n")])])]),a("ol",{attrs:{start:"7"}},[a("li",[e._v("Get the "),a("code",[e._v("MONGODB_URI")]),e._v(":")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ heroku config\n")])])]),a("ol",{attrs:{start:"8"}},[a("li",[e._v("Copy the "),a("code",[e._v("MONGODB_URI")]),e._v(" to your local "),a("code",[e._v(".env")]),e._v(" file and you should be good to go.")])]),e._v(" "),a("h2",{attrs:{id:"pushing-to-heroku"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pushing-to-heroku"}},[e._v("#")]),e._v(" Pushing to Heroku")]),e._v(" "),a("p",[e._v("Start the deployment:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" run deploy:heroku\n")])])]),a("p",[e._v("This will automatically build the current project and deploy the compiled files using a simplified version of "),a("code",[e._v("package.json")]),e._v(" located in the "),a("code",[e._v("dist")]),e._v(" folder. The process should abort if there are any errors or something is missing from the "),a("code",[e._v(".env")]),e._v(" file.")]),e._v(" "),a("p",[e._v("You might get prompted for your login information again as it uses a temporary Git repository to push the content to Heroku.")]),e._v(" "),a("p",[e._v("The entire process should take about 45 seconds to complete.")]),e._v(" "),a("h2",{attrs:{id:"deployment-process-explained"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deployment-process-explained"}},[e._v("#")]),e._v(" Deployment process explained")]),e._v(" "),a("p",[e._v("There were several different approaches I could have taken to deploy this project to Heroku:")]),e._v(" "),a("ol",[a("li",[e._v("Push the entire project to Heroku and let it do all the work")])]),e._v(" "),a("blockquote",[a("p",[e._v("This turned out to be too slow and frankly made less sense at every push when I tried to make it work.")])]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Create a release using "),a("a",{attrs:{href:"https://help.github.com/articles/creating-releases/",title:"GitHub Releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub releases"),a("OutboundLink")],1),e._v(" and instruct Heroku to fetch the files from there")])]),e._v(" "),a("blockquote",[a("p",[e._v("This felt a bit too official and would have involved spending more time learning how the releases API works to automate the process.")])]),e._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Create a "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Tar_(computing)",title:"Tarball",target:"_blank",rel:"noopener noreferrer"}},[e._v("tarball"),a("OutboundLink")],1),e._v(", figure out a place to host it and instruct Heroku to fetch the compiled project from there")])]),e._v(" "),a("blockquote",[a("p",[e._v("Again, a lot of work and the need to have extra hosting for the tar files.")])]),e._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[e._v("Create a separate branch in the same Git repository as this project and create a new commit with only the static files included")])]),e._v(" "),a("blockquote",[a("p",[e._v("Switching back and forth between a master branch and a deployment branch didn't seem very logical.")])]),e._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[e._v("Create a temporary Git on the local machine and push the compiled files from there")])]),e._v(" "),a("blockquote",[a("p",[e._v("A bit hacky, but it turned out to be the easiest choice by far")])]),e._v(" "),a("p",[e._v("At first I would have been perfectly happy pushing the entire project to Heroku without the production files included hoping that Heroku would be able to build them on-the-fly using the versions specified in the "),a("code",[e._v("package.json")]),e._v(" file and serve the generated files after the build process was complete. This had some unforseen obstacles such as not working and being extremely slow, but more importantly it exposed the whole process to a variety of side-effects that were out of my control.")]),e._v(" "),a("p",[e._v("The whole point in deploying a production-ready application is to have it tested, built and re-tested before pushing it somewhere where it can do its magic. Having Heroku do all the hard work seemed pointless, since it had already been done and tested. All that was needed was to figure out a way to push the compiled files to the remote server.")]),e._v(" "),a("p",[e._v("As I was going through the documentation for "),a("a",{attrs:{href:"https://vuepress.vuejs.org/",title:"Vue-powered Static Site Generator",target:"_blank",rel:"noopener noreferrer"}},[e._v("VuePress"),a("OutboundLink")],1),e._v(", I came over their long list of "),a("a",{attrs:{href:"https://vuepress.vuejs.org/guide/deploy.html",title:"VuePress deployment",target:"_blank",rel:"noopener noreferrer"}},[e._v("deployment methods"),a("OutboundLink")],1),e._v(" and created my own script that did more or less the same. What VuePress does is to nuke the "),a("code",[e._v("dist")]),e._v(" folder entirely, regenerate it and have a script create a temporary Git repository inside it which pushes the built files to a remote Git repository where they get served as static files on the web.")]),e._v(" "),a("p",[e._v("Here's what I came up with:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[e._v("#!/usr/bin/env bash")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Color definitions")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("blue")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")]),e._v("tput setaf "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("12")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("bold")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")]),e._v("tput bold"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("cyan")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")]),e._v("tput setaf "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("6")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("dim")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")]),e._v("tput dim"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("normal")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")]),e._v("tput sgr0"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("white")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")]),e._v("tput setaf "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("8")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")])]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Abort on errors")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("set")]),e._v(" -e\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Deploying to '),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${bold}")]),e._v("Heroku"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${normal}")]),e._v('..."')]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Export .env variables")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("export")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("cat")]),e._v(" .env "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("xargs")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("`")])]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Make sure the HEROKU_APP variable exists in the .env file")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# or else the script won't know where to deploy the files")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("if")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("!")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$HEROKU_APP")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("then")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${bold}")]),e._v("Aborting. "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${blue}")]),e._v("HEROKU_APP"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${normal}")]),e._v(' missing."')]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Add the following to the '),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${cyan}")]),e._v(".env"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${normal}")]),e._v(' file located in the root folder of this project:"')]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${bold}")]),e._v("HEROKU_APP=your-app-name"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${normal}")]),e._v('"')]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Replace '),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${cyan}")]),e._v("your-app-name"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${normal}")]),e._v(' with the name of your Heroku application."')]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${dim}")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${white}")]),e._v('For more information, see the documentation:"')]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${normal}")]),e._v("https://phoenix2k.github.io/vue-microblog-ts/deployment/"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${normal}")]),e._v('"')]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exit")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("else")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Application detected: '),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${bold}")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${HEROKU_APP}")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${normal}")]),e._v('"')]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Proceed with deployment?"')]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("select")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[e._v("yn")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("in")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Yes"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"No"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("do")]),e._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("case")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$yn")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("in")]),e._v("\n\t\t\tYes "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\t\t\tNo "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("esac")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("done")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("fi")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Make the client and server ready for production")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" run build\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Navigate the dist directory where the production files are located")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" dist\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Generate a package-lock.json file with the dependencies")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# specified in the second package.json file meant for Heroku")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Remove the temporary Git repository if it was left behind")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# from a previous deployment process")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("if")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v(" -d ./.git "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("then")]),e._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("rm")]),e._v(" -rf .git\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("fi")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Create a temporary Git repository for deployment")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" init\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" -A\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Deploy production files to Heroku'")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\nheroku git:remote -a "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$HEROKU_APP")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" push -f heroku master\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Remove the temporary Git repository to avoid interferance")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# with the main .git repository located in the root")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("rm")]),e._v(" -rf .git\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" -\n")])])]),a("p",[e._v("Hopefully this example will have given you ideas on how to push your own files to production. If you've figured out an even easier way to do this or see something wrong with this process, please drop me a line in the "),a("a",{attrs:{href:"https://github.com/Phoenix2k/vue-microblog-ts/issues",target:"_blank",rel:"noopener noreferrer"}},[e._v("issues"),a("OutboundLink")],1),e._v(" section here on GitHub.")]),e._v(" "),a("p",[e._v("Big thanks to the VuePress team for pointing me in the right direction!")])])}),[],!1,null,null,null);t.default=r.exports}}]);