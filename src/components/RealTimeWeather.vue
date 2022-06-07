<template>
  <div>
    <div class="btn-class">
      <i class="el-icon-refresh" @click="getRealTimeWeather"></i>
      <!--<el-button type="primary" @click="getRealTimeWeather">重新获取</el-button>-->
    </div>
    <el-form ref="realTimeWeatherForm" :model="realTimeWeatherForm" >
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
    <el-form ref="minutelyWeatherForm" :model="minutelyWeatherForm" >
      <el-form-item label="预测">
        <el-input v-model="minutelyWeatherForm.forecast_keypoint"></el-input>
      </el-form-item>
    </el-form>
    <div class="line-chart-wrapper">
      <v-chart class="chart-wrapper" :option="option" />
    </div>
  </div>
</template>

<script>
import {getWeather} from "@/api/weather";
// echarts
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
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
          text: "一小时内雷达降雨强度",
          left: "center"
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 30,
            filterMode: 'filter'
          }
        ],
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  },
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "white"
  },
  mounted() {
    this.getRealTimeWeather()
  },
  methods: {
    async getRealTimeWeather() {
      try {
        // 实时
        let realTimeWeatherResp = await getWeather("realTimeWeather");
        let realTimeWeatherData = realTimeWeatherResp.data.result.realtime;
        Object.assign(this.realTimeWeatherForm, realTimeWeatherData);
        // 分钟
        this.realTimeWeatherForm.comfort = realTimeWeatherData.life_index.comfort.index;
        let minutelyWeatherResp = await getWeather("minutelyWeather");
        let minutelyWeatherData = minutelyWeatherResp.data.result;
        Object.assign(this.minutelyWeatherForm, minutelyWeatherData);
        // 一天
        // let daily = await getWeather("dailyWeather");
        // console.log(daily);
        // 一小时雷达降雨量图标
        let timeArray = [];
        for (let i = 1; i <= 60; i++) {
          timeArray[i - 1] = i;
        }
        this.option.xAxis.data = timeArray;
        this.option.series[0].data = minutelyWeatherData.minutely.precipitation;
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
  justify-content: right;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
::v-deep .el-form-item .el-form-item__label {
  width: 5.8rem;
}
.el-select {
  width: 15rem;
}
.el-input {
  width: 15rem;
}
.chart-wrapper {
  height: 18rem;
}
</style>
