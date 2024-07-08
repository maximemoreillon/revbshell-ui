#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
echo "Replacing environment variables"
for file in $ROOT_DIR/assets/*.js* $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|VITE_REVBSHELL_SERVER_URL_PLACEHOLDER|'${VITE_REVBSHELL_SERVER_URL}'|g' $file


done

exec "$@"
