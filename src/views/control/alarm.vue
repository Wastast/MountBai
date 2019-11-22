<template>
  <div class="alarm">
    <div class="box">
      <div class="title">
        <div class="imgbox">
        </div>
        <div class="text">
          告警信息
        </div>
        <div class="btn"></div>
      </div>
      <div class="content">
        <ul class="list">
          <li class="item" v-for="item of [1,2,3]" :key="item">
            <h3>设备离线通知</h3>
            <p>告警详情</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {pointData} from '@/api/control';

export default {
  name: 'alarm',
}
</script>

<style scoped lang="scss">
.box {
  .title {
    width: px2rem(369rem);
    height: px2rem(69rem);
    line-height: px2rem(69rem);
    background: linear-gradient(90deg,rgba(255,118,58,1),rgba(176,48,9,1));
    border-radius: px2rem(7rem);
    position: relative;
    > div {
      float: left;
    }
    .imgbox {
      width: px2rem(69rem);
      height: px2rem(69rem);
      background: url('~@/assets/img/jiankong 拷贝@2x.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
    .text {
      font-size:px2rem(22rem);
      font-weight:bold;
      color:rgba(255,255,255,1);
      text-shadow:0px 0px px2rem(21rem) rgba(10,62, 46,0.76);
    }
    .btn {
      position: absolute;
      top: px2rem(15rem);
      right: px2rem(15rem);
      float: right;
      width: px2rem(41rem);
      height: px2rem(42rem);
      background: url('~@/assets/img/圆角矩形 7 拷贝@2x.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
}
.alarm {
  position: absolute;
  bottom: 10%;
  right: 1rem;
  z-index: 1050;
  .content {
    width: px2rem(370rem);
    height: px2rem(224rem);
    margin-top: px2rem(8rem);
    border-radius: px2rem(7rem);
    overflow: hidden;
    .list {
      display: flow-root;
      .item {
        height: px2rem(75rem);
        background:rgba(84,29,0,1);
        box-sizing: border-box;
        padding: px2rem(19rem) 0 0 px2rem(23rem);
        &:nth-child(even) {
          background:rgba(50,18,0,1);
        }
        h3 {
          font-size: px2rem(16rem);
          font-weight:bold;
          color:rgba(255,255,255,1);
        }
        p {
          font-size: px2rem(12rem);
          margin-top: px2rem(11rem);
          color:rgba(255,255,255,.5);
        }
      }
    }
  }
}
</style>
