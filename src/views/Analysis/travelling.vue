<template>
  <div class="travelling module-box">
    <div class="title">
      <div class="img-box"></div>
      <div class="text">自驾游统计</div>
      <div class="list"></div>
    </div>
    <div class="content">
      <div id="travelling"></div>
    </div>
  </div>
</template>

<script>
import { EleResize } from "@/utils/esresize";
export default {
  name: "travelling",
  methods: {
    // 自驾游数据统计
    statistics() {
      let myChart = this.echarts.init(document.getElementById("travelling"));
      let resizeDiv = document.getElementById("travelling");
      let listener = () => {
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
      let option = {
        color:['#49adb9','#5d3cc4'],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["到返", "返程"],
          textStyle: {
            color: 'rgba(255,255,255,.7)'
          },
          icon: "circle",
        },
        xAxis: [
          {
            type: "category",
            data: ["景点名称", "景点名称", "景点名称", "景点名称", "景点名称"],
            axisLine:{
              lineStyle: {
                color: 'rgba(255,255,255,.8)',
              }
            },
            axisTick: {
              lineStyle: {
                color: 'rgba(255,255,255,.8)'
              }
            },
          }
        ],
        yAxis: [
          {
            name: '单位: 万',
            type: "value",
            axisLine:{
              lineStyle: {
                color: 'rgba(255,255,255,.8)',
              }
            },
            axisTick: {
              lineStyle: {
                color: 'rgba(255,255,255,.8)'
              }
            },
            splitLine: {
              lineStyle:{
                color: '#333'
              }
            }
          }
        ],
        series: [
          {
            barWidth: 15, //柱子宽度
            name: "到返",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6]
          },
          {
            barWidth: 15, //柱子宽度
            name: "返程",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4, 28.7]
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted () {
    this.statistics()
  }
};
</script>

<style scoped lang="scss">
.travelling {
  position: absolute;
  top: px2rem(759rem);
  right: px2rem(19rem);
  width: px2rem(549rem);
  height: px2rem(302rem);
  .title {
    .img-box {
      background: url("~@/assets/img/travelling.png");
      background-size: contain;
    }
  }
  .content {
    box-sizing: border-box;
    height: px2rem(240rem);
    div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
