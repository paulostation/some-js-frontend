/* jshint esversion:6 */
var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var image1 = '/root/openface/images/examples/lennon-1.jpg';
var image2 = '/root/openface/images/examples/clapton-1.jpg';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Openface demo' });
});

router.get('/test', (req, res) => {
    const { spawn } = require('child_process');

    const deploySh = spawn('bash', [path.join(__dirname, "/../analyze.sh")], {});

    let output = "";
    deploySh.stdout.on('data', (data) => {

        output += data + '\n';
        console.log(`stdout: ${data}`);
    });

    deploySh.stderr.on('data', (data) => {
        output += data + '\n';
        console.log(`stderr: ${data}`);
    });

    deploySh.on('close', (code) => {
        res.send(output);
        console.log(`child process exited with code ${code}`);
    });

});

router.post('/file-upload', multipartMiddleware, (req, res) => {

    //convert path to string    
    let filePath = "" + req.files.file.path;
    console.log(filePath);
    fs.readFile(filePath, function(err, data) {
        image1 = path.join(__dirname, "/../uploadedImages/first" + req.files.file.originalFilename);
        var newPath = image1;
        fs.writeFile(newPath, data, function(err) {
            if (err) {
                console.error("Error while saving image: ", err);
            } else {
                res.status(200).send("OK");
            }

        });
    });

});

router.post('/file-upload2', multipartMiddleware, (req, res) => {
    //convert path to string
    let filePath = "" + req.files.file.path;

    fs.readFile(filePath, function(err, data) {
        image2 = path.join(__dirname, "/../uploadedImages/second" + req.files.file.originalFilename);
        var newPath = image2;
        fs.writeFile(newPath, data, function(err) {
            if (err) {
                console.error("Error while saving image: ", err);
            } else {
                res.status(200).send("OK");
            }

        });
    });

});

module.exports = router;