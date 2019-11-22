<template>
  <div class="Crowd module-box">
    <div class="title">
      <div class="img-box"></div>
      <div class="text">游客人群画像</div>
      <div class="list"></div>
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
        <div id="crowd"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { EleResize } from "@/utils/esresize";
export default {
  name: "Crowd",
  data() {
    return {
      list: [
        {
          type: "nianlin",
          name: "年龄"
        },
        {
          type: "consumption",
          name: "消费水平"
        },
        {
          type: "hobby",
          name: "爱好"
        },
        {
          type: "sex",
          name: "性别"
        }
      ],
      type: "nianlin",
      echartsValue:{
        'nianlin':{
          legend: ["0-17岁", "18-25岁", "26-35岁", "36-48岁"],
          data: [
            { value: 335, name: "0-17岁" },
            { value: 310, name: "18-25岁" },
            { value: 234, name: "26-35岁" },
            { value: 135, name: "36-48岁" }
          ],
          name: '年龄人群'
        },
        consumption: {
          legend: ["0-17岁", "18-25岁", "26-35岁", "36-48岁"],
          data: [
            { value: 335, name: "0-17岁" },
            { value: 310, name: "18-25岁" },
            { value: 234, name: "26-35岁" },
            { value: 135, name: "36-48岁" }
          ],
          name: '消费水平'
        },
        hobby: {
          legend: ["0-17岁", "18-25岁", "26-35岁", "36-48岁"],
          data: [
            { value: 335, name: "0-17岁" },
            { value: 310, name: "18-25岁" },
            { value: 234, name: "26-35岁" },
            { value: 135, name: "36-48岁" }
          ],
          name: '爱好'
        },
        sex: {
          legend: ["0-17岁", "18-25岁", "26-35岁", "36-48岁"],
          data: [
            { value: 335, name: "0-17岁" },
            { value: 310, name: "18-25岁" },
            { value: 234, name: "26-35岁" },
            { value: 135, name: "36-48岁" }
          ],
          name: '爱好'
        }
      }
    };
  },
  methods: {
    // 显示echarts数据
    showEcharts (item) {
      let {legend,data,name} = item;
      let myChart = this.echarts.init(document.getElementById("crowd"));
      let resizeDiv = document.getElementById("crowd");
      let listener = () => {
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
      let option = {
        color: [
          "rgba(13,203,201,1)",
          "rgba(177,95,213,1)",
          "rgba(93,60,196,1)",
          "rgba(79,161,119,1)"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          // x: "right",
          top: "center",
          icon: "circle",
          right: '20%',
          textStyle: {
            color: '#fff',
            lineHeight: 30,
            fontWeight: 'bold',
            fontSize: 16,
          },
          data: []
          // data: ["0-17岁", "18-25岁", "26-35岁", "36-48岁"]
        },
        series: [
          {
            name: "年龄人群",
            type: "pie",
            radius: ["50%", "70%"],
            center: ['30%','50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      };
      
      option.legend.data = legend;
      option.series[0].name = name
      option.series[0].data = data
      myChart.setOption(option,true);
    },
    // 切换echarts数据
    tabEcharts(type) {
      this.type = type
      this.showEcharts(this.echartsValue[this.type])
    }
  },
  mounted () {
    this.showEcharts(this.echartsValue[this.type])
  }
};
</script>

<style scoped lang="scss">
.Crowd {
  position: absolute;
  top: px2rem(483rem);
  left: px2rem(13rem);
  width: px2rem(549rem);
  height: px2rem(317rem);
  .title {
    .img-box {
      background: url("~@/assets/img/crowd.png");
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
      height: px2rem(200rem);
      div {
        height: 100%;
      }
    }
  }
}
</style>
