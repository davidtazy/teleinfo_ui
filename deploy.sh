#!/bin/bash
set -e

rm -rf build
npm run build
tar -zcvf build.tgz build

scp  build.tgz pi@192.168.1.38:/home/pi/teleinfo
