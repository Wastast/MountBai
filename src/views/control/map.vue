<template>
  <div class="maps">
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
.maps {
  width: 100vw;
  height: 100vh;
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
