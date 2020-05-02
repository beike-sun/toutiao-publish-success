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
<!-- 利用栅格布局 -->
      <el-row>
        <!-- 遍历获取粉丝列表 -->
  <el-col
  :span="3"
  class="grid-content"
  v-for="(fans, index ) in fansList"
  :key="index"
  >
  <el-avatar
    :size="100"
 >
     <img
    :src="fans.photo"
    >
  </el-avatar>
      <div
      class="text"
       >name</div>
  </el-col>
</el-row>
 <!-- 分页 -->
  <!-- <el-pagination
  background
  layout="prev, pager, next"
  :total="totalCount"
  :current-page="page"
  :per_page="pageSize"
  @current-change="onPageChange"
  >
</el-pagination> -->
<!-- 完整分页 -->
 <el-pagination
      @current-change="onPageChange"
      :current-page="page"
      :page-sizes="[11, 21, 31, 41]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="粉丝画像" name="second">
      <div ref="main" style="width: 600px;height:400px;"></div>
          <bar-demo/>
    </el-tab-pane>
    <el-tab-pane label="百度地图结合echarts插件" name="third">
      <map-demo/>
    </el-tab-pane>
    <el-tab-pane label="纯百度地图" name="fourth">
      <bmap-demo></bmap-demo>
    </el-tab-pane>
  </el-tabs>
</el-card>
  </div>
</template>

<script>
import { getFansList } from '@/api/fans.js'
import echarts from 'echarts'
import barDemo from './components/bar-demo.vue'
import mapDemo from './components/map-demo'
import bmapDemo from './components/bmap-demo'
export default {
  name: 'FansIndex',
  components: {
    barDemo,
    mapDemo,
    bmapDemo
  },
  data () {
    return {
      activeName: 'first',
      fansList: [],
      pageSize: 21,
      totalCount: 0,
      page: 1
      // name: 'fans.name'
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
    loadFansList (page = 1) {
      this.page = page
      getFansList({
        page,
        per_page: this.pageSize
      }).then(res => {
        this.fansList = res.data.data.results
        this.totalCount = res.data.data.total_count
        // console.log(res)
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
}
.grid-content{
 width: 120px;
 height: 170px;
 border: 1px dashed gray;
 margin: 0 17px 15px 1px;
 padding: 0 20px;
}
.text{
  text-align: center;
  margin-top: 10px;
}
</style>
