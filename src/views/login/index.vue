<template>
    <div class="login-container">
        <div class="login-head"></div>
      <el-form ref="login-form" :model="user" :rules="formRules" class="login-form">
        <el-form-item prop="mobile" >
          <el-input :model="user" v-model="user.mobile" placeholder="13911111111"></el-input>
        </el-form-item>
        <el-form-item prop="code" >
          <el-input v-model="user.code" placeholder="246810"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
           <el-checkbox v-model="user.agree"> 我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loginLoading" class="login-btn" type="primary" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { userlogin } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        agree: false
      },
      loginLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      this.loginLoading = true
      userlogin(this.user).then((res) => {
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
        // 登录成功，将其token数据存储在本地
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.loginLoading = false
        this.$router.push('/home')
      }).catch(() => {
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
