// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.PGPieChart = (function(_super) {
    __extends(PGPieChart, _super);

    function PGPieChart() {
      _ref = PGPieChart.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PGPieChart.prototype.pie = null;

    PGPieChart.prototype.innerRadius = 20;

    PGPieChart.prototype.outerRadius = 200;

    PGPieChart.prototype.setScales = function() {};

    PGPieChart.prototype.drawAxes = function() {};

    PGPieChart.prototype.createPie = function() {
      return this.pie = this.chart.append('g').attr('id', 'pie').attr('transform', "translate(" + this.outerRadius + "," + this.outerRadius + ")");
    };

    PGPieChart.prototype.initChart = function() {
      PGPieChart.__super__.initChart.apply(this, arguments);
      this.outerRadius = this.width / 2;
      this.createPie();
      return this.renderPie();
    };

    PGPieChart.prototype.updateAxes = function() {};

    PGPieChart.prototype.renderPie = function() {
      var arc, colors, labels, pie, slices,
        _this = this;
      colors = d3.scale.category20();
      pie = d3.layout.pie().sort(function(d) {
        return d[0];
      }).value(function(d) {
        return d[1];
      });
      arc = d3.svg.arc().outerRadius(this.outerRadius).innerRadius(this.innerRadius);
      slices = this.pie.selectAll('path.arc').data(pie(this.currDataset));
      slices.enter().append("path").attr("class", "arc").attr('fill', function(d, i) {
        return colors(i);
      }).on('click', function(d) {
        return _this.newPointDialog(d[0], d[1]);
      });
      slices.exit().transition().duration(1000).remove();
      slices.transition().duration(1000).attrTween("d", function(d) {
        var currArc, interpolate;
        currArc = this.currArc;
        currArc || (currArc = {
          startAngle: 0,
          endAngle: 0
        });
        interpolate = d3.interpolate(currArc, d);
        this.currArc = interpolate(1);
        return function(t) {
          return arc(interpolate(t));
        };
      });
      labels = this.pie.selectAll('text.label').data(pie(this.currDataset));
      labels.enter().append("text").attr("class", "label");
      labels.exit().transition().duration(1000).remove();
      return labels.transition().duration(1000).attr('transform', function(d) {
        var dAng, diffAng, lAng, lScale;
        dAng = (d.startAngle + d.endAngle) * 90 / Math.PI;
        lAng = dAng + (dAng > 90 ? 90 : -90);
        diffAng = (d.endAngle - d.startAngle) * 180 / Math.PI;
        lScale = diffAng > 1 ? diffAng / 9 : 0;
        return "translate(" + (arc.centroid(d)) + ")rotate(" + lAng + ")scale(" + lScale + ")";
      }).attr('dy', '.35em').attr('text-anchor', 'middle').text(function(d) {
        return d.data[0];
      });
    };

    PGPieChart.prototype.updateChart = function(dataset, axes) {
      PGPieChart.__super__.updateChart.call(this, dataset, axes);
      return this.renderPie();
    };

    return PGPieChart;

  })(PGChart);

}).call(this);