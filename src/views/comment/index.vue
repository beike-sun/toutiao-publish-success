<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>评论管理</el-breadcrumb-item>
</el-breadcrumb>
    </div>
  <!-- 表格 -->
   <template>
    <el-table
      class="table-list"
      :data="articals"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        >
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="评论状态">
        <template slot-scope="scope">
            {{scope.row.comment_status ? '正常' : '关闭'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
           <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="scope.row.statusDisabled"
            @change="onStatusChange(scope.row)"
            >
            </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <!-- 分页 -->
    <!--current-page 控制激活时高亮的页码 -->
    <!--page-sizes可选的用来控制每页的条数 -->
    <!--page-size 真正的控制每页条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync= page
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  connent,
  updataCommentStatus
} from '@/api/connent'
export default {
  name: 'CommentIndex',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articals: [],
      totalCount: 0,
      pageSize: 10,
      page: 1
    }
  },
  created () {
    this.loadArticals()
  },
  methods: {
    handleSizeChange () {
      this.loadArticals(1)
    },
    handleCurrentChange (page) {
      this.loadArticals(page)
    },
    loadArticals (page = 1) {
      this.page = page
      connent({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res)
        const results = res.data.data.results
        results.forEach(articals => {
          articals.statusDisabled = false
        })
        this.articals = results
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (articals) {
      articals.statusDisabled = true
      updataCommentStatus(articals.id.toString(), articals.comment_status).then(res => {
        articals.statusDisabled = false
        this.$message({
          type: 'success',
          message: articals.comment_status ? '开启成功' : '关闭成功'
        })
      })
    }
  }
}
</script>

<style>
.table-list{
    margin-bottom: 30px;
}
</style>
