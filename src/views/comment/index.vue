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
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="标题"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="总评论数"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
  </template>
  <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
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
      }]
    }
  }
}
</script>

<style>
.table-list{
    margin-bottom: 30px;
}
</style>
