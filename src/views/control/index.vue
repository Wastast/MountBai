<template>
  <div class="index">
    <control-header :type="type" @switchType="changeType"></control-header>
    <control-senic v-if="type=='scenic'"></control-senic>
    <control-alarm v-if="type=='sos'"></control-alarm>
    <control-video v-if="type=='video'"></control-video>
    <control-radio v-if="type=='broadcast'"></control-radio>
    <control-wifi v-if="type=='wifi'"></control-wifi>
    <control-map></control-map>
  </div>
</template>

<script>
import ControlHeader from './Header';
import ControlSenic from './senic';
import ControlAlarm from './alarm';
import ControlVideo from './video';
import ControlRadio from './radio';
import ControlWifi from './wifi';
import ControlMap from './map';
export default {
  name: 'index',
  data () {
    return {
      type: null
    }
  },
  methods: {
    // 改变type值
    changeType (type) {
      this.type = type
    }
  },
  components:{
    ControlHeader,
    ControlSenic,
    ControlAlarm,
    ControlVideo,
    ControlWifi, 
    ControlRadio,
    ControlMap
  },
  mounted () {
    setTimeout(() => {
      this.type = 'scenic'
    }, 500);
  },
}
</script>

<style scoped lang="scss">
.index {
  width: 100vw;
  height: 100vh;
}
</style>
