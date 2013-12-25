$(function() {

  /* Ajax call for populating panels */

  var ajaxCallback = function (d) {
    var containerArr = ["#first", "#second", "#third", "#fourth", "#fifth"];

    for (var i=0; i<d.length; i++) {

      var time = new Date(d[i].TweetTime);
      var theDate = time.toDateString();
      var tweetId = d[i].twitter_id;

      $(containerArr[i]).find(".picDiv").html("<img src=" + d[i].ProfilePic + " alt='http://supportformicrosoft.iyogi.com/files/2013/05/error-code-18.jpeg' height='48' width='48'>");
      $(containerArr[i]).find("strong").html(d[i].Name + "");
      $(containerArr[i]).find("em").html("@" + d[i].Handle);
      $(containerArr[i]).find(".message").html("<li>" + d[i].Message + "</li>");
      $(containerArr[i]).find(".followCount").html("<li><span> Followers: </span>" + d[i].FollowersCount + "<span> Following: </span>" + d[i].FollowingCount + "</li>");
      $(containerArr[i]).find(".tweetTime").html("<li>" + theDate + "</li>");

      $(containerArr[i]).find("span.reply").wrap("<a href='https://twitter.com/intent/tweet?in_reply_to=" + tweetId + "' </a>");
      $(containerArr[i]).find("span.retweet").wrap("<a href='https://twitter.com/intent/retweet?tweet_id=" + tweetId + "' </a>");
      $(containerArr[i]).find("span.favorite").wrap("<a href='https://twitter.com/intent/favorite?tweet_id=" + tweetId + "' </a>");
    };
  };

  function ajax(callback) {
      var counter;
      $.ajax({
          url: 'http://dev.odimax.com/get_top_reweets.php',
          success: function (data) {
              getter = data;
              callback(getter);
          }
      });
  };

  ajax(ajaxCallback);

  var ajaxInterval = self.setInterval(function() {
    ajax(ajaxCallback);
  }, 60000);

  /* Make tweet actions interactive on hover */

  $(".tweetIcons").find("span").hover(
    function() {
      $(this).css("color", "#3b96eb");
    }, function() {
      $(this).css("color", "#333");
    }
  );
});

