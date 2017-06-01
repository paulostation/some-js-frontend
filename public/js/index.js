/* jshint esversion:6 */
function analyzeStuff() {

    let success = function(result) {
        $('#result').html(result);
    };

    let error = function(error) {
        console.error("Error while analyzing images: ", error);
    };

    let ajaxSettings = {
        type: "G",
        url: '/test',
        data: params,
        success: success,
        error: error,
        statusCode: {
            404: function() {
                reject("page not found");
            }
        }
    };

    $.ajax(ajaxSettings);
}

$(document).ready(() => {

});