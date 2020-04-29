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
    <el-tab-pane label="粉丝评论" name="first">
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
    <el-tab-pane label="粉丝画像" name="second">2</el-tab-pane>
  </el-tabs>
</el-card>
  </div>
</template>

<script>
import { getFansList } from '@/api/fans.js'
export default {
  name: 'FansIndex',
  data () {
    return {
      activeName: 'first',
      fansList: [],
      pageSize: 20,
      totalCount: 0,
      page: 1
    }
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
  text-align: center;
}
</style>
