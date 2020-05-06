<template>
  <div id="discuss-container">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>二次评论</el-breadcrumb-item>

</el-breadcrumb>
  </div>
  <!-- 表格 -->
    <el-table
      :data="discussList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="coment_status"
        label="评论状态">
        <template slot-scope="scope">
            {{ scope.row.comment_status? '正常' : '关闭'}}
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
  @change="onStatusChange(scope.row)"
  >
</el-switch>
        </template>

      </el-table-column>
    </el-table>
    <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page="page"
      :per_page="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
</el-card>

  </div>
</template>

<script>
import {
   getDiscussList,
  updataStatus
} from '@/api/discuss.js'
    export default {
        name: 'DiscussIndex',
      data () {
        return {
          discussList: [],
          value: true,
          page:1,
          pageSize:20,
          totalCount: 0
        }
      },
      created () {
          this.loadDiscussList(1)
      },
      methods: {
       // 修改评论状态
        onStatusChange (discussList) {
          updataStatus(discussList.id.toString(),{
            allow_comment: discussList.comment_status
          }).then(res => {
            this.$message({
              type: 'success',
              message : discussList.comment_status ? '开启成功' : '关闭成功'
            })
          })
          // console.log(discussList)
        },
        handleSizeChange (val) {
        // console.log(`每页 ${val} 条`);
      },
        handleCurrentChange (page) {
            //  console.log(page)
            this.loadDiscussList(page)
      },
        loadDiscussList (page) {
            getDiscussList({
                response_type: 'comment',
                page,
                per_page:this.pageSize
            }).then(res => {
                 console.log(res)
              this.discussList = res.data.data.results
              this.totalCount = res.data.data.total_count
            })
        }
      }
    }
  </script>

<style>

</style>
