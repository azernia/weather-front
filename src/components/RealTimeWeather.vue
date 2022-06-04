<template>
  <div>
    <el-form ref="realTimeWeatherForm" :model="realTimeWeatherForm" label-width="30%">
      <el-form-item label="天气现象">
        <el-select v-model="realTimeWeatherForm.skycon">
          <el-option
              v-for="skyConOption in skyConOptions"
              :key="skyConOption.value"
              :label="skyConOption.label" :value="skyConOption.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生活指标">
        <el-select v-model="realTimeWeatherForm.comfort">
          <el-option
              v-for="lifeIndexComfort in lifeIndexComforts"
              :key="lifeIndexComfort.value"
              :label="lifeIndexComfort.label"
              :value="lifeIndexComfort.value"
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
    <el-form ref="minutelyWeatherForm" :model="minutelyWeatherForm" label-width="30%">
      <el-form-item label="预测">
        <el-input v-model="minutelyWeatherForm.forecast_keypoint"></el-input>
      </el-form-item>
    </el-form>
    <v-chart class="chart" :option="option" />
    <div class="btn-class">
      <el-button type="primary" @click="getRealTimeWeather">重新获取</el-button>
    </div>
  </div>
</template>

<script>
import {getWeather} from "@/api/weather";
// echarts
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

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
      lifeIndexComforts: [
        {
          label: '闷热',
          value: 0
        },
        {
          label: '酷热',
          value: 1
        },
        {
          label: '很热',
          value: 2
        },
        {
          label: '热',
          value: 3
        },
        {
          label: '温暖',
          value: 4
        },
        {
          label: '舒适',
          value: 5
        },
        {
          label: '凉爽',
          value: 6
        },
        {
          label: '冷',
          value: 7
        },
        {
          label: '很冷',
          value: 8
        },
        {
          label: '寒冷',
          value: 9
        },
        {
          label: '极冷',
          value: 10
        },
        {
          label: '刺骨的冷',
          value: 11
        },
        {
          label: '湿冷',
          value: 12
        },
        {
          label: '干冷',
          value: 13
        }
      ],
      realTimeWeatherForm: {
        temperature: '',  // 地表 2 米气温
        apparent_temperature: '',  // 体感温度
        skycon: '', // 天气现象
        comfort: ''
      },
      minutelyWeatherForm: {
        forecast_keypoint: ''
      },
      option: {
        title: {
          text: "Traffic Sources",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines"
          ]
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 234, name: "Ad Networks" },
              { value: 135, name: "Video Ads" },
              { value: 1548, name: "Search Engines" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    }
  },
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  mounted() {
    this.getRealTimeWeather()
  },
  methods: {
    async getRealTimeWeather() {
      try {
        let realTimeWeatherResp = await getWeather("realTimeWeather");
        let realTimeWeatherData = realTimeWeatherResp.data.result.realtime;
        Object.assign(this.realTimeWeatherForm, realTimeWeatherData);
        this.realTimeWeatherForm.comfort = realTimeWeatherData.life_index.comfort.index;
        let minutelyWeatherResp = await getWeather("minutelyWeather");
        Object.assign(this.minutelyWeatherForm, minutelyWeatherResp.data.result);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-class {
  display: flex;
  justify-content: center;
}

.el-select {
  width: 82%;
}
.el-input {
  width: 82%;
}
.chart {
  height: 400px;
}
</style>
