<template>
  <div class="Bayonet module-box">
    <div class="title">
      <div class="img-box"></div>
      <div class="text">卡口分析</div>
      <div class="list" @click="jump()"></div>
    </div>
    <div class="content">
      <div class="top-select">
        <ul class="list">
          <li
            class="item"
            :class="type == item.type?'checked':''"
            v-for="item of list"
            :key="item.type"
            @click="tabEcharts(item.type)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="echarts">
        <div id="kakou"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { EleResize } from "@/utils/esresize";
export default {
  name: "Bayonet",
  data() {
    return {
      list: [
        {
          type: "kakou",
          name: "高速卡口"
        }
      ],
      type: "kakou"
    };
  },
  methods: {
    // 跳转
    jump() {
      window.open('/bzTour/backstage/passengerSource?indexName=keliu')
    },
    // echarts数据
    echartsValue() {
      let myChart = this.echarts.init(document.getElementById("kakou"));
      let resizeDiv = document.getElementById("kakou");
      let listener = () => {
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
      let option = (option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          data: ["市内", "省内", "省外", "市外"],
          orient: "vertical",
          top: "center",
          icon: "circle",
          right: '20%' ,
          textStyle: {
            color: "#fff",
            lineHeight: 30,
            fontWeight: "bold",
            fontSize: 16
          },
          formatter: (name) => {
            return name
          }
        },
        series: [
          {
            color: ["rgba(177,95,213,1)", "rgba(93,60,196,1)"],
            name: "高速卡口",
            type: "pie",
            radius: ["40%", "55%"],
            center: ['30%','50%'],
            data: [
              { value: 75, name: "市内" },
              { value: 25, name: "市外" }
            ],
            label: {
              normal: {
                show: false,
              },
            },
          },
          {
            color: ["rgba(30,48,219,1)", "rgba(245,155,39,1)"],
            name: "高速卡口",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            center: ['30%','50%'],
            label: {
              normal: {
                show: false,
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false,
              }
            },
            data: [
              { value: 66, name: "省内" },
              { value: 34, name: "省外" }
            ]
          }
        ]
      });
      myChart.setOption(option, true);
    }
  },
  mounted() {
    this.echartsValue();
  }
};
</script>

<style scoped lang="scss">
.Bayonet {
  position: absolute;
  top: px2rem(107rem);
  right: px2rem(19rem);
  width: px2rem(549rem);
  height: px2rem(350rem);
  .title {
    .img-box {
      background: url("~@/assets/img/Bayonet.png");
      background-size: contain;
    }
  }
  .content {
    margin-top: px2rem(11rem);
    width: px2rem(503rem);
    padding: 0 px2rem(14rem);
    .top-select {
      height: px2rem(46rem);
      background: rgba(0, 30, 19, 1);
      border-radius: px2rem(4rem);
      display: flex;
      .list {
        display: flow-root;
        margin: 0 auto;
        .checked {
          font-weight: bold;
          &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: px2rem(4rem);
            border-radius: 10px;
            bottom: 0;
            left: 0;
            background: rgba(33, 163, 117, 1);
          }
        }
        .item {
          float: left;
          display: flow-root;
          height: px2rem(46rem);
          line-height: px2rem(46rem);
          text-align: center;
          font-size: px2rem(16rem);
          color: rgba(255, 255, 255, 1);
          position: relative;
          padding: 0 px2rem(15rem);
          &:nth-child(n + 2) {
            margin-left: px2rem(10rem);
          }
          &:hover {
            font-weight: bold;
            &::before {
              content: "";
              position: absolute;
              width: 100%;
              height: px2rem(4rem);
              border-radius: 10px;
              bottom: 0;
              left: 0;
              background: rgba(33, 163, 117, 1);
            }
          }
        }
      }
    }
    .echarts {
      height: px2rem(250rem);
      div {
        height: 100%;
      }
    }
  }
}
</style>
