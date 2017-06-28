/* jshint esversion:6 */
var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var fileupload1_counter = 0;
var fileupload2_counter = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Openface demo'
    });
});

router.get('/test', (req, res) => {

    const {
        spawn
    } = require('child_process');

    const deploySh = spawn('bash', [path.join(__dirname, "/../analyze.sh")], {});

    let output = "";
    deploySh.stdout.on('data', (data) => {

        output += data;
        console.log(`stdout: ${data}`);
    });

    deploySh.stderr.on('data', (data) => {
        output += data;
        console.log(`stderr: ${data}`);
    });

    deploySh.on('close', (code) => {
        res.send(output);

        fs.readdir(path.join(__dirname, '../uploadedImages'), function(err, items) {
            console.log(items);

            for (var i = 0; i < items.length; i++) {
                console.log(items[i]);
            }
        });

        console.log(`child process exited with code ${code}`);
    });

});

router.get('/getImage', (req, res) => {
    let filePath = path.join(__dirname, '../uploadedImages2/' + req.query.file);
    console.log("get image: ", filePath);
    res.download(filePath);

});

router.get('/testVideo', (req, res) => {

    const {
        spawn
    } = require('child_process');

    const deploySh = spawn('bash', [path.join(__dirname, "/../analyzeVideo.sh")], {});

    let output = "";
    deploySh.stdout.on('data', (data) => {

        output += data;
        console.log(`stdout: ${data}`);
    });

    deploySh.stderr.on('data', (data) => {

        output += data;
        console.log(`stderr: ${data}`);
    });

    deploySh.on('close', (code) => {

        fs.readdir(path.join(__dirname, '../uploadedImages2'), function(err, items) {

            if (err) {
                res.status(500).send(err);
            } else {

                res.send({
                    output: output,
                    fileList: items
                });
            }
        });

        console.log(`child process exited with code ${code}`);
    });

});

router.get('/testVideoAndImage', (req, res) => {

    const {
        spawn
    } = require('child_process');

    const deploySh = spawn('bash', [path.join(__dirname, "/../analyzeVideo.sh")], {});

    let output = "";
    deploySh.stdout.on('data', (data) => {

        output += data;
        console.log(`stdout: ${data}`);
    });

    deploySh.stderr.on('data', (data) => {

        output += data;
        console.log(`stderr: ${data}`);
    });

    deploySh.on('close', (code) => {

        fs.readdir(path.join(__dirname, '../uploadedImages'), function(err, items) {

            if (err) {
                res.status(500).send(err);
            } else {

                res.send({
                    output: output,
                    fileList: items
                });
            }
        });

        console.log(`child process exited with code ${code}`);
    });

});

router.post('/file-upload', multipartMiddleware, (req, res) => {

    //convert path to string    
    let filePath = "" + req.files.file.path;
    console.log(filePath);
    fs.readFile(filePath, function(err, data) {
        image1 = path.join(__dirname, "/../uploadedImages/first" + fileupload1_counter + req.files.file.originalFilename);
        var newPath = image1;
        fs.writeFile(newPath, data, function(err) {
            if (err) {
                console.error("Error while saving image: ", err);
            } else {
                res.status(200).send("OK");
                fileupload1_counter++;
            }

        });
    });

});

router.post('/file-upload2', multipartMiddleware, (req, res) => {
    //convert path to string
    let filePath = "" + req.files.file.path;

    fs.readFile(filePath, function(err, data) {
        image2 = path.join(__dirname, "/../uploadedImages/second" + fileupload2_counter + req.files.file.originalFilename);
        var newPath = image2;
        fs.writeFile(newPath, data, function(err) {
            if (err) {
                console.error("Error while saving image: ", err);
            } else {
                res.status(200).send("OK");
                fileupload2_counter++;
            }

        });
    });

});

router.post('/file-upload3', multipartMiddleware, (req, res) => {
    //convert path to string
    let filePath = "" + req.files.file.path;

    fs.readFile(filePath, function(err, data) {
        image2 = path.join(__dirname, "/../uploadedVideos/image_file");
        var newPath = image2;
        fs.writeFile(newPath, data, function(err) {
            if (err) {
                console.error("Error while saving image: ", err);
            } else {
                res.status(200).send("OK");
                // fileupload2_counter++;
            }

        });
    });

});

router.post('/video-upload', multipartMiddleware, (req, res) => {

    //convert path to string    
    let filePath = "" + req.files.file.path;
    console.log(filePath);
    fs.readFile(filePath, function(err, data) {
        image1 = path.join(__dirname, "/../uploadedVideos/video_file");
        var newPath = image1;
        fs.writeFile(newPath, data, function(err) {
            if (err) {
                console.error("Error while saving image: ", err);
            } else {
                res.status(200).send("OK");
                fileupload1_counter++;
            }

        });
    });

});



router.get('/clearPhotos', (req, res) => {

    const {
        spawn
    } = require('child_process');

    const deploySh = spawn('bash', [path.join(__dirname, "/../clear_photos.sh")], {});

    let output = "";
    deploySh.stdout.on('data', (data) => {

        output += data;
        console.log(`stdout: ${data}`);
    });

    deploySh.stderr.on('data', (data) => {
        output += data;
        console.log(`stderr: ${data}`);
    });

    deploySh.on('close', (code) => {
        res.send(output);
        console.log(`child process exited with code ${code}`);
    });

});

module.exports = router;