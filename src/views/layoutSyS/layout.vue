<template>
<div>
  <!-- <div>顶部导航栏</div> -->
  <!-- <div>侧边导航栏</div> -->
  <el-container class="layout-container">
  <el-aside width="200px">
    <my-aside class="el-menu"></my-aside>
  </el-aside>
  <el-container>
    <el-header>
      <div class="headerTitle">
         <i class="el-icon-s-fold"></i>
      <span>江苏传智播客科技教育有限公司</span>
      </div>
      <el-dropdown>
  <div class="avatar-wrap" >
    <img :src="user.photo" class="avatar" alt="">
    <span>{{user.name}}</span>
    <i class="el-icon-arrow-down el-icon--right"></i>
  </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人设置</el-dropdown-item>
    <el-dropdown-item>退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-header>
    <el-main>
       <!-- 子路由出口 -->
  <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import MyAside from '@/views/layoutSyS/components/MyAside.vue'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: { MyAside },
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
        console.log(res)
      })
    }
  }
}
</script>

<style>
.layout-container{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.el-header {
    background-color: #FFFFFF;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    background-color: #002033;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-menu{
    height: 100%;
    }
.el-dropdown{
float: right;
    }
    .headerTitle{
      float: left;
    }
    .avatar-wrap{
      display: flex;
      align-items: center;
    }
    .avatar{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
       }
</style>
