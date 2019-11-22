<template>
  <div class="wifi">
    <div class="box">
      <div class="title">
        <div class="imgbox">
        </div>
        <div class="text">
          无线wifi
        </div>
        <div class="btn"></div>
      </div>
      <div class="content">
        <div class="top">
          <div 
            class="input" 
            @keyup.enter="query()"
            >
            <el-input
              placeholder="输入关键字后,按回车键查询"
              prefix-icon="el-icon-search"
              v-model="content">
            </el-input>
          </div>
        </div>
        <ul class="list">
          <li 
            class="item"
            v-for="(item,index) of pointlist" :key="index"
            :class="item.inOrout?'':'outline'"
            >
            <div class="text">
              <div class="name">
                <span>{{item.name}}</span>
              </div>
              <div class="isline">
                {{item.inOrout ? "在线": "离线"}}
              </div>
              <div 
                class="play"
                v-if="item.inOrout"
                >
                <a>实时</a>
                <a>历史</a>
              </div>
            </div>
          </li>
          <li class="item page">
            <el-pagination
              background
              layout="prev, pager, next"
              :pager-count="5"
              :page-sizes="[7]"
              :small="true"
              :page-size="7"
              :total="100">
            </el-pagination>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {pointData} from '@/api/control';

export default {
  name: 'wifi',
  data () {
    return {
      pointlist: [{
        name: 'wifi1',
        lon: 430.5,
        lat: 468.5,
        imgUrl: require('@/assets/img/wifiin.png'),
        inOrout: 1,
        iconWidth: 40,
        iconHeight: 47,
        typeId: 'radio',
      }, {
        name: 'wifi2',
        lon: 354.3156276778175,
        lat: 609.0329350090663,
        imgUrl: require('@/assets/img/wifiin.png'),
        inOrout: 1,
        iconWidth: 40,
        iconHeight: 47,
        typeId: 'radio',
      }, {
        name: 'wifi3',
        lon: 510.3156276778175,
        lat: 628.0329350090663,
        imgUrl: require('@/assets/img/wifiin.png'),
        inOrout: 1,
        iconWidth: 40,
        iconHeight: 47,
        typeId: 'radio',
      }, {
        name: 'wifi4',
        lon: 335.3156276778175,
        lat: 631.5329350090663,
        imgUrl: require('@/assets/img/wifiin.png'),
        inOrout: 1,
        iconWidth: 40,
        iconHeight: 47,
        typeId: 'radio',
      }, {
        name: 'wifi5',
        lon: 285.8156276778175,
        lat: 645.0329350090663,
        imgUrl: require('@/assets/img/wifiout.png'),
        inOrout: 0,
        iconWidth: 40,
        iconHeight: 47,
        typeId: 'radio',
      }],
      content: '',
    }
  },
  methods: {
    // 查询数据
    query () {
      console.log(this.content);
    }
  },
  mounted () {
    pointData({
      type: 'wifi',
      pageNum: 1,
      pageSize: '7'
    }).then(data => {
      console.log(data);
    })
    // this.pointlist.forEach(item => {
    //   var iconValue = item;
    //   var sLonLat = new SLonLat(iconValue.lon, iconValue.lat);
    //   // 在地图内添加图标
    //   var sIcon =new SIcon(iconValue.imgUrl,new SSize(iconValue.iconWidth, iconValue.iconHeight),new SPixel(-iconValue.iconWidth/2,-iconValue.iconHeight));
    //   var sMarker = new SMarker(sLonLat,sIcon,iconValue.typeId);
    //   TMapAPI.markerLayer.AddMarker(sMarker);
    //   // sMarker.AddEventListener('click',iconValue,() => {
    //   //   if (iconValue.statusName == '正常') {
    //   //     TMapAPI.map.SInfoWindow.Hide()
    //   //     let id = iconValue.dimTourDevcVideoSurveillance.id;
    //   //     this.videoPopShow(id)
    //   //     let title = iconValue.name
    //   //   }else{
    //   //   }
    //   // });
    // })
  },
  beforeDestroy () {
    TMapAPI.ClearAll()
  }
}
</script>
<style scoped>
.wifi  >>> .el-pagination {
  margin-top: .2rem;
}
.wifi >>> .el-pagination.is-background.el-pagination--small .el-pager li {
  margin: 0 .06rem;
  min-width: .44rem;
}
.wifi >>> .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext {
  font-size: .24rem;
  line-height: .44rem;
  height: .44rem;
}
.wifi >>> .el-pager li {
  padding: 0 .08rem;
}
.wifi >>> .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon {
  font-size: .24rem;
}
.wifi >>> .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
  background-color: rgba(6,50,32,1);
  color: rgba(255,255,255,.7);
}
.wifi >>> .el-pagination.is-background .el-pager li {
  background-color: rgba(6,50,32,1);
  color: rgba(255,255,255,.7);
}
.wifi >>> .el-pagination.is-background .btn-prev { 
  background-color: rgba(6,50,32,1);
  color: rgba(255,255,255,.7);
}
.wifi >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgba(58,185,154,1);
}
.top .input >>> .el-input--prefix .el-input__inner {
  padding-left: .6rem;
  border-radius: 1rem;
}
.top .input >>> .el-input__inner {
  background-color: #FFF;
  background-image: none;
  border-radius: .08rem;
  border: 1px solid #DCDFE6;
  color: #606266;
  height: .56rem;
  line-height: .56rem;
  padding: 0 .3rem;
  font-size: .24rem;
}
.top .input >>> .el-input__icon {
  height: 100%;
  width: .5rem;
  line-height: .56rem;
}
</style>

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
.wifi {
  position: absolute;
  top: 25%;
  left: px2rem(30rem);
  z-index: 1050;
  .content {
    width: px2rem(370rem);
    // height: px2rem(204rem);
    margin-top: px2rem(8rem);
    border-radius: px2rem(7rem);
    overflow: hidden;
    .top {
      height: px2rem(56rem);
      background:rgba(2,26,18,1);
      position: relative;
      .input {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: px2rem(335rem);
        height: px2rem(30rem);
      }
    }
    .list {
      display: flow-root;
      background: rgb(59, 82, 73);
      .page {
        text-align: center;
      }
      .item {
        height: px2rem(44rem);
        border-bottom: 1px solid rgba(182,222,255,.2);
        background: rgba(0,61,39,1);
        display: flow-root;
        cursor: pointer;
        &:hover {
          filter: brightness(1.2);
        }
        .text {
          display: flow-root;
          box-sizing: border-box;
          padding: px2rem(11rem) 0 0 px2rem(15rem);
          color: #fff;
          font-size: px2rem(16rem);
          > div {
            float: left;
          }
          .name {
            font-weight: bold;
          }
          .isline {
            margin-left: px2rem(105rem);
            &::before {
              content: '';
              display: inline-block;
              margin-right: px2rem(8rem);
              width: px2rem(1rem);
              height: px2rem(16rem);
              background:rgba(182,222,255,1);
              opacity:0.4;
              vertical-align: middle;
            }
            &::after {
              content: '';
              display: inline-block;
              margin-left: px2rem(8rem);
              width: px2rem(11rem);
              height: px2rem(11rem);
              background:rgba(0,200,83,1);
              border-radius:50%;
            }
          }
          .play {
            float: right;
            width: px2rem(104rem);
            a {
              color:rgba(255,255,255,1);
              text-decoration: underline;
              margin-left: px2rem(13rem);
            }
            &::before {
              content: '';
              display: inline-block;
              width: px2rem(1rem);
              height: px2rem(16rem);
              background:rgba(182,222,255,1);
              opacity:0.4;
              vertical-align: middle;
            }
          }
        }
      }
      .outline {
        .text {
          color: #999;
          .isline {
            &::after {
              content: '';
              display: inline-block;
              margin-left: px2rem(8rem);
              width: px2rem(11rem);
              height: px2rem(11rem);
              background:#999;
              border-radius:50%;
            }
          }
        }
      }
    }
  }
}
</style>

