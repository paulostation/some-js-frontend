#!/bin/bash
ffmpeg -i /root/some-js-frontend/uploadedVideos/first* -r 1/1 'first' + $filename%03d.bmp
#python /root/openface/demos/compare.py /root/some-js-frontend/uploadedVideos/{first*,second*}