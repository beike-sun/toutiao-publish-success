<template>
  <div class="image-list">
        <div class="img-head">
        <el-radio-group v-model="collect" size="mini" @change="onCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
         <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible=true"
          v-if="isShowAdd"
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
    class="image-item"
    :key="index"
    @click.native="selected = index"
    >
    <el-image
      style="height: 100px"
      class="el-image"
      :src="img.url"
      fit="cover">
    </el-image>
     <div
      class="selected"
      v-if="isShowSelected && selected===index"
      ></div>
    <div
     class="image-action"
     v-if="isShowAction"
      >
     <el-button
     type="warning"
     size="mini"
     circle
     :icon=" img.is_collected?'el-icon-star-on': 'el-icon-star-off'"
     :loading="img.loading"
     @click="onCollected(img)"
       >
       </el-button>
      <el-button
      type="danger"
      icon="el-icon-delete"
      circle
      size="mini"
      @click="onDeleteImg(img)"
      :loading="img.loading"
      >
      </el-button>
     <!-- <i :class="{
       'el-icon-star-off': !img.is_collected,
       'el-icon-star-on': img.is_collected
       }"
       @click="onCollected(img)"
       ></i> -->
     <!-- <i class="el-icon-delete"></i> -->
    </div>
  </el-col>
</el-row>
<!-- 分页 -->
<el-pagination
  background
  layout="prev, pager, next"
  :total="totalCount"
  :page-size="pageSize"
  :current-page.sync="page"
  @current-change="onPageChange"
  >
</el-pagination>
<el-dialog
 title="上传素材"
 :visible.sync="dialogUploadVisible"
 >
 <!-- 注意：点击上传素材的路径一定要写原生的，因为这里的请求不是通过axios。组件默认content-type是文件形式。自行配置headers -->
 <el-upload
  class="upload-demo"
  drag
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  :headers="uploadHeaders"
  name="image"
  :on-success="onUploadSuccess"
  :show-file-list="false"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-dialog>
  </div>
</template>

<script>
import {
  getImages,
  collectImage,
  deleteImage
} from '@/api/image'
export default {
  name: 'imageList',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      images: [],
      // 默认查询全部素材
      collect: false,
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      pageSize: 10,
      totalCount: 0,
      // 当前页码
      page: 1,
      // 选中的索引
      selected: null
    }
  },
  props:{
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isShowAction:{
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default:false
    }
  },
  created () {
    this.loadImage(1)
  },
  methods: {
    loadImage (page, pageSize) {
      // 重置高亮页码
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        // img对象中没有loading状态，手动添加，为了控制单个独立的收藏按钮状态
        const results = res.data.data.results
        results.forEach(img => {
          img.loading = false
        })
        this.images = results
        this.totalCount = res.data.data.total_count
      })
    },
    onCollectChange () {
      this.loadImage(1)
    },
    onUploadSuccess () {
      // 上传成功,关闭对话框
      this.dialogUploadVisible = false
      // 更新素材表
      this.loadImage(this.page)
    },
    onPageChange (page) {
      this.loadImage(page)
      // 设置对勾选中状态为空
      this.selected = null
    },
    onCollected (img) {
      img.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        img.loading = false
      })
      // if(img.isCollect){
      //   // 收藏,取消
      //   collectImage(img.id, false)
      // } else{
      // // 没收藏，添加收藏
      //  collectImage(img.id, true)
      // }
    },
    onDeleteImg (img) {
      img.loading = true
      deleteImage(img.id).then(res => {
        // 删除成功重新加载素材页面
        this.loadImage(this.page)
        img.loading = false
      })
       this.$message('删除图片成功')
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
.image-item{
  position: relative;
}
.image-action{
  height: 40px;
  background: rgba(204, 204, 204, .6);
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  color: aliceblue;
}
.selected{
  background: url('./selected.png');
 position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    opacity: .5;
}
.el-image{
  position: relative
}
</style>
