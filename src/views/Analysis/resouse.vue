<template>
  <div class="resouse module-box">
    <div class="title">
      <div class="img-box"></div>
      <div class="text">
        资源统计
      </div>
      <div class="list" @click="jump()"></div>
    </div>
    <div class="content">
      <ul class="list">
        <li class="item" v-for="(item, index) of list" :key="index">
          <div class="img-box">
            <img :src="item.imgUrl" />
          </div>
          <div class="text">
            <dl>
              <dt>
                {{ item.title }}
              </dt>
              <dd>
                {{ item.number }}
              </dd>
            </dl>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resouse',
  data() {
    return {
      list: [
        {
          imgUrl: require('@/assets/img/jingqu.png'),
          title: '景区',
          number: 26
        },
        {
          imgUrl: require('@/assets/img/video.png'),
          title: '监控',
          number: 35
        },
        {
          imgUrl: require('@/assets/img/tingche.png'),
          title: '停车场',
          number: 21
        },
        {
          imgUrl: require('@/assets/img/wifi.png'),
          title: 'WIFI',
          number: 45
        },
        {
          imgUrl: require('@/assets/img/SOS@2x.png'),
          title: 'SOS',
          number: 12
        },
        {
          imgUrl: require('@/assets/img/guangbo.png'),
          title: '语音广播',
          number: 15
        },
        {
          imgUrl: require('@/assets/img/daping.png'),
          title: 'LED大屏',
          number: 3
        },
        {
          imgUrl: require('@/assets/img/ludeng.png'),
          title: '智慧路灯',
          number: 7
        }
      ]
    }
  },
  methods: {
    // 跳转
    jump() {
      window.open('/bzTour/backstage/resource?indexName=keliu')
    }
  }
}
</script>

<style scoped lang="scss">
.resouse {
  position: absolute;
  top: px2rem(760rem);
  left: px2rem(576rem);
  width: px2rem(762rem);
  height: px2rem(301rem);
  .title {
    .img-box {
      background: url('~@/assets/img/resouse.png');
      background-size: contain;
    }
  }
  .list {
    display: flow-root;
    margin-top: px2rem(15rem);
    .item {
      float: left;
      box-sizing: border-box;
      padding: px2rem(8rem);
      width: px2rem(178rem);
      height: px2rem(89rem);
      overflow: hidden;
      background: rgba(28, 30, 34, 1);
      border-radius: px2rem(5rem);
      margin-right: px2rem(10rem);
      > div {
        float: left;
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:nth-child(n + 5) {
        margin-top: px2rem(15rem);
      }
      .img-box {
        width: px2rem(73rem);
        height: px2rem(73rem);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        margin-left: px2rem(11rem);
        margin-top: px2rem(10rem);
        dl {
          dt {
            font-size: px2rem(14rem);
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          dd {
            font-size: px2rem(42rem);
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-top: px2rem(5rem);
          }
        }
      }
    }
  }
}
</style>
