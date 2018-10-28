#!/usr/bin/env bash

# Color definitions
blue=`tput setaf 12`
bold=`tput bold`
cyan=`tput setaf 6`
dim=`tput dim`
normal=`tput sgr0`
white=`tput setaf 8`

# Abort on errors
set -e

echo "Deploying to ${bold}Heroku${normal}..."

# Export .env variables
export `cat .env | xargs`

# Make sure the HEROKU_APP variable exists in the .env file
# or else the script won't know where to deploy the files
if [ ! $HEROKU_APP ]; then
	echo
	echo "${bold}Aborting. ${blue}HEROKU_APP${normal} missing."
	echo
	echo "Add the following to the ${cyan}.env${normal} file located in the root folder of this project:"
	echo "${bold}HEROKU_APP=your-app-name${normal}"
	echo
	echo "Replace ${cyan}your-app-name${normal} with the name of your Heroku application."
	echo
	echo "${dim}${white}For more information, see the documentation:"
	echo "${normal}https://phoenix2k.github.io/vue-microblog-ts/deployment/${normal}"
	echo
	exit
else
	echo
	echo "Application detected: ${bold}${HEROKU_APP}${normal}"
	echo
	echo "Proceed with deployment?"
	select yn in "Yes" "No"; do
		case $yn in
			Yes ) break;;
			No ) exit;;
		esac
	done
fi

# Make the client and server ready for production
npm run build

# Navigate the dist directory where the production files are located
cd dist

# Generate a package-lock.json file with the dependencies
# specified in the second package.json file meant for Heroku
npm install

# Remove the temporary Git repository if it was left behind
# from a previous deployment process
if [ -d ./.git ]; then
	rm -rf .git
fi

# Create a temporary Git repository for deployment
git init
echo
git add -A
git commit -m 'Deploy production files to Heroku'
echo
heroku git:remote -a $HEROKU_APP
echo
git push -f heroku master

# Remove the temporary Git repository to avoid interferance
# with the main .git repository located in the root
rm -rf .git

cd -
