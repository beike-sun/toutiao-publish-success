<template>
  <div class="image-container">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
   <!-- 面包屑 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>素材管理</el-breadcrumb-item>
</el-breadcrumb>
    <el-button style="float: right; padding: 3px 0" type="text">添加素材</el-button>
  </div>
 <!-- 素材列表 -->
 <el-row :gutter="20">
  <el-col  :xs="12" :sm="6" :md="6" :lg="4" >
    <el-image
      style="height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="cover">
    </el-image>
  </el-col>
  <el-col  :xs="12" :sm="6" :md="6" :lg="4" >
    <el-image
      style="height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="cover">
    </el-image>
  </el-col>
  <el-col  :xs="12" :sm="6" :md="6" :lg="4" >
    <el-image
      style="height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="cover">
    </el-image>
  </el-col>
  <el-col  :xs="12" :sm="6" :md="6" :lg="4" >
    <el-image
      style="height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="cover">
    </el-image>
  </el-col>
  <el-col  :xs="12" :sm="6" :md="6" :lg="4" >
    <el-image
      style="height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="cover">
    </el-image>
  </el-col>
  <el-col  :xs="12" :sm="6" :md="6" :lg="4" >
    <el-image
      style="height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="cover">
    </el-image>
  </el-col>
  <el-col  :xs="12" :sm="6" :md="6" :lg="4" >
    <el-image
      style="height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="cover">
    </el-image>
  </el-col>
</el-row>
</el-card>

  </div>
</template>

<script>
export default {
  name: 'imageIndex',
  data () {
    return {
      radio1: '全部'
    }
  }
}
</script>

<style>
</style>
