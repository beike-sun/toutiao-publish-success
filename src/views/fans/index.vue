<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
</el-breadcrumb>
    </div>
    <!-- 卡片化 -->
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="粉丝列表" name="first">
      <el-row class="el-main">
  <el-col
   :span="4"
    v-for="(fans, index) in fansList"
   :key="index"
   >
   <el-image
    style="height:100px"
    fit=contain
    :src="fans.photo"
   >
   </el-image>
    <div
     style="height: 20px"
     :name="fans.name"
     >
     name = fans.name
    </div>
   </el-col>
</el-row>
 <!-- 分页 -->
  <el-pagination
  background
  layout="prev, pager, next"
  :total="totalCount"
  :current-page="page"
  per_page: this.pageSize
  @current-change="onPageChange"
  >
</el-pagination>
    </el-tab-pane>
    <el-tab-pane label="粉丝画像" name="second">
      <div ref="main" style="width: 600px;height:400px;"></div>
          <bar-demo/>
    </el-tab-pane>
  </el-tabs>
</el-card>
  </div>
</template>

<script>
import { getFansList } from '@/api/fans.js'
import echarts from 'echarts'
import barDemo from './components/bar-demo.vue'
export default {
  name: 'FansIndex',
  components: {
    barDemo
  },
  data () {
    return {
      activeName: 'first',
      fansList: [],
      pageSize: 20,
      totalCount: 0,
      page: 1
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.main)
    // console.log(myChart)
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  created () {
    this.loadFansList(1)
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    loadFansList (page = 1, pageSize) {
      this.page = page
      getFansList({
        page,
        per_page: this.pageSize
      }).then(res => {
        this.fansList = res.data.data.results
        this.totalCount = res.data.data.total_count
        console.log(res)
      })
    },
    onPageChange (page) {
      this.loadFansList(page)
    }
  }
}
</script>

<style>
.el-main{
  line-height: 100%;
  /* text-align: center; */
}
</style>
