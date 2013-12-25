# ajax call for data #
$ ->
  #  ajax = (callback) ->
  #    counter = undefined
  #    $.ajax
  #      url: "http://dev.odimax.com/get_graphdata_minute.php"
  #      success: (data) ->
  #        counter = data
  #        callback counter
  #
  #  currentTweetsCallback = (d) ->
  #
  #    console.log tweets
  #    graphFunction tweets

#  dateCallback = (d) ->
#    date = d[0].TweetTime
#    isoDate = new Date(date)
#    realDate = isoDate.toLocaleString()
#    console.log realDate
#
#  ajax dateCallback
#  ajax currentTweetsCallback

  #  ajaxInterval = self.setInterval( ->
  #    ajax currentTweetsCallback
  #  , 6000)


  d3.json("http://dev.odimax.com/get_graphdata_minute.php", ->

    # Start graph
    data  = [3,7,9,1,4,6,8,2,5]
    margin = {top: 20, right: 20, bottom: 30, left: 40}
    w     = 700
    h     = 300
    max   = d3.max(data)

    # Get current time
    theDate = new Date()

    startTimeHour = d3.time.hour.offset(theDate, -2)
    startTimeDay = d3.time.hour.offset(theDate, -24)
    startTimeMonth = d3.time.month.offset(theDate, -1)
    currentTime = new Date()

    getIntervalType = (el)->

      dataInterval = $(el).data("interval").type
      if dataInterval == 'hours'
        return startTimeHour
      else if dataInterval == 'days'
        return startTimeDay
      else if dataInterval == 'months'
        return startTimeMonth

    renderGraph = (int) ->

      # Scales
      x = d3.scale.linear().domain([0, data.length - 1]).range [0, w]
      x2 = d3.time.scale().domain([int, currentTime]).range [0, w]
      y = d3.scale.linear().domain([0, max + 1]).range [h, 0]

      xAxis = d3.svg.axis()
        .scale(x2)
        .orient('bottom')
        .ticks(6)
        #.ticks(d3.time.minutes, 30)
        #.tickFormat(timeData)

      yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(10)

      # Base svg layer
      svg = d3.select('#chart')
        .attr("style", "margin: 20px auto")
        .append('svg')
        .attr('width', w + 100)
        .attr('height', h + 100)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      svg.append("g")
          .attr("class", "xAxis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "start")

      svg.append("g")
          .attr("class", "yAxis")
          .call(yAxis)

      # Add path layer
      svg.selectAll('path.line')
        .data([data])
      .enter().append("svg:path")
        .attr("class", "dataLine")
        .attr("d", d3.svg.line()
        .interpolate("cardinal")
          .x((d,i) -> x(i))
          .y(y))

    intervalType = getIntervalType($("li.active"))
    renderGraph(intervalType)

    $("li").on "click", ->
      $("#chart").empty()
      #get the data-interval pass it to the intervalType
      intervalType = getIntervalType(this)
      renderGraph(intervalType)

