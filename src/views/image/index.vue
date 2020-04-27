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
   <div style="padding-bottom: 20px;">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
 <!-- 素材列表 -->
 <el-row :gutter="20">
  <el-col
   :xs="12"
    :sm="6"
    :md="6"
    :lg="4"
    v-for="(img, index) in images"
    :key="index">
    <el-image
      style="height: 100px"
      :src="img.url"
      fit="cover">
    </el-image>
  </el-col>
</el-row>
</el-card>

  </div>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'imageIndex',
  data () {
    return {
      radio1: '全部',
      images: []
    }
  },
  created () {
    this.loadImage()
  },
  methods: {
    loadImage () {
      getImages().then(res => {
        this.images = res.data.data.results
      })
    }
  }
}
</script>

<style>
</style>
