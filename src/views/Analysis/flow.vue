<template>
  <div class="flow module-box">
    <div class="title">
      <div class="img-box"></div>
      <div class="text">客流来源地Top5</div>
      <div class="list" @click="jump()"></div>
    </div>
    <div class="content">
      <div id="flow"></div>
    </div>
  </div>
</template>

<script>
import { EleResize } from '@/utils/esresize'
export default {
  name: 'flow',
  data() {
    return {}
  },
  methods: {
    // 客流数据
    flowValue() {
      let myChart = this.echarts.init(document.getElementById('flow'))
      let resizeDiv = document.getElementById('flow')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['杭州', '湖州', '嘉兴', '绍兴', '其他'],
            axisTick: {
              alignWithLabel: true
            },
            show: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: '客流量',
            type: 'bar',
            barWidth: '60%',
            data: [153, 66, 31, 29, 15],
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#ba7ef3'
                  },
                  {
                    offset: 1,
                    color: '#965df2'
                  }
                ])
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
    },
    // 跳转
    jump() {
      // window.open('http://112.17.149.56:8086/bzTour/backstage/analysisIndex?indexName=keliu')
      window.open('/bzTour/backstage/analysisIndex?indexName=keliu')
    }
  },
  mounted() {
    this.flowValue()
  }
}
</script>

<style scoped lang="scss">
.flow {
  position: absolute;
  top: px2rem(811rem);
  left: px2rem(13rem);
  width: px2rem(549rem);
  height: px2rem(250rem);
  .title {
    .img-box {
      background: url('~@/assets/img/flow.png');
      background-size: contain;
    }
  }
  .content {
    height: px2rem(170rem);
    div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
