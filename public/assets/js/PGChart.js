// Generated by CoffeeScript 1.6.3
_.templateSettings.variable = "data";

window.PGChart = (function() {
  PGChart.prototype.container = 'body';

  PGChart.prototype.margin = {
    top: 50,
    right: 70,
    bottom: 50,
    left: 80
  };

  PGChart.prototype.width = 800;

  PGChart.prototype.height = 600;

  PGChart.prototype.dataset = [];

  PGChart.prototype.axes = {
    x: 'ValueX',
    y: 'ValueY'
  };

  PGChart.prototype.axis = {
    x: null,
    y: null
  };

  PGChart.prototype.scale = {
    x: 1,
    y: 1
  };

  PGChart.prototype.chart = null;

  function PGChart(container, margin, dataset, axes) {
    if (!!container) {
      this.container = container;
    }
    if (!!margin) {
      this.margin = margin;
    }
    this.width = $(container).width() - this.margin.left - this.margin.right;
    this.height = $(container).height() - this.margin.top - this.margin.bottom;
    if (!!dataset) {
      this.dataset = dataset;
    }
    if (!!axes) {
      this.axes = axes;
    }
    this.initChart();
  }

  PGChart.prototype.initChart = function() {
    var circles1,
      _this = this;
    this.scale.x = d3.scale.linear().domain(d3.extent(this.dataset, function(d) {
      return d[0];
    })).range([0, this.width]).nice();
    this.scale.y = d3.scale.linear().domain([
      d3.min(this.dataset, function(d) {
        return d[1];
      }), d3.max(this.dataset, function(d) {
        return d[1];
      })
    ]).range([this.height, 0]).nice();
    this.axis.x = d3.svg.axis().scale(this.scale.x).orient("bottom").ticks(5);
    this.axis.y = d3.svg.axis().scale(this.scale.y).orient("left");
    this.line = d3.svg.line().x(function(d) {
      return _this.scale.x(d[0]);
    }).y(function(d) {
      return _this.scale.y(d[1]);
    });
    this.chart = d3.select(this.container).append("svg").attr("width", this.width + this.margin.left + this.margin.right).attr("height", this.height + this.margin.top + this.margin.bottom).append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.chart.append("clipPath").attr('id', 'chart-area').append('rect').attr('x', 0).attr('y', 0).attr('width', this.width).attr('height', this.height);
    this.chart.append("g").attr("class", "x axis").attr("transform", "translate(0," + this.height + ")").call(this.axis.x).append("text").attr("id", "xLabel").style("text-anchor", "start").text(this.axes.x).attr("transform", "translate(" + (this.width + 20) + ",0)");
    this.chart.append("g").attr("class", "y axis").call(this.axis.y).attr("x", -20).append("text").attr("id", "yLabel").attr("y", -30).attr("dy", ".71em").style("text-anchor", "end").text(this.axes.y);
    /*
    point = @chart.selectAll(".point")
               .data(@dataset)
               .enter().append("g")
               .attr("class", "point");
    */

    this.chart.selectAll("path").data(this.dataset).enter().append("path").attr("class", "line").attr("d", function(d) {
      return _this.line(_this.dataset);
    }).style("stroke", "#335577");
    circles1 = this.chart.append('g').attr('id', 'circles1').attr('clip-path', 'url(#chart-area)').selectAll(".circle1").data(this.dataset).enter().append("circle").attr("class", "circle1").attr("cx", function(d) {
      return _this.scale.x(d[0]);
    }).attr("cy", function(d) {
      return _this.scale.y(d[1]);
    }).attr("r", 5).attr('fill', '#882244').on('mouseover', function(d) {
      return d3.select(this).transition().duration(500).attr('r', 50);
    }).on('mouseout', function(d) {
      return d3.select(this).transition().duration(1000).attr('r', 5);
    }).on('mousedown', function(d) {
      SavePoint(d[0], d[1]);
      return d3.select(this).transition().duration(100).attr('r', 5).attr('fill', '#DEADBE');
    });
    circles1.append('title').text(function(d) {
      return "" + _this.axes.x + ": " + d[0] + "\n" + _this.axes.y + ": " + d[1];
    });
    return window.fuckyoucoffescript = circles1;
    /* This is for a second overlayed chart
    
    y2 = d3.scale.linear()
          .domain([
              d3.min(@dataset2, (d) -> d[1]),
              d3.max(@dataset2, (d) -> d[1])
            ])
          .range([height, 0])
          .nice()
    
    yAxis2 = d3.svg.axis()
               .scale(y2)
               .orient("right")
    
    line2 = d3.svg.line()
          #.interpolate("basis")
          .x((d) -> x(d[0]))
          .y((d) -> y2(d[1]))
    
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + @width + ",0)")
      .call(yAxis2)
      .append("text")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      # TODO: Should be Key for Y Axis
      .text("Value2(m)")
    
    point2 = svg.selectAll(".point2")
                .data(@datasource2)
                .enter().append("g")
                .attr("class", "point2")
    point2.append('g')
        .attr('id', 'points2')
        .attr('clip-path', 'url(#chart-area)').append("path")
        .attr("class", "line")
        .attr("d", (d) -> line2(@dataset2))
        .style("stroke", "#775533")
      
    circles2 = svg.append('g')
                  .attr('id', 'circles2')
                  .attr('clip-path', 'url(#chart-area)')
                  .selectAll(".circle2")
                  .data(@dataset2)
                  .enter()
                  .append("circle")
                  .attr("class", "circle2")
                  .attr("cx", (d) -> x(d[0]))
                  .attr("cy", (d) -> y2(d[1]))
                  .attr("r", 5)
    */

  };

  PGChart.prototype.updateChart = function(dataset, axes) {
    var _this = this;
    if (!!dataset) {
      this.dataset = dataset;
    }
    if (!!axes) {
      this.axes = axes;
    }
    this.scale.x.domain(d3.extent(this.dataset, function(d) {
      return d[0];
    }));
    this.scale.y.domain([
      d3.min(this.dataset, function(d) {
        return d[1];
      }), d3.max(this.dataset, function(d) {
        return d[1];
      })
    ]);
    this.chart.select('.x.axis').transition().duration(1000).call(this.axis.x).select("#xLabel").text(this.axes.x);
    this.chart.select('.y.axis').transition().duration(1000).call(this.axis.y).select("#yLabel").text(this.axes.y);
    this.chart.selectAll(".line").data(this.dataset).transition().duration(1000).attr("d", function(d) {
      return _this.line(_this.dataset);
    });
    return this.chart.selectAll(".circle1").data(this.dataset).transition().duration(1000).attr("cx", function(d) {
      return _this.scale.x(d[0]);
    }).attr("cy", function(d) {
      return _this.scale.y(d[1]);
    }).select('title').text(function(d) {
      return "" + _this.axes.x + ": " + d[0] + "\n" + _this.axes.y + ": " + d[1];
    });
  };

  PGChart.prototype.getPointData = function(id, x, y) {
    var jqxhr, point,
      _this = this;
    point = new PGChartPoint({
      id: id
    });
    jqxhr = point.fetch();
    jqxhr.success(function(model, response, options) {
      console.log("Success!");
      console.log(model);
      console.log(response);
      console.log(options);
      return _this.spawnPointDialog(model, x, y);
    });
    return jqxhr.error(function(model, response, options) {
      console.log("Error!");
      console.log(model);
      console.log(response);
      console.log(options);
      return _this.spawnPointDialog(point, x, y);
    });
  };

  PGChart.prototype.spawnPointDialog = function(point, x, y) {
    var pointInfo, pointInfoTemplate, pointTemplate;
    pointTemplate = _.template($("#pointDataTemplate").html());
    pointInfoTemplate = pointTemplate(point.toJSON());
    console.log(pointInfoTemplate);
    pointInfo = $(this.container).first().append(pointInfoTemplate).find('.pointInfo').last();
    pointInfo.css('left', x).css('top', y);
    return pointInfo.find('submit').click(function() {
      var text, title;
      title = pointInfo.find('.pointInfoTitleInput').val();
      text = pointInfo.find('.pointInfoTextInput').val();
      point.set({
        title: title,
        text: text
      });
      point.save();
      console.log(point);
      return pointInfo.remove();
    });
  };

  return PGChart;

})();
