<template>
  <div class="index">
    <div class="background">
    </div>
    <analysis-header></analysis-header>
    <analysis-scenic></analysis-scenic>
    <analysis-crowd></analysis-crowd>
    <analysis-flow></analysis-flow>
    <analysis-bayonet></analysis-bayonet>
    <analysis-map></analysis-map>
    <analysis-resouse></analysis-resouse>
    <analysis-park></analysis-park>
    <analysis-travelling></analysis-travelling>
  </div>
</template>

<script>
import AnalysisHeader from './Header';
import AnalysisScenic from './Scenic';
import AnalysisCrowd from './Crowd';
import AnalysisFlow from './flow';
import AnalysisBayonet from './Bayonet';
import AnalysisMap from './map';
import AnalysisResouse from './resouse';
import AnalysisPark from './park';
import AnalysisTravelling from './travelling';
export default {
  name: 'index',
  components:{ 
    AnalysisHeader,
    AnalysisScenic,
    AnalysisCrowd,
    AnalysisFlow,
    AnalysisBayonet,
    AnalysisMap,
    AnalysisResouse,
    AnalysisPark,
    AnalysisTravelling
  }
}
</script>

<style scoped lang="scss">
.index {
  // width: 38.4rem;
  // height: 21.6rem;
  width: 100vw;
  height: 100vh;
  background:rgba(0,0,0,1);
  position: relative;
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 13.1rem;
    background:url('~@/assets/img/img.png');
    background-size: 100% 100%;
  }
}
</style>
