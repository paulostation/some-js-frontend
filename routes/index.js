/* jshint esversion:6 */
var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();


    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

router.get('/test', (req, res) => {
const { spawn } = require('child_process')

    const deploySh = spawn('/root/openface/demos/compare.py', [ '/root/some-js-frontend/uploadedImages/even/m(01-32)_gr.jpg', '/root/some-js-frontend/uploadedImages/odd/face_PNG5646.png' ], {
  //cwd: process.env.HOME + '/myProject',
  //env: Object.assign({}, process.env, { PATH: process.env.PATH + ':/usr/local/bin' })
});
let output = "";
deploySh.stdout.on('data', (data) => {
	output += data;
  console.log(`stdout: ${data}`);
});

deploySh.stderr.on('data', (data) => {
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

