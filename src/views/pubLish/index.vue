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
      <el-form  :model="artical"
      :rules="formRules"
       label-width="80px"
       ref="publish-form"
       >
        <el-form-item label="标题" prop="title">
    <el-input v-model="artical.title"></el-input>
  </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="artical.content"></el-input> -->
          <el-tiptap
          v-model="artical.content"
           :extensions="extensions"
           height="300"
           placeholder="亲，请在这里输入要发布的内容哦"
           ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="artical.cover.type" clearable>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- <template v-if="artical.cover.type>0">
            <upload-cover
                v-for="(cover, index) in artical.cover.type"
                :key="cover"
                :cover-image = "artical.cover.image[index]"
                @update-cover="onUpdateCover(index, $event)"
            >
            </upload-cover>
          </template> -->
           <template>
            <upload-cover
              v-for="(cover,index) in artical.cover.type"
               :key="cover"
               v-model="artical.cover.images[index]"
              @update-cover="onUpdateCover(index, $event)"
            />
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
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
  addPublishConnent,
  getEditConnent,
  updataConnent
} from '@/api/connent.js'
import UploadCover from './components/upload-cover.vue'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
     UploadCover
  },
  data () {
    return {
      artical: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: ''
      },
      channels: [],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          // 自定义内容验证规则
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证成功
                callback()
              }
            }
          },
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道' }
        ]
      },
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
      this.$refs['publish-form'].validate((valid) => {
        // 如果验证失败
        if (!valid) {
          return
        }
        // 如果验证成功，提交表单
        const connentId = this.$route.query.id
        if (connentId) {
          updataConnent(connentId, this.artical, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿' : '发表文章'}成功`,
              type: 'success'
            })
          })
        } else {
          addPublishConnent(this.artical, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿' : '发表文章'}成功`,
              type: 'success'
            })
          })
        }
        this.$router.push('/connent')
      })
    },
    getConnentChannels () {
      ConnentChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    editContent () {
      getEditConnent(this.$route.query.id).then(res => {
        console.log(res)
        this.artical = res.data.data
      })
    },
    onUpdateCover (index,url) {
      // console.log(url)
      this.artical.cover.images[index] = url
    }
  }
}
</script>

<style>
</style>
