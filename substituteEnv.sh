#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
echo "Replacing environment variables"
for file in $ROOT_DIR/assets/*.js* $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|VITE_MEYASUBAKO_API_URL_PLACEHOLDER|'${VITE_MEYASUBAKO_API_URL}'|g' $file
  sed -i 's|VITE_DESCRIPTION_PLACEHOLDER|'${VITE_DESCRIPTION}'|g' $file
  sed -i 's|VITE_LOGIN_URL_PLACEHOLDER|'${VITE_LOGIN_URL}'|g' $file
  sed -i 's|VITE_USER_INFO_URL_PLACEHOLDER|'${VITE_USER_INFO_URL}'|g' $file

done

exec "$@"
