<template>
  <div class="image-container">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
   <!-- 面包屑 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>素材管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
   <div class="img-head">
        <el-radio-group v-model="collect" size="mini" @change="onCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
         <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible=true"
          >上传素材</el-button>
      </div>
      <image-list></image-list>
      </el-card>
  </div>
</template>

<script>
import ImageList from './components/image-list'
export default {
  name: 'imageIndex',
  components: {
    ImageList
  }
}
</script>

<style>

</style>
