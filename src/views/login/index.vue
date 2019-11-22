<template>
  <div class="index">
    <div class="login">
      <div class="logo">

      </div>
      <div class="text">
        百丈全域旅游
      </div>
      <div class="denglu">
        <div class="user">
          <span>
            账号
          </span>
          <input type="text" v-model="user.name">
        </div>
        <div class="password" @keyup.enter="login()">
          <span>
            密码
          </span>
          <input type="password" v-model="user.password">
        </div>
      </div>
      <div class="loging" @click="login()">
        登录
      </div>
    </div>
  </div>
</template>
 
<script>
import {TipsPop} from '@/utils/el_ui.js';
import {setToken} from '@/utils/auth.js';
export default {
  name: 'index',
  data () {
    return {
      user: {
        password: '',
        name: '',
      }
    }
  },
  methods: {
    // 登录
    login () {
      let {password,name} = this.user;
      if (password == '' && name == '') {
        TipsPop({
          message: '账号或者密码不允许为空,请输入有效数据',
          type: 'info'
        })
        return
      }
      if (password === '123456' && name === 'admin') {
        TipsPop({
          message: '登录成功,1秒后跳转至综合管控页',
        })
        setToken('123456');
        setTimeout(() => {
          this.$router.push({
            path: '/control'
          })
        }, 1000);
        return
      }else{
        TipsPop({
          message: '登录失败,账号或密码错误,请重新输入',
          type: 'error'
        })
        password = '';
        name = '';
      }
      this.user = {password,name}
    }
  },
}
</script>

<style scoped lang="scss">
.index {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/img/489F6A708413CF346F2BF557DCC079DD@2x.png');
  background-size: 100% 100%;
  .login {
    position: absolute;
    top: 0;
    left: px2rem(1220rem);
    width: px2rem(433rem);
    height: px2rem(617rem);
    background:rgba(0,0,0,.3);
    border-radius:20px;
    border-radius: 0 0 px2rem(20rem) px2rem(20rem);
    .logo {
      margin: px2rem(89rem) 0 0 px2rem(124rem);
      width: px2rem(181rem);
      height: px2rem(98rem);
      background: url('~@/assets/img/ab88e081ec9a239f0b8379f57a729cc.jpg');
      background-size: 100% 100%;
    }
    .text {
      margin-top: px2rem(17rem);
      font-size: px2rem(38rem);
      font-family:PangMenZhengDao;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-align: center;
    }
    .denglu {
      margin-top: px2rem(90rem);
      > div {
        width: px2rem(300rem);
        height: px2rem(50rem);
        line-height: px2rem(50rem);
        background:rgba(243,247,254,1);
        border-radius:px2rem(50rem);
        margin-left: px2rem(64rem);
        box-sizing: border-box;
        padding-left: px2rem(31rem);
      }
      span {
        position: relative;
        font-size: px2rem(16rem);
        font-weight:bold;
        color:rgba(0,116,124,1);
        &::after {
          content: '';
          display: inline-block;
          width: 1px;
          height: px2rem(21rem);
          background: rgba(0,116,124,1);
          vertical-align: middle;
          margin-left: px2rem(20rem);
          margin-top: -.05rem;
        }
      }
      input {
        background: rgba(0,0,0,0);
        font-size: px2rem(17rem);
        text-indent: 1em;
      }
      .password {
        margin-top: px2rem(24rem);
      }
    }
    .loging {
      width: px2rem(300rem);
      height: px2rem(50rem);
      border:2px solid rgba(195,238,228,1);
      background:linear-gradient(180deg,rgba(10,195,136,1) 0%,rgba(8,126,140,1) 100%);
      border-radius: px2rem(25rem);
      margin: px2rem(49rem) 0 0 px2rem(64rem);
      text-align: center;
      letter-spacing: 10px;
      line-height: px2rem(50rem);
      color: #fff;
      font-weight: bold;
      font-size: px2rem(16rem);
      cursor: pointer;
    }
  }
}
</style>
