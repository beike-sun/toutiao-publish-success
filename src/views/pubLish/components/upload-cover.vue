<template>
  <div class="upload-cover">
      <div
       class="cover-wrap"
       @click="onShowDialog"
       >
         <img
          class="cover-image"
          ref="cover-image"
          :src="coverImage"
          >
      </div>
      <!-- 弹层框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        append-to-body=true
        >
  <el-tabs  type="card" v-model="activeName">
    <el-tab-pane label="素材库" name="first">111</el-tab-pane>
    <el-tab-pane label="上传图片" name="second">
       <input
   type="file"
   ref="file"
   hidden
   @change="onFileChange"
   >
  <div
   class="upload-image"
   @click="$refs.file.click()"
   >
    <!-- 发布后，img显示空的，需要接收父组件传的数据 -->
    <img
     width="100%"
     height="100%"
     ref="preview-image"
    >
  </div>
    </el-tab-pane>
  </el-tabs>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button
     type="primary"
      @click.native="onCoverConfirm()"
      >确 定</el-button>
  </span>
        </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
export default {
  name: 'UploadCoverIndex',
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  props: ['cover-image'],
  methods: {
    onShowDialog () {
      this.dialogVisible = true
    },
    onFileChange () {
      // console.log(111)
      // 可以选择图片后，获取选取图片的文件对象.进行预览.
     const file = this.$refs.file.files[0]
     const blob = window.URL.createObjectURL(file)
     this.$refs['preview-image'].src = blob
    },
    onCoverConfirm () {
      const file = this.$refs.file.files[0]
      if (this.activeName === 'second') {
        if (!this.$refs.file.files[0]) {
          this.$message('请选择文件上传')
          return
        }
      }
      const fd = new FormData()
      fd.append('image', file)
       uploadImage(fd).then(res => {
         this.dialogVisible = false
          // console.log(res)
          this.$refs['cover-image'].src = res.data.data.url
          // 将图片的url地址传给父组件publishIndex的cover下的images
          // 父子组件之间的通信
          this.$emit('update-cover', res.data.data.url)
       })
    }
  }
}
</script>

<style>
.cover-wrap{
    width: 180px;
    height:180px;
    border: 1px green dashed;
    background: url('pic_bg.png');
}
.cover-image{
    width: 100%;
    height: 100%;
}
.upload-image{
  width: 200px;
  height: 200px;
  border: 1px dashed gray;
  margin-left: 200px;
}
</style>
