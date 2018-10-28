#!/usr/bin/env sh
bold=`tput bold`
dim=`tput dim`
cyan=`tput setaf 14`
blue=`tput setaf 12`
normal=`tput sgr0`

# Abort on errors
set -e

# Export .env variables
export `cat .env | xargs`

echo "Deploying to Heroku..."
if [ ! $HEROKU_APP ]; then
echo
	echo "${bold}${blue}HEROKU_APP${normal} missing.${normal}\n"
	echo "Add the following to the ${normal}${bold}.env${normal} file located in the root folder of this project:"
	echo "${bold}HEROKU_APP=your-app-name${normal}\n"
	echo "Replace ${bold}your-app-name${normal} with the name of your Heroku application.\n"
	exit;
fi

# Build client and server
npm run build

# Navigate into the build output directory
cd dist

# Generate package-lock.json file
npm install

# Remove temporary .git repository if it was left
# behind during previous deployments
if [ ! -d ./.git ]; then
	rm -rf .git
fi

# Create a temporary Git repository for deployment
git init
heroku git:remote -a $HEROKU_APP
git add -A
git commit -m 'Deploy generated files to Heroku'
git push -f heroku master

# Remove temporary Git repository to avoid interferance
# with the main .git repository contained in the root
rm -rf .git

cd -
