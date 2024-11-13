#!/bin/sh

# Variable
APP_HOME=/srv/app
PORT=$APP_PORT

# SSH service
set -e
/usr/sbin/sshd

# App command
cd $APP_HOME && yarn serve:ssr
