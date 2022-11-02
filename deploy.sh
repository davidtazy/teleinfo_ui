#!/bin/bash
set -ex

#rm -rf build
#npm run build
#tar -zcvf build.tgz build
#scp  build.tgz pi@192.168.1.38:/home/pi/teleinfo

echo "########## load on server ###########"

ssh pi@192.168.1.38 "sudo systemctl stop teleinfo_ui.service  &&\
 pwd && cd /home/pi/teleinfo &&  tar -zxvf build.tgz &&\
 sudo systemctl start teleinfo_ui.service"

echo "########## restart viewer ###########"
ssh pi@192.168.1.34 "sudo reboot"