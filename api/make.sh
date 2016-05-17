result () {
  if [ ! $? ]; then
    exit $?
  fi
}

rm -rg classes/Configs/Config.php
mv classes/Configs/ProdConfig.php classes/Configs/Config.php
php phpDocumentor.phar -d ./classes -t ./docs
php phpunit.phar --bootstrap ./AutoLoadForTests.php --log-junit ./tests/reports/output.xml tests/

rm -rf /home/tomasztomys/domains/api.iwm.tomys.me/$1
mkdir /home/tomasztomys/domains/api.iwm.tomys.me/$1
cp -R . /home/tomasztomys/domains/api.iwm.tomys.me/$1