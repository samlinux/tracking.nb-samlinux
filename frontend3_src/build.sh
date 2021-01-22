# abort on errors
set -e

# build
vue-cli-service build

# clear ../frontend/
rm -R ../frontend3

# create frontend dir
mkdir ../frontend3

# copy files to ../frontend/
cp -a dist/. ../frontend3/

# remove dist
rm -R dist