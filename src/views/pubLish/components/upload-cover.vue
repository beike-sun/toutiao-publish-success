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
    <el-tab-pane label="素材库" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="上传图片" name="second">配置管理</el-tab-pane>
  </el-tabs>
  <div class="upload-image"></div>
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
