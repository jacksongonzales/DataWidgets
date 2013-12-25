$ ->

  #  w = 400
  #  h = 500
  #  barPadding = 10
  #
  #  dataSet = [5, 15, 25, 20, 10]
  #  place = ["5th", "3rd", "1st", "2nd", "4th"]
  #
  #  # SVG layer
  #  svg = d3.select("#chart")
  #    .append("svg")
  #    .attr("width", w)
  #    .attr("height", h)
  #
  #  svg.selectAll("rect")
  #    .data(dataSet)
  #    .enter()
  #    .append("rect")
  #    .attr("x", (d, i) ->
  #      i * (w / dataSet.length))
  #    .attr("y", (d) ->
  #      h - (d * 6))
  #    .attr("width", w / dataSet.length - barPadding)
  #    .attr("height", (d) ->
  #      d * 6)
  #    .attr("fill", (d) ->
  #      "rgb(0, 0, " + (d * 8) + ")")
  #    .attr("class", "placeRect")
  #
  #  svg.selectAll("text")
  #    .data(dataSet)
  #    .enter()
  #    .append("text")
  #    .text((d, i) -> place[i])
  #    .attr("text-anchor", "middle")
  #    .attr("x", (d, i) ->
  #      i * (w / dataSet.length) + (w / dataSet.length - barPadding) / 2)
  #    .attr("y", (d) ->
  #      h - (d * 6) + 14)
  #    .attr("font-family", "sans-serif")
  #    .attr("font-size", "11px")
  #    .attr("fill", "white")
  #
  #  svg.selectAll(".placeRect")
  #    .on("click", ->
  #      currentRect = d3.select(this)
  #      .transition()
  #        .attr("fill", "#E80E0E")
  #    )

