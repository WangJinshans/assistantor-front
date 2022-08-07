<template>
  <div style="width:520px">
    <h1 style="font-weight: bold; font-size:20px">{{title}}</h1>
    <div
      id="echartContainer"
      ref="echartContainer"
      style="width:100%; height:460px"
    ></div>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  name: "KLine",
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      //数据模型 time0 open1 close2 min3 max4 vol5
      //['2019-10-18',18.56,18.25,18.19,18.56,55.00]
      //   stock_data: [
        // ["2019-3-16", 18.4, 18.58, 18.33, 18.79, 67.0],
        // ["2019-3-19", 18.56, 18.25, 18.19, 18.56, 55.0],
        // ["2019-3-20", 18.3, 18.22, 18.05, 18.41, 37.0],
        // ["2019-3-21", 18.18, 18.69, 18.02, 18.98, 89.0],
        // ["2019-3-22", 18.42, 18.29, 18.22, 18.48, 43.0],
        // ["2019-3-23", 18.26, 18.19, 18.08, 18.36, 46.0],
        // ["2019-3-26", 18.33, 18.07, 17.98, 18.35, 65.0],
        // ["2019-3-27", 18.08, 18.04, 17.88, 18.13, 37.0],
        // ["2019-3-28", 17.96, 17.86, 17.82, 17.99, 35.0],
        // ["2019-3-29", 17.85, 17.81, 17.8, 17.93, 27.0],
        // ["2019-3-30", 17.79, 17.93, 17.78, 18.08, 43.0],
        // ["2019-4-02", 17.78, 17.83, 17.78, 18.04, 27.0],
        // ["2019-4-03", 17.84, 17.9, 17.84, 18.06, 34.0],
        // ["2019-4-04", 17.97, 18.36, 17.85, 18.39, 62.0],
        // ["2019-4-05", 18.3, 18.57, 18.18, 19.08, 177.0],
        // ["2019-4-06", 18.53, 18.68, 18.3, 18.71, 95.0, 0],
        // ["2019-4-09", 18.75, 19.08, 18.75, 19.98, 202.0],
        // ["2019-4-10", 18.85, 18.64, 18.56, 18.99, 85.0],
        // ["2019-4-11", 18.64, 18.44, 18.31, 18.64, 50.0],
        // ["2019-4-12", 18.55, 18.27, 18.17, 18.57, 43.0],
        // ["2019-4-13", 18.13, 18.14, 18.09, 18.34, 35.0],
        // ["2019-4-16", 18.01, 18.1, 17.93, 18.17, 34.0],
        // ["2019-4-17", 18.2, 18.14, 18.08, 18.45, 58.0],
        // ["2019-4-18", 18.23, 18.16, 18.0, 18.45, 47.0],
        // ["2019-4-19", 18.08, 18.2, 18.05, 18.25, 32.0],
        // ["2019-4-20", 18.15, 18.15, 18.11, 18.29, 36.0],
        // ["2019-4-23", 18.16, 18.19, 18.12, 18.34, 47.0],
        // ["2019-4-24", 18.23, 17.88, 17.7, 18.23, 62.0],
        // ["2019-4-25", 17.85, 17.73, 17.56, 17.85, 66.0],
        // ["2019-4-26", 17.79, 17.53, 17.5, 17.92, 63.0],
        // ["2019-4-27", 17.51, 17.04, 16.9, 17.51, 67.0],
        // ["2019-4-30", 17.07, 17.2, 16.98, 17.32, 55.0],
        // ["2019-5-01", 17.28, 17.11, 16.91, 17.28, 39.0],
        // ["2019-5-02", 17.13, 17.91, 17.05, 17.99, 102.0],
        // ["2019-5-03", 17.8, 17.78, 17.61, 17.98, 71.0],
        // ["2019-5-04", 17.6, 17.25, 17.13, 17.69, 51.0],
        // ["2019-5-07", 17.2, 17.39, 17.15, 17.45, 43.0],
        // ["2019-5-08", 17.3, 17.42, 17.18, 17.62, 45.0],
        // ["2019-5-09", 17.33, 17.39, 17.32, 17.59, 44.0],
        // ["2019-5-10", 17.39, 17.26, 17.21, 17.65, 44.0],
        // ["2019-5-11", 17.23, 16.92, 16.66, 17.26, 114.0],
        // ["2019-5-14", 16.75, 17.06, 16.5, 17.09, 94.0],
        // ["2019-5-15", 17.03, 17.03, 16.9, 17.06, 46.0],
        // ["2019-5-16", 17.08, 16.96, 16.87, 17.09, 30.0],
        // ["2019-5-17", 17.0, 17.1, 16.95, 17.12, 50.0],
        // ["2019-5-18", 17.09, 17.52, 17.04, 18.06, 156.0],
        // ["2019-5-21", 17.43, 18.23, 17.35, 18.45, 152.0],
        // ["2019-5-22", 18.14, 18.27, 18.06, 18.32, 94.0],
        // ["2019-5-23", 18.28, 18.19, 18.17, 18.71, 108.0],
        // ["2019-5-24", 18.18, 18.14, 18.01, 18.31, 37.0],
        // ["2019-5-25", 18.22, 18.33, 18.2, 18.36, 48.0],
        // ["2019-5-28", 18.35, 17.84, 17.8, 18.39, 48.0],
        // ["2019-5-29", 17.83, 17.94, 17.71, 17.97, 36.0],
        // ["2019-5-30", 17.9, 18.26, 17.55, 18.3, 71.0],
        // ["2019-5-31", 18.12, 17.99, 17.91, 18.33, 72.0],
        // ["2019-6-04", 17.91, 17.28, 17.16, 17.95, 37.0],
        // ["2019-6-05", 17.17, 17.23, 17.0, 17.55, 51.0],
        // ["2019-6-06", 17.2, 17.31, 17.06, 17.33, 31.0],
        // ["2019-6-07", 17.15, 16.67, 16.51, 17.15, 19.0],
        // ["2019-6-08", 16.8, 16.81, 16.61, 17.06, 60.0],
        // ["2019-6-11", 16.68, 16.04, 16.0, 16.68, 65.0],
        // ["2019-6-12", 16.03, 15.98, 15.88, 16.25, 46.0],
        // ["2019-6-13", 16.21, 15.87, 15.78, 16.21, 57.0],
        // ["2019-6-14", 15.55, 15.89, 15.52, 15.96, 42.0],
        // ["2019-6-15", 15.87, 15.48, 15.45, 15.92, 34.0],
        // ["2019-6-18", 15.39, 15.42, 15.36, 15.7, 26.0],
        // ["2019-6-19", 15.58, 15.71, 15.35, 15.77, 38.0],
        // ["2019-6-20", 15.56, 15.52, 15.24, 15.68, 38.0],
        // ["2019-6-21", 15.41, 15.3, 15.28, 15.68, 35.0],
        // ["2019-6-22", 15.48, 15.28, 15.13, 15.49, 30.0],
        // ["2019-6-25", 15.29, 15.48, 15.2, 15.49, 21.0],
        // ["2019-6-26", 15.33, 14.86, 14.78, 15.39, 30.0],
        // ["2019-6-27", 14.96, 15.0, 14.84, 15.22, 51.0],
        // ["2019-6-28", 14.96, 14.72, 14.62, 15.06, 25.0],
        // ["2019-6-29", 14.75, 14.99, 14.62, 15.08, 36.0],
        // ["2019-7-01", 14.98, 14.72, 14.48, 15.18, 27.0],
        // ["2019-7-02", 14.65, 14.85, 14.65, 14.95, 18.0],
        // ["2019-7-03", 14.72, 14.67, 14.55, 14.8, 23.0],
        // ["2019-7-04", 14.79, 14.88, 14.69, 14.93, 22.0],
        // ["2019-7-05", 14.9, 14.86, 14.78, 14.93, 16.0],
        // ["2019-7-15", 14.5, 14.66, 14.47, 14.82, 19.0],
        // ["2019-7-16", 14.77, 14.94, 14.72, 15.05, 26.0],
        // ["2019-7-17", 14.95, 15.03, 14.88, 15.07, 38.0],
        // ["2019-7-18", 14.95, 14.9, 14.87, 15.06, 28.0],
        // ["2019-7-19", 14.9, 14.75, 14.68, 14.94, 22.0],
        // ["2019-7-22", 14.88, 15.01, 14.79, 15.11, 38.0],
        // ["2019-7-23", 15.01, 14.83, 14.72, 15.01, 24.0]
    //   ]
    };
  },
  mounted() {
    // 这里实现的是一个比较简单的，可以按照需求将函数移动到methods函数中
    var clone_data = Object.assign({}, this.data)
    var data_list = []
    for(var key in clone_data){
        var l = []
        for (var item in clone_data[key]){
            l.push(clone_data[key][item])
        }
        data_list.push(l)
    }

    var data0 = splitData(data_list);
    // macd计算
    function splitData(rawData) {
      var categoryData = [];
      var values = [];
      var macds = [];
      var difs = [];
      var deas = [];
      var volums = [];
      var volums_color = [];
      var open,
        close = 0.0;
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        open = parseFloat(rawData[i][0]);
        close = parseFloat(rawData[i][1]);
        if (open < close) {
          volums_color.push("green");
        } else {
          volums_color.push("red");
        }
        volums.push(rawData[i][4]);
      }
      return {
        categoryData: categoryData,
        values: values,
        macds: macds,
        volums: volums,
        volums_color: volums_color,
        difs: difs,
        deas: deas
      };
    }
    // ma均线函数
    function calculateMA(dayCount) {
      var result = [];
      for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data0.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    }
    // k线配置项
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        }
      },
      grid: [
        {
          left: "3%",
          top: "0",
          height: "70%"
        },
        {
          left: "3%",
          right: "10%",
          top: "75%",
          height: "15%"
        }
      ],
      xAxis: [
        {
          type: "category",
          data: data0.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "red"
            }
          },
          splitLine: {
            show: false
          },
          splitNumber: 20
        },
        {
          type: "category",
          gridIndex: 1,
          data: data0.categoryData,
          axisLabel: { show: false }
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "red"
            }
          },
          position: "right"
        },
        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "red"
            }
          },
          position: "right"
        }
      ],
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100
        },
        {
          show: false, // 不显示滚动条
          type: "slider",
          y: "90%",
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: "555",
          type: "candlestick",
          data: data0.values,
          markPoint: {
            data: [
              {
                name: "XX标点"
              }
            ]
          },
          // markLine: {
          //   silent: true,
          //   data: [
          //     {
          //       yAxis: 2222
          //     }
          //   ]
          // }
        },
        {
          name: "MA5",
          type: "line",
          data: calculateMA(5),
          smooth: true,
          showSymbol: false, //是否默认展示圆点
          symbol: "circle", //设定为实心点
          symbolSize: 10, //设定实心点的大小
          lineStyle: {
            normal: {
              opacity: 0.5
            }
          }
        },
        {
          name: "MA10",
          type: "line",
          data: calculateMA(10),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              opacity: 0.5
            }
          }
        },
        {
          name: "MA20",
          type: "line",
          data: calculateMA(20),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              opacity: 0.5
            }
          }
        },
        {
          name: "MA30",
          type: "line",
          data: calculateMA(30),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              opacity: 0.5
            }
          }
        },
        {
          name: "MACD",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data0.volums,
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList;
                if (data0.volums_color[params.dataIndex] == "red") {
                  colorList = "#ef232a";
                } else {
                  colorList = "#14b143";
                }
                return colorList;
              }
            }
          }
        }
        // {
        //   name: "DIF",
        //   type: "line",
        //   showSymbol: false,
        //   xAxisIndex: 1,
        //   yAxisIndex: 1,
        //   data: data0.difs
        // },
        // {
        //   name: "DEA",
        //   type: "line",
        //   showSymbol: false,
        //   xAxisIndex: 1,
        //   yAxisIndex: 1,
        //   data: data0.deas
        // }
      ]
    };
    // 进行初始化
    var charts = echarts.init(this.$refs.echartContainer);
    charts.setOption(option);
  }
};
</script>

<style scoped>
body {
  color: #ef232a;
}
</style>