<template>
  <div ref="mainTwo" style="width: 800px;height:1000px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    const myChartTwo = echarts.init(this.$refs.mainTwo)
    var item = {
        value: 1300,
        itemStyle: {
          color: '#0067d0',
          opacity: '0.3'
        }
      },
      option = {
        title: {
          text: '全国用户粉丝总量统计',
          textStyle: {
            color: '#d8d9db'
          }
        },
        color: ['#3398DB'],
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        //         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //     }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: [
          {
            type: 'category',
            data: [
              '赵',
              '钱',
              '孙',
              '李',
              '周',
              '吴',
              '郑',
              '王',
              '高',
              '任',
              '武',
              '汤',
              '唐'
            ],
            axisLine: {
              lineStyle: {
                color: 'green'
              }
            },
            axisLabel: {
              color: '#2e60a3'
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'green'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: 'green'
              }
            },

            splitLine: {
              lineStyle: {
                color: 'green'
              }
            },
            axisLabel: {
              color: '#2e60a3'
            }
          },
          {}
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [
              2030,
              1800,
              1700,
              1600,
              1400,
              item,
              item,
              item,
              800,
              700,
              500,
              300,
              250
            ],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00eef6' },
                { offset: 0.5, color: '#00ace3' },
                { offset: 1, color: '#0067d0' }
              ])
            }
          }
        ]
      }
    // 使用刚指定的配置项和数据显示图表。
    myChartTwo.setOption(option)
  }
}
</script>

<style>
</style>
