<template>
  <!-- 登录页面 -->
  <div class="login">
    <!-- logo -->
    <div class="logo">
      <img src="src\public\images\logo.png" />
    </div>
    <!-- 登录方式 -->
    <div class="login-area">
      <!-- 电话登录 -->
      <PhoneLogin v-show="loginActive === 0 ? true : false"/>
      <!-- 邮箱登录 -->
      <EmailLogin v-show="loginActive === 1 ? true : false"/>
      <!-- 二维码登录 -->
      <QrcodeLogin v-if="loginActive === 2 ? true : false"/>
    </div>
    <!-- 选择登录方式 -->
    <div class="login-select">
      <i :class="loginActive === 0 ? 'login-active' : ''" @click="selectLogin(0)">电话登录</i> / 
      <i :class="loginActive === 1 ? 'login-active' : ''" @click="selectLogin(1)">邮箱登录</i> / 
      <i :class="loginActive === 2 ? 'login-active' : ''" @click="selectLogin(2)">二维码登录</i>
    </div>
    <!-- 游客登录 -->
    <div class="guest-user" @click="guestUser">
      立即体验
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {guestUserLogin} from '@/api/login.ts'
import PhoneLogin from './components/PhoneLogin.vue'
import EmailLogin from './components/EmailLogin.vue'
import QrcodeLogin from './components/QrcodeLogin.vue'

let loginActive = ref(2)

const selectLogin = (i) => {
  if (i === loginActive.value) return
  loginActive.value = i
}

// 游客登录
const guestUser = async () => {
  const {data} = await guestUserLogin()
  // 登录成功
  if (data.code === 200) {
    // 跳转首页
    router.push('home')
    localStorage.setItem('guestUserCookie', JSON.stringify(data.cookie))
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15rem;
    width: 100%;
    background: linear-gradient(#fee8e8, #fef9f9 80%, #fff 100%);

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
  }

  .login-select {
    margin-top: 30px;
    cursor: pointer;

    .login-active {
      color: #f0261c;
    }
  }

  .guest-user {
    margin-top: 2rem;
    text-decoration: underline;
    color: #000;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
