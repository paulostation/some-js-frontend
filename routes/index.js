/* jshint esversion:6 */
var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var image1 =

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

router.get('/test', (req, res) => {
    'use strict';
    let output = "";
    let isResponseSent = false;
    const spawn = require('child_process').spawn;

    let command = spawn('../../demos/compare.py ../uploadedImages/{even/*,odd/*}');

    command.stdout.on('data', data => {
        output += data;
        console.log(`stdout: ${data}`);
    });

    command.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
    });

    command.on('error', error => {
        console.log(`an error ocurred: ${error}`);
        isResponseSent = true;
        res.status(500).send("internal server error =/");
    });

    command.on('close', code => {

        console.log(`child process exited with code ${code}`);
        if (!isResponseSent)
            res.status(200).send(output);
    });


});

router.post('/file-upload', multipartMiddleware, (req, res) => {
    //convert path to string
    let filePath = "" + req.files.file.path;

    fs.readFile(filePath, function(err, data) {
        var newPath = path.join(__dirname, "/../uploadedImages/even/" + req.files.file.originalFilename);
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
        var newPath = path.join(__dirname, "/../uploadedImages/odd/" + req.files.file.originalFilename);
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