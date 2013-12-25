$(function renderGraph() {

  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  };
  w = 700;
  h = 300;
  var dateArr = [];
  var tweetArr = [];

  getIntervalType = function (el) {
    var dataInterval;
    dataInterval = $(el).data("interval");
    if (dataInterval == "minutes") {
      setMinuteInterval();
    } else if (dataInterval == "hours") {
      setHourInterval();
    } else if (dataInterval == "days") {
      setDayInterval();
    }
  };

  x = d3.time.scale().range([0, w]);
  y = d3.scale.linear().range([h, 0]);

  xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(8);
  yAxis = d3.svg.axis().scale(y).orient('left').tickSize(-w).ticks(5);

  var drawGraph = function(d) {

    dateArr.sort(function(a,b) {
      a = new Date(a);
      b = new Date(b);
      return a<b?-1:a>b?1:0;
    });

    d.sort(function(a,b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a<b?-1:a>b?1:0;
    });

    x.domain([dateArr[0], dateArr[dateArr.length - 1]]);
    y.domain([0, 5 * Math.ceil(d3.max(tweetArr) / 5)]);

    var svg = d3.select("#chart").append("svg")
        .data([d])
        .attr("style", "margin: 20px auto")
        .attr("width", w + 100)
        .attr("height", h + 100)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("#chart").append("div")
      .data([d])
      .style("position", "absolute")
      .style("z-index", "10")
      .style("opacity", 0)
      .attr("class", "d3tooltip")
      .text(function(d){ return d.date + d.tweet_count; })

    var line = d3.svg.line()
      .interpolate("monotone")
      .x(function(d) { return x(new Date(d.date)); })
      .y(function(d) { return y(d.tweet_count); })

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "yAxis")
        .call(yAxis);

    var path = svg.append("svg:path")
        .attr("class", "line")
        .attr("d", line);


    svg.selectAll('.point')
      .data(d)
    .enter().append("circle")
      .attr("class", "point")
      .attr("r", 2)
      .attr("cx", function(d){ return x(new Date(d.date)) })
      .attr("cy", function(d){ return y(d.tweet_count) })
      .on('click', function(d, i){ return console.log(d, i) })
      .on("mouseover", function(d) {
        d3.select(this).attr('r', 8);
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(new Date(d.date) + "<br/>" + d.tweet_count + " tweets")
      })
      .on("mousemove", function(){ return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px"); })
      .on("mouseout", function() {
        d3.select(this).attr('r', 2)
        tooltip.transition()
          .duration(200)
          .style("opacity", 0);
      });

  };

  var setMinuteInterval = function() {
    d3.json("http://dev.odimax.com/get_graphdata_minute.php", function(error, data) {
      type(data);
      drawGraph(data);
    });
  }

  var setHourInterval = function() {
    d3.json("http://dev.odimax.com/get_graphdata_hour.php", function(error, data) {
      type(data);
      drawGraph(data);
    });
  }

  var setDayInterval = function() {
    d3.json("http://dev.odimax.com/get_graphdata_day.php", function(error, data) {
      type(data);
      drawGraph(data);
    });
  }

  function type(d) {

    for (var i=0; i<d.length; i++) {
      date = new Date(d[i].date);
      filledDateArr = dateArr.push(date);
      tweets = d[i].tweet_count;
      parsedTweets = parseInt(tweets, 10);
      filledTweetArr = tweetArr.push(parsedTweets, 10);
    }
    return d;
  }

  intervalType = getIntervalType($("li.active"));

  $("li").on("click", resetGraph);

  function resetGraph() {
    dateArr.length = 0;
    tweetArr.length = 0;
    $("#chart").empty();
    intervalType = getIntervalType(this);
  };
});
