<template>
  <div class="senic">
    <div class="box" v-if="senic">
      <div class="title">
        <div class="imgbox">
        </div>
        <div class="text">
          景点展示
        </div>
        <div class="btn" @click="closePop()"></div>
      </div>
      <div class="content">
        <div class="img-box">
          <img :src="req + '/upload/img/' + senic.imgUrl" alt="">
        </div>
        <div class="desc">
          <h3>{{senic.name}}</h3>
          <p>{{senic.desc}}</p>
          <div class="dingwei" @click="flyCenter(senic)">
            <a>显示定位</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {senicData} from '@/api/control';
import {senicList} from '@/utils/pointData';
export default {
  name: 'senic',
  data () {
    return {
      senic:null,
      req,
    }
  },
  methods: {
    // 关闭弹出框
    closePop () {
      this.senic = null;
    },
    // 飞入点位
    flyCenter (point) {
      let {lon,lat} = point;
      TMapAPI.map.SetCenter(new SLonLat(lon, lat),1)
    }
  },
  mounted () {
    senicData({
      pageSize: 999,
    }).then(data=>{
      if (data.res) {
        let list = data.obj.list.results || [];
        list.forEach(item => {
          let iconValue = item;
          let sLonLat = new SLonLat(iconValue.lon, iconValue.lat);
          // 在地图内添加图标
          let imgurl = req + '/upload/icon/' + iconValue.icon
          let sIcon =new SIcon(imgurl,new SSize(iconValue.iconWidth, iconValue.iconHeight),new SPixel(-iconValue.iconWidth/2,-iconValue.iconHeight));
          let sMarker = new SMarker(sLonLat,sIcon,iconValue.id);
          TMapAPI.markerLayer.AddMarker(sMarker);

          sMarker.AddEventListener('click',iconValue,() => {
            let {img,description,name,lon,lat} = iconValue
            let senicInfo = {imgUrl:img,lon,lat,desc:description,name}
            this.senic = JSON.parse(JSON.stringify(senicInfo));
          });

          let lbl = new SLabel(null, sLonLat, null, 
            `<div>
              <span style="color: black;font-size: 14px;font-weight: bold;display:block;text-align:center;width:100px;" class="text">${iconValue.name}</span>
            </div>`, 
            iconValue.id
          );
          lbl.SetOpacity(0.8);
          lbl.SetOffset(new SSize(-50, 10 - (1 * 12)));
          lbl.SetAdaptive();
          TMapAPI.GetMap().AddLabel(lbl);
        })
      }
    }).catch(data=>{
      console.log('请求数据失败');
    })
  },
  beforeDestroy () {
    TMapAPI.ClearAll()
    TMapAPI.map.ClearLabels()
  }
}
</script>

<style scoped lang="scss">
.box {
  .title {
    width: px2rem(369rem);
    height: px2rem(69rem);
    line-height: px2rem(69rem);
    background: linear-gradient(90deg,rgba(25,191,138,1),rgba(26,136,85,1));
    border-radius: px2rem(7rem);
    position: relative;
    > div {
      float: left;
    }
    .imgbox {
      width: px2rem(69rem);
      height: px2rem(69rem);
      background: url('~@/assets/img/jingdianzhanshi.png');
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
      top: px2rem(-7rem);
      right: px2rem(15rem);
      float: right;
      width: px2rem(74rem);
      height: px2rem(73rem);
      background: url('~@/assets/img/组 10@2x.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
}
.senic {
  position: absolute;
  top: px2rem(238rem);
  left: px2rem(28rem);
  z-index: 1050;
  .content {
    width: px2rem(370rem);
    height: px2rem(290rem);
    margin-top: px2rem(8rem);
    border-radius: px2rem(7rem);
    overflow: hidden;
    .img-box {
      height: px2rem(205rem);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .desc {
      box-sizing: border-box;
      padding: px2rem(18rem) 0 0 px2rem(23rem);
      background:rgba(1,40,26,1);
      height: px2rem(86rem);
      position: relative;
      h3 {
        font-size:px2rem(18rem);
        font-weight:bold;
        color:rgba(255,255,255,1);
      }
      p {
        margin-top: px2rem(12rem);
        font-size: px2rem(12rem);
        color:rgba(255,255,255,1);
      }
      .dingwei {
        position: absolute;
        top: px2rem(18rem);
        right: px2rem(20rem);
        cursor: pointer;
        a {
          color: rgba(255,255,255,.8);
          text-decoration: underline;
        }
        &:before {
          content: '';
          display: inline-block;
          width: px2rem(10rem);
          height: px2rem(14rem);
          background: url('~@/assets/img/point.png');
          background-size: 100% 100%;
          vertical-align: middle;
          margin-right: px2rem(10rem);
        }
      }
    }
  }
}
</style>