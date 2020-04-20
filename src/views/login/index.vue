<template>
    <div class="login-container">
        <div class="login-head"></div>
      <el-form ref="form" :model="user" class="login-form">
        <el-form-item >
          <el-input v-model="user.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="user.code" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item >
           <el-checkbox v-model="checked"> 我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loginLoading" class="login-btn" type="primary" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import request from '@/utlis/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false,
      loginLoading: false
    }
  },
  methods: {
    onLogin () {
      const userData = this.user
      this.loginLoading = true
      request({
        method: 'post',
        url: 'mp/v1_0/authorizations',
        data: userData
      }).then((res) => {
        console.log(res)
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
        this.loginLoading = false
      }).catch((err) => {
        console.log(err)
        this.$message.error('登录失败,手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style>
.login-container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  background:url('./login_bg.jpg') no-repeat;
}
.login-form{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
 max-width: 280px;
 background-color: #fff;
 padding: 50px;
}
.login-btn{
  width: 100%;
}
.login-head{
  position: relative;
  left: 620px;
  top: 200px;
  width: 259px;
  height: 57px;
  background: url('./logo_index.png') no-repeat ;

}
</style>
