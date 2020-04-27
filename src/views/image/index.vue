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
<el-dialog
 title="上传素材"
 :visible.sync="dialogUploadVisible"
 :append-to-body="true"
 >
  bee
</el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'imageIndex',
  data () {
    return {
      images: [],
      // 默认查询全部素材
      collect: false,
      dialogUploadVisible: false
    }
  },
  created () {
    this.loadImage(false)
  },
  methods: {
    loadImage (collect = false) {
      getImages({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImage(value)
    }
  }
}
</script>

<style>
.img-head{
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between
}
</style>
