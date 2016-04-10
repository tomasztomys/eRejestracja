result () {
  if [ ! $? ]; then
    exit $?
  fi
}

npm5 install
npm5 run build
rm -rf /home/tomasztomys/domains/iwm.tomys.me/newest
mkdir /home/tomasztomys/domains/iwm.tomys.me/newest
cp -R build/ /home/tomasztomys/domains/iwm.tomys.me/newest
cp .htaccess /home/tomasztomys/domains/iwm.tomys.me/newest

#replace `<!-- BASE_HREF -->` string with proper base href in index.html file
sed -i -e 's/<!-- BASE_HREF -->/<base href=\"\/newest\/\" \/>/g' /home/tomasztomys/domains/iwm.tomys.me/newest/index.html
result
echo "LOG (FRONTEND): replace BASE_HREF string with proper base href in index.html file"

#replace `# BASE_HREF #` string with proper base href in .htaccess file
sed -i -e 's/# BASE_HREF #/RewriteRule . \/newest\/index.html [L]/g' /home/tomasztomys/domains/iwm.tomys.me/newest/.htaccess
result
echo "LOG (FRONTEND): replace `#` BASE_HREF `#` string with proper base href in .htaccess file"