#!/bin/bash

(npm install & bower install) && rm -rf app/bower_components/mdv
git clone --recursive https://github.com/Polymer/mdv app/bower_components/mdv
echo 'Edit config.js and run `grunt server` afterwards'
