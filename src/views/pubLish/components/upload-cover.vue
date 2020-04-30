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
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body=true
        >
        <span>这是一段信息</span>
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
    height: 160px;
    border: 1px green dashed;
}
.cover-image{
    width: 100%;
    height: 100%;
}
</style>
