<template>
  <div class="Scenic module-box">
    <div class="title">
      <div class="img-box"></div>
      <div class="text">
        景区客流实时排行TOP5
      </div>
      <div class="list" @click="jump()"></div>
    </div>
    <div class="content">
      <ul class="list">
        <li class="item" v-for="(item, index) of list" :key="index">
          <div class="paiming">
            <div :class="ranking[index]"></div>
          </div>
          <div class="line">
            <dl>
              <dt>
                {{ item.name }}
              </dt>
              <dd>
                <div :style="{ width: (item.value / list[0].value) * 100 + '%' }"></div>
              </dd>
            </dl>
          </div>
          <div class="value">
            {{ item.value }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scenic',
  data() {
    return {
      ranking: ['one', 'two', 'there', 'four', 'fire'],
      list: [
        {
          name: '其他区域',
          value: '140'
        },
        {
          name: '溪口特色文创街区',
          value: '45'
        },
        {
          name: '凉亭',
          value: '40'
        },
        {
          name: '釜托寺',
          value: '35'
        },
        {
          name: '天登寺',
          value: '30'
        }
      ]
    }
  },
  methods: {
    // 跳转
    jump() {
      window.open('/bzTour/backstage/analysisIndex?indexName=keliu')
    }
  }
}
</script>

<style scoped lang="scss">
.Scenic {
  position: absolute;
  top: px2rem(107rem);
  left: px2rem(13rem);
  width: px2rem(549rem);
  height: px2rem(366rem);
  .title {
    .img-box {
      background: url('~@/assets/img/senic.png');
      background-size: contain;
    }
  }
  .content {
    box-sizing: border-box;
    padding: 0 px2rem(17rem);
    .list {
      display: flow-root;
      width: 100%;
      .item {
        margin-top: px2rem(15rem);
        width: 100%;
        height: px2rem(40rem);
        color: #fff;
        > div {
          float: left;
        }
        .paiming {
          width: px2rem(26rem);
          height: px2rem(33rem);
          div {
            width: 100%;
            height: 100%;
          }
          .one {
            background: url('~@/assets/img/one.png');
            background-size: 100% 100%;
          }
          .two {
            background: url('~@/assets/img/two.png');
            background-size: 100% 100%;
          }
          .there {
            background: url('~@/assets/img/there.png');
            background-size: 100% 100%;
          }
          .four {
            background: url('~@/assets/img/fore.png');
            background-size: 100% 100%;
          }
          .fire {
            background: url('~@/assets/img/fire.png');
            background-size: 100% 100%;
          }
        }
        .line {
          margin-left: px2rem(12rem);
          display: flow-root;
          dt {
            font-size: px2rem(16rem);
            font-weight: bold;
          }
          dd {
            width: px2rem(410rem);
            height: px2rem(11rem);
            margin-top: px2rem(8rem);
            div {
              width: 100%;
              height: 100%;
              transition: 1s;
              border-radius: 50px;
              background: linear-gradient(90deg, rgba(26, 150, 99, 1), rgba(97, 222, 211, 1));
            }
          }
        }
        .value {
          line-height: px2rem(40rem);
          margin-left: px2rem(22rem);
        }
      }
    }
  }
}
</style>
