$(function () {

    var ajaxCallback = function (d) {
        var trueTotal = d[0].stream_count;
        trueTotal = parseInt(trueTotal, 10);
        countFunction(trueTotal);
    };

    function ajax(callback) {
        var counter;
        $.ajax({
            url: 'http://dev.odimax.com/get_row_count.php',
            success: function (data) {
                counter = data;
                callback(counter);
            }
        });
    }

    // For calculating total commits

    ajax(ajaxCallback);

    function countFunction(trueTotal) {
        var currentTotal = $('#currentTotal').html();
        var parsedTotal = parseInt(currentTotal, 10);
        var diff = trueTotal - parsedTotal;
        var avg = Math.round(parsedTotal / 60);
        $('#avg').html(avg);
        if (avg == 1) {
            $('span').html('tweet');
        } else {
            $('span').html('tweets');
        }

        if (diff > 0) {
            parsedTotal = parsedTotal + (Math.floor(diff/1000));
            $('#currentTotal').text(parsedTotal);
            window.setTimeout(function () {
                countFunction(trueTotal);
            }, 10);
        }
    }

    var ajaxInt = self.setInterval(function () {
        ajax(ajaxCallback);
    }, 4000);

});
