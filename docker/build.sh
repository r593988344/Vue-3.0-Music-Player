# !/usr/bin/env bash
basedir=`cd $(dirname $0); pwd -P`
docker-compose -f $basedir/docker-compose.yml up
