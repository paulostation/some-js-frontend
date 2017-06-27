#!/bin/bash
ffmpeg -i /root/some-js-frontend/uploadedVideos/first* -r 1/1 "/root/some-js-frontend/uploadedImages/first$filename%03d.bmp"
ffmpeg -i /root/some-js-frontend/uploadedVideos/second* -r 1/1 "/root/some-js-frontend/uploadedImages/second$filename%03d.bmp"
python /root/openface/demos/compare.py /root/some-js-frontend/uploadedImages/{first*,second*}
