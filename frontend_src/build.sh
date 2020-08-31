# abort on errors
set -e

# build
vue-cli-service build

# clear ../frontend/
rm -R ../frontend

# create frontend dir
mkdir ../frontend

# copy files to ../frontend/
cp -a dist/. ../frontend/

# remove dist
rm -R dist