<template>
  <div class="container">
    <div class="tab-class">
      <h1>实时天气</h1>
    </div>
    <div class="weather-content">
        <RealTimeWeather/>
    </div>
  </div>
</template>

<script>
import RealTimeWeather from "@/components/RealTimeWeather";

export default {
  name: "Weather",
  components: {
    RealTimeWeather
  },
  data() {
    return {
      activeName: 'realTimeWeather',
      isRealTimeWeather: true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 55%;
  border: 1px solid black;
  border-radius: 1rem;
  margin: 0 auto;
  .tab-class {
    display: flex;
    justify-content: center;
  }
}
</style>
