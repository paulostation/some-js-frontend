/* jshint esversion:6 */

function analyzeStuff() {

    let success = result => {
        $(".loader").hide();
        $('#result').html(result);
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