<!--  -->
<template>
  <div>
    <h1>欢迎来到XXX后台管理系统</h1>
    <h3>{{ title }} --- {{ content }}</h3>
    <button id="btn" @click="clickOn()" type="primary">主要按钮</button>
    <div
      class="total-class"
      id="myChart"
      style="width: 600px; height: 400px; margin-top: 20px"
    ></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Index",
  data() {
    return {};
  },

  mounted() {
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    console.log("myChart", myChart);
    // 绘制图表;
    // 指定图表的配置项和数据;
    var option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },

  created() {
    // 基于准备好的dom，初始化echarts实例
    // let myChart = this.$echarts.init(document.getElementById("myChart"));
    // console.log("myChart", myChart);
    // 绘制图表
    // 指定图表的配置项和数据
    // var option = {
    //   title: {
    //     text: "ECharts 入门示例",
    //   },
    //   tooltip: {},
    //   legend: {
    //     data: ["销量"],
    //   },
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: [5, 20, 36, 10, 10, 20],
    //     },
    //   ],
    // };
    // // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);
  },

  methods: {
    clickOn() {
      alert("点击了按钮");
    },

    drawLine() {},
  },
  computed: {
    ...mapState("userModule", ["title", "content"]),
  },
};
</script>

<style  scoped>
.background {
  width: 90%;
  height: 1000px;
  background: turquoise;
}
</style>
