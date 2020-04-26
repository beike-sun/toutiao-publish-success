<template>
   <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref="form" :model="artical" label-width="80px">
        <el-form-item label="标题">
    <el-input v-model="artical.title"></el-input>
  </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="artical.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="artical.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="artical.channel_id" placeholder="请选择">
            <el-option
             :label = "channel.name"
             :value="channel.id"
              v-for = "(channel, index) in channels"
               :key = "index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ConnentChannels, addPublishContent } from '@/api/connent.js'
export default {
  name: 'PublishIndex',
  data () {
    return {
      artical: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      channels: []
    }
  },
  created () {
    this.getConnentChannels()
  },
  methods: {
    onPublish (draft = false) {
      addPublishContent(this.artical, draft).then(res => {
        console.log(res)
      })
    },
    getConnentChannels () {
      ConnentChannels().then(res => {
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style>
</style>
