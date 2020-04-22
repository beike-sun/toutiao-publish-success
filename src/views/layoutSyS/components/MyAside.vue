<template>
   <el-menu
      default-active="/artical"
      background-color="#002033"
      text-color="#fff"
      class="navMenu"
      router
      active-text-color="#EFD04B">
      <div class="logo"></div>
      <el-menu-item index="/home">
        <!-- <template slot="title">
        </template> -->
        <i class="iconfont iconhome special"></i>
          <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/connent">
        <i class="iconfont icondocument"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont iconimage"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont iconComment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont iconpresent"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="setting">
        <i class="iconfont iconsetting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'MyAsideIndex'
}
</script>

<style>
.logo{
    height: 60px;
    width: 100%;
    line-height: 60px;
    background: url('./logo_admin.png') no-repeat 50%/140px auto;
}
.navMenu .iconfont{
  margin-right: 10px;
}
.el-menu-item{
    text-align: left;
}
</style>
