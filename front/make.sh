result () {
  if [ ! $? ]; then
    exit $?
  fi
}

npm5 install
npm5 run build
rm -rf /home/tomasztomys/domains/iwm.tomys.me/$1
mkdir /home/tomasztomys/domains/iwm.tomys.me/$1
cp -R build/ /home/tomasztomys/domains/iwm.tomys.me/$1
cp .htaccess /home/tomasztomys/domains/iwm.tomys.me/$1

#replace `<!-- BASE_HREF -->` string with proper base href in index.html file
sed -i -e 's/<!-- BASE_HREF -->/<base href=\"\/'.$1.'\/\" \/>/g' /home/tomasztomys/domains/iwm.tomys.me/$1/index.html
result
echo "LOG (FRONTEND): replace BASE_HREF string with proper base href in index.html file"

#replace `# BASE_HREF #` string with proper base href in .htaccess file
sed -i -e 's/# BASE_HREF #/RewriteRule . \/'.$1.'\/index.html [L]/g' /home/tomasztomys/domains/iwm.tomys.me/$1/.htaccess
result
echo "LOG (FRONTEND): replace `#` BASE_HREF `#` string with proper base href in .htaccess file"