/* jshint esversion:6 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/test', (req, res) => {
    'use strict';
    let output = "";
    let isResponseSent = false;
    const spawn = require('child_process').spawn;

    let command = spawn('../demos/compare.py images/examples/{lennon*,clapton*}');

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
        // if (code !== 0) {
        //     res.send("something went wrong");
        // }
        console.log(`child process exited with code ${code}`);
        if (!isResponseSent)
            res.status(200).send(output);
    });


});

module.exports = router;