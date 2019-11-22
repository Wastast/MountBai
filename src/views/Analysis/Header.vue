<template>
  <div class="Header">
    <div class="center">
      <div class="imgbox">
      </div>
      <div class="text">
        百丈全域旅游
      </div>
    </div>
    <div class="right">
      <router-link tag="div" to="/control" class="tuichu ellipsis">
        <img src="@/assets/img/control.png">
        综合管控
      </router-link>
      <div class="tuichu ellipsis" @click="out()">
        <img src="@/assets/img/out.png">
        退出
      </div>
    </div>
  </div>
</template>

<script>
import {removeToken} from '@/utils/auth.js';
export default {
  name: 'Header',
  methods: {
    // 退出登录
    out () {
      removeToken()
    }
  },
}
</script>

<style scoped lang="scss">
  .Header {
    width: 100%;
    height: px2rem(103rem);
    background: url('~@/assets/img/title.png');
    background-size: 100% 100%;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    .center {
      width: px2rem(517rem);
      height: px2rem(96rem);
      background:rgba(0,16,15,1);
      border:px2rem(1rem) solid rgba(96,199,178,1);
      border-radius:px2rem(0) px2rem(0) px2rem(45rem) px2rem(45rem);
      margin: -.1rem auto 0;
      > div {
        float: left;
      }
      .imgbox {
        width: px2rem(60rem);
        height: px2rem(50rem);
        background: url('~@/assets/img/ab88e081ec9a239f0b8379f57a729cc.jpg');
        background-size: 100% 100%;
        margin-top: px2rem(20rem);
        margin-left: px2rem(60rem);
      }
      .text {
        font-size: px2rem(38rem);
        line-height: px2rem(90rem);
        color: #fff;
        margin-left: px2rem(50rem);
      }
    }
    .right {
      position: absolute;
      top: px2rem(22rem);
      right: px2rem(18rem);
      cursor: pointer;
      > div {
        float: left;
        width: px2rem(150rem);
        height: px2rem(70rem);
        line-height: px2rem(70rem);
        margin-left: px2rem(11rem);
        font-size: px2rem(18rem);
        color: #fff;
        border:1px solid rgba(17,79,61,1);
        background:linear-gradient(0deg,rgba(3,38,24,1) 0%,rgba(0,0,0,1) 100%);
        border-radius: px2rem(17rem);
        img {
          width: px2rem(38rem);
          height: px2rem(38rem);
          margin: px2rem(-7rem) px2rem(5rem) 0 px2rem(15rem);
        }
      }
    }
  }
</style>
