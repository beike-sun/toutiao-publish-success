<template>
   <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id? '修改文章' : '发表文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref="form" :model="artical" label-width="80px">
        <el-form-item label="标题">
    <el-input v-model="artical.title"></el-input>
  </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input type="textarea" v-model="artical.content"></el-input> -->
          <el-tiptap
          v-model="artical.content"
           :extensions="extensions"
           height="351"
           placeholder="亲，请在这里输入要发布的内容哦"
           ></el-tiptap>
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
import { uploadImage } from '@/api/image.js'
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  TextColor,
  Iframe,
  FormatClear,
  Fullscreen
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
import {
  ConnentChannels,
  addPublishContent,
  getEditContent,
  updataContent
} from '@/api/connent.js'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
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
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
        // 默认会把图片生成.base64，字符串和内容存储在一起。用户体验不好，需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type是multipary/form-data,则请求体必须使用FormData
            // 由于axios本身就是返回的promise对象，所以第一个return是返回promise对象
          // 第二个return表示返回最后的结果
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }
        ),
        new TextColor(),
        new Iframe(),
        new FormatClear(),
        new Fullscreen()
      ]
    }
  },
  created () {
    this.getConnentChannels()
    // 由于发布文章和修改文章使用同一个组件，所以需要进行判断
    if (this.$route.query.id) {
      this.editContent()
    }
  },
  methods: {
    onPublish (draft = false) {
      const connentId = this.$route.query.id
      if (connentId) {
        updataContent(connentId, this.artical, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '发表文章'}成功`,
            type: 'success'
          })
          this.$router.push('/connent')
        })
      } else {
        addPublishContent(this.artical, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '发表文章'}成功`,
            type: 'success'
          })
        })
      }
    },
    getConnentChannels () {
      ConnentChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    editContent () {
      getEditContent(this.$route.query.id).then(res => {
        this.artical = res.data.data
      })
    }
  }
}
</script>

<style>
</style>
