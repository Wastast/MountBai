<template>
  <div class="Header">
    <div class="top">
      <div class="logo">
        <div class="img-box">
          <img src="@/assets/img/ab88e081ec9a239f0b8379f57a729cc.jpg" alt="">
        </div>
        <div class="text">
          百丈全域旅游
        </div>
      </div>
      <ul class="list">
        <li 
          class="item"
          :class="type == item.type?'checked':''"
          v-for="(item,index) of list" :key="index"
          @click="getType(item.type)"
          >
          <dl>
            <dt>
              <img :src="item.imgUrl">
            </dt>
            <dd class="ellipsis">
              {{item.name}}
            </dd>
          </dl>
        </li>
      </ul>
      <div class="right">
        <!-- <router-link tag="div" to="/analysis" class="tuichu ellipsis">
          <img src="@/assets/img/data.png">
          数据分析
        </router-link> -->
        <!-- <div class="tuichu ellipsis" @click="out()">
          <img src="@/assets/img/out.png">
          退出
        </div> -->
        <div class="tuichu ellipsis" @click="addpoint()">
          <img src="@/assets/img/out.png">
          退出
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {removeToken} from '@/utils/auth.js';
export default {
  name: 'Header',
  props: ['type'],
  data () {
    return {
      list: [{
        imgUrl: require('@/assets/img/t-jingqu.png'),
        name: '景区',
        type: 'scenic'
      },{
        imgUrl: require('@/assets/img/t-jiankong.png'),
        name: '视频监控',
        type: 'video'
      },{
        imgUrl: require('@/assets/img/t-wifi.png'),
        name: '无线wifi',
        type: 'wifi'
      },{
        imgUrl: require('@/assets/img/t-guangbo.png'),
        name: '广播',
        type: 'broadcast'
      },{
        imgUrl: require('@/assets/img/t-sos.png'),
        name: 'SOS报警',
        type: 'sos'
      },{
        imgUrl: require('@/assets/img/t-led.png'),
        name: 'LED大屏',
        type: 'led'
      },{
        imgUrl: require('@/assets/img/t-led.png'),
        name: '路灯',
        type: 'light'
      }]
    }
  },
  methods: {
    // 获取当前选项的type
    getType (type) {
      this.$emit('switchType',type)
    },
    // 退出登录
    out () {
      removeToken()
    },
    // 添加点位
    addpoint () {
      TMapAppLib.Draw.EnablePoint(TMapAPI.GetMap(), (geo) => {
        TMapAPI.HideMarkersByTag('id00001'); // 清除点位
        TMapAPI.GetVectorLayer().ClearFeatures(); // 清除svg
        let pointMap = new SLonLat(geo.GetX(),geo.GetY()) // 转换成地图坐标
        console.log(pointMap);
        // this.ruleForm.flon = map.FLon
        // this.ruleForm.flat = map.FLat

        // let {ftype} = this.ruleForm
        // let iconSize = new SSize(24, 24);
        // let iconOffset = new SPixel(-12,-12);
        // let imgUrl;
        // if (ftype.images) {
        //   imgUrl =  req + '/'+ ftype.images
        // }else{
        //   imgUrl = require('@/assets/img/sostubiap.png');
        // }
        // let gg = new SIcon( imgUrl,iconSize, iconOffset);
        // let maker2 = new SMarker(pointMap,gg, 'id00001');//初始化点位标注
        // TMapAPI.markerLayer.AddMarker(maker2);
      }, "test point");
    }
  },
}
</script>

<style scoped lang="scss">
.Header {
  position: absolute;
  top: px2rem(25rem);
  left: px2rem(27rem);
  width: px2rem(1864rem);
  height: px2rem(160rem);
  background:rgba(6,101,62,.7);
  border-radius:12px;
  z-index: 1050;
  .top {
    height: px2rem(154rem);
    background:url('~@/assets/img/t-title.png');
    background-size: 100% 100%;
    .list {
      float: left;
      display: flow-root;
      margin: px2rem(10rem) 0 0 px2rem(100rem);
      .checked {
        background: url('~@/assets/img/矩形 6@2x.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
      .item {
        float: left;
        width: px2rem(108rem);
        height: px2rem(105rem);
        margin-right: px2rem(30rem);
        dt {
          margin-left: px2rem(15rem);
          width: px2rem(75rem);
          height: px2rem(75rem);
          img {
            width: 100%;
            height: 100%;
          }
        }
        dd {
          text-align: center;
          color: #fff;
          font-size: px2rem(20rem);
          color:rgba(255,255,255,1);
          text-shadow:0px 2px 9px rgba(63,124,158,0.54);
        }
        &:hover{
          background: url('~@/assets/img/矩形 6@2x.png');
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
    }
    .logo {
      float: left;
      height: px2rem(154rem);
      margin-left: px2rem(50rem);
      > div {
        float: left;
      }
      .img-box {
        width: px2rem(181rem);
        height: px2rem(98rem);
        margin-top: px2rem(20rem);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        margin-left: px2rem(10rem);
        line-height: px2rem(130rem);
        color: #fff;
        font-size: px2rem(38rem);
        font-family:PangMenZhengDao;
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
}
</style>
