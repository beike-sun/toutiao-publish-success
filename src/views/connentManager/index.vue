<template>
<div class="connent-container">
   <el-card class="box-card">
  <div slot="header" class="clearfix">
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb>
</div>
<!-- 筛选表单 -->
<el-form :model="ruleForm"  ref="ruleForm"
v-loading = "loading"
 label-width="100px" >
    <el-form-item label="状态:" prop="resource">
    <el-radio-group v-model="status">
      <el-radio label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道:" prop="region">
    <el-select v-model="channelId" placeholder="请选择">
       <el-option
      label="全部"
      value="null "
      >
      </el-option>
      <el-option
      :label="channel.name"
      :value="channel.id "
        v-for="(channel,index) in channels" :key="index"
      >
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期:" >
     <el-date-picker
     v-model="dateList"
     format="yyyy-MM-dd"
     value-format="yyyy-MM-dd"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button
     type="primary"
    :disabled = "loading"
     @click="getConnent(1)"
     >筛选</el-button>
  </el-form-item>
</el-form>
</el-card>
<!-- 筛选结果 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>根据筛选条件共查询到 {{totalCount}} 条结果：</span>
  </div>
  <template>
    <el-table
      :data="connentList"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        label="封面"
        width="270">
        <template slot-scope="scope">
          <img
          v-if="scope.row.cover.images[0]"
          :src="scope.row.cover.images[0]"
          alt=""
          class="coverStyle"
          >
          <img v-else
          src="./nocover.gif"
          class="coverStyle"
          alt=""
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="270">
      </el-table-column>
      <el-table-column
        label="状态"
        width="270">
        <template slot-scope="scope">
          <el-tag :type="contentStatus[scope.row.status].type">{{ contentStatus[scope.row.status].text }}</el-tag>
          <!-- <el-tag  type="danger" v-if="scope.row.status === 1">待审核</el-tag>
          <el-tag type="success" v-if="scope.row.status === 2">审核通过</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 3">审核失败</el-tag>
          <el-tag type="info" v-if="scope.row.status === 4">已删除</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
          width="270"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
        <el-button
          size="mini"
          circle
          type="primary"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          size="mini"
          type="danger"
          circle
          icon="el-icon-delete"
          @click="onDeleteContent(scope.row.id)"
          ></el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 总页数total的实际数据从后台响应得到 -->
<div class="block">
  <el-pagination
    background
    layout="prev, pager, next"
    :total="totalCount"
    :page-size="pageSize"
    :disabled = "loading"
    :current-page.sync="page"
    @current-change="onCurrentChange"
    />
</div>
  </template>
</el-card>
</div>
</template>

<script>
import { connent, ConnentChannels, deleteContent } from '@/api/connent.js'
export default {
  name: 'ConnentIndex',
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      totalCount: 0,
      pageSize: 10,
      channels: [],
      // 默认不传状态就是全部
      status: null,
      channelId: null,
      dateList: null,
      loading: true,
      page: 1,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ],
      connentList: [],
      contentStatus: [
        {
          text: '草稿', type: 'info', status: 0
        },
        {
          text: '待审核', type: '', status: 1
        },
        {
          text: '审核通过', type: 'success', status: 2
        },
        {
          text: '审核失败', type: 'warning', status: 3
        },
        {
          text: '已删除', type: 'danger', status: 4
        }
      ]
    }
  },
  created () {
    this.getConnent()
    this.getConnentChannels()
  },
  methods: {
    submitForm () {
    //   console.log(666)
    },
    getConnent (page = 1) {
      this.loading = true
      connent(
        {
          page,
          per_page: this.pageSize,
          status: this.status,
          channel_id: this.channelId,
          begin_pubdate: this.dataList ? this.dateList[0] : null,
          end_pubdate: this.dataList ? this.dateList[1] : null
        }
      ).then(res => {
        const { results, total_count: totalCount } = res.data.data
        // 代码规范中不允许有下划线格式的 ，所以需要:重命名
        // this.connentList = res.data.data.results,
        // this.totalCount=res.data.data.total_count
        this.connentList = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    getConnentChannels () {
      ConnentChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onCurrentChange (page) {
      this.getConnent(page)
      // console.log(page)
    },
    onDeleteContent (deleteContentId) {
      console.log(deleteContentId.toString())
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行这里
        deleteContent(deleteContentId.toString()).then(res => {
          console.log(res)
          // this.getConnent(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.el-main{
    text-align: left;
    line-height: 0;
}
.el-form-item__label{
    margin-right: 5px;
}
.el-pagination{
    text-align: right;
}
.box-card{
  margin-bottom: 10px;
}
.coverStyle{
  width: 100px;
  background-size: cover;
}
</style>
