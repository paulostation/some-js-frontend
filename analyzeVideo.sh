#!/bin/bash
#generate 1 frame every 2 seconds of video
ffmpeg -i uploadedVideos/video_file -r 1/2 "uploadedImages2/first$filename%03d.bmp" >> /dev/null 2>&1
#copy original file 5 times
for i in {001..0010}; do cp uploadedVideos/image_file uploadedImages2/second$i ; done
#compare generated images
python openface/demos/compare.py uploadedImages2/{first*,second*}
