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
<el-form :model="ruleForm"  ref="ruleForm" label-width="100px" >
    <el-form-item label="状态:" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="全部"></el-radio>
      <el-radio label="草稿"></el-radio>
      <el-radio label="待审核"></el-radio>
      <el-radio label="审核通过"></el-radio>
      <el-radio label="审核失败"></el-radio>
      <el-radio label="已删除"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道:" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期:" >
     <el-date-picker
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm()">筛选</el-button>
  </el-form-item>
</el-form>
</el-card>
<!-- 筛选结果 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>根据筛选条件共查询到 46147 条结果：</span>
  </div>
  <template>
    <el-table
      :data="connentList"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="封面"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
<div class="block">
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
  </template>
</el-card>
</div>
</template>

<script>
import { connent } from '@/api/connent.js'
export default {
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
      connentList: []
    }
  },
  methods: {
    submitForm () {
    //   console.log(666)
    },
    getConnent () {
      connent().then(res => {
        this.connentList = res.data.data.results
      })
    }
  },
  created () {
    this.getConnent()
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
</style>
