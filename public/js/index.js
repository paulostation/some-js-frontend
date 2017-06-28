//jshint esversion:6
//    $.get("/clearPhotos");


function compareVideoToVideo() {

}

function comparePhotosToPhotos() {

}

function compareVideoToPhoto() {

}

function analyzeStuff() {

    let success = result => {


        let scoreArray = result.split("\n");

        $(".loader").hide();

        let html = "";

        scoreArray.forEach(score => {

            //skip invalid results
            if ("" === score) return;

            (score < 1) ?
            //if score is less than 1, green
            html += `<div class="col-md-1 green">${score}<br>Same person</div>`
                //otherwise, red
                : html += `<div class="col-md-1 red">${score}<br>Different person</div>`;
        });

        $('#result').html(html);

    };

    let error = error => {
        console.error("Error while analyzing images: ", error);
    };

    let ajaxSettings = {
        type: "GET",
        url: '/test',
        success: success,
        error: error,
        statusCode: {
            404: function() {
                reject("page not found");
            }
        }
    };

    $(".loader").show();

    $.ajax(ajaxSettings);
}

function firstRowItems(string) {
    return (string.indexOf('first') !== -1);
}

function secondRowItems(string) {
    return (string.indexOf('second') !== -1);
}

function analyzeStuff2() {

    let success = result => {


        let scoreArray = result.output.split("\n");

        $(".loader").hide();

        let html = "";

        scoreArray.forEach((score, index) => {
            if (index > 10) return;
            //skip invalid results
            if ("" === score) return;

            (score < 1) ?
            //if score is less than 1, green
            html = `<div class="green">${score}<br>Same person</div>`
                //otherwise, red
                : html = `<div class="red">${score}<br>Different person</div>`;

            $("#result-score .result-score:nth-child(" + index + ")").html(html);
        });

        //$('#result').html(html);

        let promiseArray = [];

        result.fileList.filter(firstRowItems).forEach((file, index) => {

            if (index > 10) return;

            let $img = $("<img>", {
                src: '/getImage?file=' + file,
                width: '80px',
                height: '120px'
            });

            $("#result-images-first .result-image:nth-child(" + index + ")").append($img);
        });

        result.fileList.filter(secondRowItems).forEach((file, index) => {
            if (index > 10) return;
            let $img = $("<img>", {
                src: '/getImage?file=' + file,
                width: '80px',
                height: '120px'
            });
            console.log("updating " + file + "on index " + index);
            $("#result-images-second .result-image:nth-child(" + index + ")").append($img);
            //       $("body").append($img);
            /*         let p1 = new Promise((resolve, reject) => {

                       let ajaxSettings = {
                         type: "GET",
                         url: '/getImage?file='+file,
                         success: data => {
                           resolve(data);      
                         },
                         error: error => {
                           reject(error)
                         }
                         
                       };

                       $(".loader").show();

                       $.ajax(ajaxSettings);

                     });*/
        });


        Promise.all(promiseArray)
            .then(result => {
                renderImages(result);
            })
            .catch(error => {
                reject(error);
            });

    };

    let error = error => {
        console.error("Error while analyzing images: ", error);
    };

    let ajaxSettings = {
        type: "GET",
        url: '/testVideo',
        success: success,
        error: error
    };

    $(".loader").show();

    $.ajax(ajaxSettings);
}

function analyzeStuff3() {

    let success = result => {

        let scoreArray = result.output.split("\n");

        $(".loader").hide();

        let html = "";

        scoreArray.forEach((score, index) => {
            if (index > 10) return;
            //skip invalid results
            if ("" === score) return;

            (score < 1) ?
            //if score is less than 1, green
            html = `<div class="green">${score}<br>Same person</div>`
                //otherwise, red
                : html = `<div class="red">${score}<br>Different person</div>`;

            $("#result-score2 .result-score:nth-child(" + index + ")").html(html);
        });

        let promiseArray = [];

        result.fileList.filter(firstRowItems).forEach((file, index) => {

            if (index > 10) return;

            let $img = $("<img>", {
                src: '/getImage?file=' + file,
                width: '80px',
                height: '120px'
            });

            $("#result-images-first2 .result-image:nth-child(" + index + ")").append($img);
        });

        result.fileList.filter(secondRowItems).forEach((file, index) => {
            if (index > 10) return;
            let $img = $("<img>", {
                src: '/getImage?file=' + file,
                width: '80px',
                height: '120px'
            });
            console.log("updating " + file + "on index " + index);
            $("#result-images-second2 .result-image:nth-child(" + index + ")").append($img);           
        });


        Promise.all(promiseArray)
            .then(result => {
                renderImages(result);
            })
            .catch(error => {
                reject(error);
            });

    };

    let error = error => {
        console.error("Error while analyzing images: ", error);
    };

    let ajaxSettings = {
        type: "GET",
        url: '/testVideoAndPhoto',
        success: success,
        error: error
    };

    $(".loader").show();

    $.ajax(ajaxSettings);
}
