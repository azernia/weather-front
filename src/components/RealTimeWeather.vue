<template>
  <div>
    <el-form ref="realTimeWeatherForm" :model="realTimeWeatherForm" label-width="80px">
      <el-form-item label="天气现象">
        <el-select v-model="realTimeWeatherForm.skycon" placeholder="请选择活动区域">
          <el-option
              v-for="skyConOption in skyConOptions"
              :key="skyConOption.value"
              :label="skyConOption.label" :value="skyConOption.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="体感温度">
        <el-input v-model="realTimeWeatherForm.apparent_temperature"></el-input>
      </el-form-item>
      <el-form-item label="地表2米气温">
        <el-input v-model="realTimeWeatherForm.temperature"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="minutelyWeatherForm" :model="minutelyWeatherForm" label-width="80px">
      <el-form-item label="预测">
        <el-input v-model="minutelyWeatherForm.forecast_keypoint"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-class">
      <el-button type="primary" @click="getRealTimeWeather">重新获取</el-button>
    </div>
  </div>
</template>

<script>
import {getWeather} from "@/api/weather";

export default {
  name: "RealTimeWeather",
  data() {
    return {
      skyConOptions: [
        {
          label: '晴（白天）',
          value: 'CLEAR_DAY'
        },
        {
          label: '晴（夜间）',
          value: 'CLEAR_NIGHT'
        },
        {
          label: '多云（白天）',
          value: 'PARTLY_CLOUDY_DAY'
        },
        {
          label: '多云（夜间）',
          value: 'PARTLY_CLOUDY_NIGHT'
        },
        {
          label: '阴',
          value: 'CLOUDY'
        },
        {
          label: '轻度雾霾',
          value: 'LIGHT_HAZE'
        },
        {
          label: '中度雾霾',
          value: 'MODERATE_HAZE'
        },
        {
          label: '重度雾霾',
          value: 'HEAVY_HAZE'
        },
        {
          label: '小雨',
          value: 'LIGHT_RAIN'
        },
        {
          label: '中雨',
          value: 'MODERATE_RAIN'
        },
        {
          label: '大雨',
          value: 'HEAVY_RAIN'
        },
        {
          label: '暴雨',
          value: 'STORM_RAIN'
        },
        {
          label: '雾',
          value: 'FOG'
        },
        {
          label: '小雪',
          value: 'LIGHT_SNOW'
        },
        {
          label: '中雪',
          value: 'MODERATE_SNOW'
        },
        {
          label: '大雪',
          value: 'HEAVY_SNOW'
        },
        {
          label: '暴雪',
          value: 'STORM_SNOW'
        },
        {
          label: '浮尘',
          value: 'DUST'
        },
        {
          label: '沙尘',
          value: 'SAND'
        },
        {
          label: '大风',
          value: 'WIND'
        }
      ],
      realTimeWeatherForm: {
        temperature: '',  // 地表 2 米气温
        apparent_temperature: '',  // 体感温度
        skycon: '', // 天气现象
      },
      minutelyWeatherForm: {
        forecast_keypoint: ''
      }
    }
  },
  mounted() {
    this.getRealTimeWeather()
  },
  methods: {
    async getRealTimeWeather() {
      try {
        let realTimeWeatherResp = await getWeather("realTimeWeather");
        Object.assign(this.realTimeWeatherForm, realTimeWeatherResp.data.result.realtime);
        let minutelyWeatherResp = await getWeather("minutelyWeather");
        Object.assign(this.minutelyWeatherForm, minutelyWeatherResp.data.result);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style scoped>
.btn-class {
  display: flex;
  justify-content: center;
}
</style>
