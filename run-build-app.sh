#!/bin/bash
npm run build-app
scp package* dist
cd dist
rm -r resources
mkdir resources
zip -r -D hmis-somalia-data-mapping.zip .
cd ../
