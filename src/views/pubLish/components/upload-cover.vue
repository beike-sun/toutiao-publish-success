<template>
  <div class="upload-cover">
      <div
       class="cover-wrap"
       @click="onShowDialog"
       >
         <img
          src="http://toutiao.meiduo.site/FkGRXd3ypLrvv7KJzFIgWKzFi70I"
          class="cover-image"
          >
      </div>
      <!-- 弹层框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        append-to-body=true
        >
  <el-tabs  type="card" >
    <el-tab-pane label="素材库" name="first"></el-tab-pane>
    <el-tab-pane label="上传图片" name="second"></el-tab-pane>
  </el-tabs>
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
    <img
     width="100%"
     height="100%"
     ref="preview-image"
    >
  </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadCoverIndex',
  data () {
    return {
      dialogVisible: false
    }
  },
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
