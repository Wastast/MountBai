<template>
  <div class="park module-box">
    <div class="title">
      <div class="img-box"></div>
      <div class="text">
        停车场分析
      </div>
      <div class="list" @click="jump()"></div>
    </div>
    <div class="content">
      <div class="top">
        <span class="name">
          停车场名称
        </span>
        <span class="yijing">
          已使用
        </span>
        <span class="weishi">
          未使用
        </span>
        <span class="baifenbi">
          使用占比
        </span>
      </div>
      <ul class="list">
        <li class="item" v-for="(item, index) of list" :key="index">
          <div class="d-name ellipsis">
            {{ item.name }}
          </div>
          <div class="d-shiyong ellipsis">
            {{ item.shiyong }}
          </div>
          <div class="d-yijing ellipsis">
            {{ item.weishiyong }}
          </div>
          <div class="d-baifen">
            <div class="line" :style="{ width: item.baifenbi, background: item.color }"></div>
          </div>
          <div class="d-baifenbi">
            {{ item.baifenbi }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'park',
  data() {
    return {
      list: [
        {
          name: '停车场名称',
          shiyong: 224,
          weishiyong: 56,
          baifenbi: '80%',
          color: 'rgba(200,51,27,1)'
        },
        {
          name: '停车场名称',
          shiyong: 12,
          weishiyong: 120,
          baifenbi: '70%',
          color: 'rgba(200,96,27,1)'
        },
        {
          name: '停车场名称',
          shiyong: 12,
          weishiyong: 120,
          baifenbi: '50%',
          color: 'rgba(73,173,185,1)'
        }
      ]
    }
  },
  methods: {
    // 跳转
    jump() {
      // window.open('http://112.17.149.56:8086/bzTour/backstage/analysisIndex?indexName=keliu')
      window.open('/bzTour/backstage/ticketingDetailsIframe?indexName=keliu')
    }
  }
}
</script>

<style scoped lang="scss">
.park {
  position: absolute;
  top: px2rem(467rem);
  right: px2rem(19rem);
  width: px2rem(549rem);
  height: px2rem(281rem);
  .title {
    .img-box {
      background: url('~@/assets/img/park.png');
      background-size: contain;
    }
  }
  .content {
    display: flow-root;
    padding: 0 px2rem(14rem);
    .top {
      color: rgba(48, 197, 143, 1);
      height: px2rem(42rem);
      line-height: px2rem(42rem);
      position: relative;
      font-weight: bold;
      border-bottom: 1px solid rgba(128, 130, 135, 0.7);
      > span {
        position: absolute;
      }
      .name {
        left: px2rem(12rem);
      }
      .yijing {
        left: px2rem(182rem);
      }
      .weishi {
        left: px2rem(280rem);
      }
      .baifenbi {
        left: px2rem(349rem);
      }
    }
    .list {
      display: flow-root;
      .item {
        color: #fff;
        display: flow-root;
        position: relative;
        height: px2rem(44rem);
        > div {
          text-align: center;
          float: left;
          height: px2rem(44rem);
          line-height: px2rem(44rem);
          position: absolute;
        }
        &:not(:last-child) {
          border-bottom: 1px solid rgba(128, 130, 135, 0.2);
        }
        .d-name {
          left: px2rem(12rem);
          width: px2rem(100rem);
          text-align: left;
        }
        .d-shiyong {
          left: px2rem(189rem);
          width: px2rem(40rem);
        }
        .d-yijing {
          left: px2rem(280rem);
          width: px2rem(40rem);
        }
        .d-baifen {
          left: px2rem(349rem);
          width: px2rem(70rem);
          .line {
            width: 100%;
            height: px2rem(11rem);
            background: red;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .d-baifenbi {
          left: px2rem(451rem);
        }
      }
    }
  }
}
</style>
