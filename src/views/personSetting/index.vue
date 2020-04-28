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
          <el-form ref="form" :model="form" label-width="90px" class="el-form-item">
            <el-form-item label="编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
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
        >
       <img :src="previewImage" width="50%" alt="">
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'PersonSet',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
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
      previewImage: ''
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
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
    }
  }
}
</script>

<style>

</style>
