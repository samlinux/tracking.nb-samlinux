# abort on errors
set -e

# build
vue-cli-service build

# clear ../frontend/
rm -R ../frontend2

# create frontend dir
mkdir ../frontend2

# copy files to ../frontend/
cp -a dist/. ../frontend2/

# remove dist
rm -R dist