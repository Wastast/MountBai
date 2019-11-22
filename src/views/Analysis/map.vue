<template>
  <div class="map">
    <div id="map">
    </div>
  </div>
</template>

<script>
export default {
  name: 'maps',
  mounted () {
    TMapAPI.InitMap('map')
  },
}
</script>

<style scoped lang="scss">
.map {
  position: absolute;
  top: px2rem(107rem);
  left: px2rem(576rem);
  width: px2rem(762rem);
  height: px2rem(640rem);
  border:px2rem(1rem) solid rgba(95,189,159,1);
  border-radius:px2rem(14rem);
  z-index: 11;
  box-sizing: border-box;
  overflow: hidden;
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
