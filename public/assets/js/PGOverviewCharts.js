// Generated by CoffeeScript 1.6.3
(function() {
  window.PGOverviewCharts = (function() {
    PGOverviewCharts.prototype.container = 'body';

    PGOverviewCharts.prototype.data = null;

    PGOverviewCharts.prototype.cfdata = null;

    PGOverviewCharts.prototype.dimensions = [];

    PGOverviewCharts.prototype.groups = [];

    PGOverviewCharts.prototype.charts = [];

    function PGOverviewCharts(data, container) {
      this.data = data;
      this.container = container;
      this.processData();
      this.drawCharts();
    }

    PGOverviewCharts.prototype.processData = function() {
      var entry, i, key, _fn, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2, _results,
        _this = this;
      this.cfdata = crossfilter(this.data.dataset);
      _ref = this.data.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this.dimensions.push(this.cfdata.dimension(function(d) {
          return d[key];
        }));
      }
      _fn = function(i) {
        var j, _k, _ref2, _ref3, _results;
        _results = [];
        for (j = _k = _ref2 = i + 1, _ref3 = _this.dimensions.length - 1; _ref2 <= _ref3 ? _k <= _ref3 : _k >= _ref3; j = _ref2 <= _ref3 ? ++_k : --_k) {
          _results.push((function(j) {
            _this.addGroup(i, j);
            return _this.addGroup(j, i);
          })(j));
        }
        return _results;
      };
      for (i = _j = 0, _ref1 = this.dimensions.length - 2; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        _fn(i);
      }
      _ref2 = this.groups;
      _results = [];
      for (_k = 0, _len1 = _ref2.length; _k < _len1; _k++) {
        entry = _ref2[_k];
        _results.push(console.log(entry.group.all()));
      }
      return _results;
    };

    PGOverviewCharts.prototype.addGroup = function(i, j) {
      var group, group2, xKey, xPattern, yKey, yPattern;
      xKey = this.data.keys[i];
      xPattern = this.data.patterns[xKey];
      yKey = this.data.keys[j];
      yPattern = this.data.patterns[yKey];
      group = {
        x: xKey,
        y: yKey,
        type: 'count',
        dimension: this.dimensions[i],
        group: null
      };
      group.group = this.dimensions[i].group().reduceCount(function(d) {
        return d[yKey];
      });
      this.groups.push(group);
      if (yPattern !== 'label') {
        group2 = {
          x: xKey,
          y: yKey,
          type: 'sum',
          dimension: this.dimensions[i],
          group: null
        };
        group2.group = this.dimensions[i].group().reduceSum(function(d) {
          return d[yKey];
        });
        return this.groups.push(group2);
      }
    };

    PGOverviewCharts.prototype.drawCharts = function() {
      var entry, _fn, _i, _len, _ref,
        _this = this;
      _ref = this.groups;
      _fn = function(entry) {
        var chart, container, d, m, xScale, _j, _len1, _ref1;
        switch (_this.data.patterns[entry.xKey]) {
          case 'label':
            m = [];
            _ref1 = entry.group.all();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              d = _ref1[_j];
              m.push(d.key);
            }
            xScale = d3.scale.ordinal().domain(m);
            break;
          default:
            xScale = d3.scale.linear().domain(d3.extent(entry.group.all(), function(d) {
              return d.key;
            })).range([0, 240]);
        }
        container = $(_this.container).append("<div class='xs-col-3' id='" + entry.x + "-" + entry.y + "-" + entry.type + "'><h4>" + entry.x + "-" + entry.y + "(" + entry.type + ")</h4><div>");
        chart = dc.barChart("#" + entry.x + "-" + entry.y + "-" + entry.type);
        chart.width(240).height(120).margins({
          top: 10,
          right: 10,
          bottom: 30,
          left: 30
        }).dimension(entry.dimension).group(entry.group).transitionDuration(500).centerBar(true).gap(2).x(xScale).elasticY(true).xAxis().ticks(3).tickFormat(function(d) {
          return d;
        });
        return chart.yAxis().ticks(3);
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        _fn(entry);
      }
      return dc.renderAll();
    };

    return PGOverviewCharts;

  })();

}).call(this);