<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-row>
        <el-col :span="15">
          <el-form
           ref="form"
            :model="user"
            :rules="rules"
            label-width="90px"
            class="el-form-item">
            <el-form-item label="编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item
             label="媒体名称:"
             prop="name"
             >
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item
             label="媒体介绍:"
             prop="intro"
             >
    <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item
             label="邮箱:"
             prop="email"
             >
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
              type="primary"
              class="save-but"
              @click = "updataUser"
              >保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="user.photo"
          ></el-avatar>
          <p @click="$refs.file.click()">点击修改头像</p>
          <input
           type="file"
           ref="file"
           hidden
           @change="onFileChange"
           >
        </el-col>
      </el-row>
    </el-card>
    <!-- 弹出层 -->
    <el-dialog
        title="修改头像"
        :visible.sync="dialogVisible"
        :append-to-body=true
        @opened="onDialogOpened"
        @closed="onDialogClosed"
        >
        <div class="preview-image-wrap">
       <img
         :src="previewImage"
         alt=""
         class="preview-image"
         ref="preview-image"
         >
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
             type="primary"
              @click="onUpdataPhoto"
              :loading="onUpdataLoad"
              >确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>
<script>
import {
  getUserProfile,
  updataUserPhoto,
  updataUserProfile
} from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utlis/global-bus'
export default {
  name: 'PersonSet',
  data () {
    return {
      user: {
        id: null,
        name: '',
        intro: '',
        mobile: '',
        email: '',
        photo: ''
      },
      dialogVisible: false,
      // 预览图片
      previewImage: '',
      cropper: null,
      onUpdataLoad: false,
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        intro: [
          { required: true, message: '请输入媒体名称', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /(\w+)@(\w+)\.(\w+)(\.\w+)?/, message: '请输入正确的邮箱', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
    // 处理图片预览
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      // 当文件改变的时候触发弹层框
      this.dialogVisible = true
      // 解决相同的文件不触发change事件
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      // 获取图片dom节点
      const image = this.$refs['preview-image']
      // 初始化裁切器.初始化后，如果预览图片发生变化，裁切器默认不会更新，需要销毁，重新初始化
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false
      })
    },
    // 销毁裁切器
    onDialogClosed () {
      this.cropper.destroy()
    },
    // 点击弹层框的确定触发的事件处理
    onUpdataPhoto () {
      this.onUpdataLoad = true
      // 获取裁切的图片，提交给接口，关闭弹出框，更新视图显示
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updataUserPhoto(fd).then(res => {
          // console.log(res)后台返回的数据
          this.dialogVisible = false
          // 使用后台返回的图片数据有点慢
          // this.user.photo = res.data.data.photo
          // 采用本地裁切好的
          this.user.photo = window.URL.createObjectURL(file)
          this.onUpdataLoad = false
          globalBus.$emit('updata-user', this.user)
        })
      })
    },
    updataUser () {
      updataUserProfile({
        name: this.user.name,
        intro: this.user.intro,
        email: this.user.email
      }).then(res => {
        globalBus.$emit('updata-user', this.user)
        // console.log(res)
        this.$message('保存个人信息成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.preview-image-wrap{
  .preview-image{
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
.save-but{
  margin-top: 20px;
}
</style>
