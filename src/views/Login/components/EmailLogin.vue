<template>
  <div class="email-login">
    <van-cell-group inset>
      <van-field
        v-model="email"
        type="e-mail"
        required
        clearable
        label="网易邮箱"
        placeholder="请输入网易邮箱"
        :error-message="errMsg"
        maxlength="30"
        @blur="emailBlur"
      />
      <van-field
        v-model.trim="psd"
        type="password"
        required
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>

    <button class="login-btn"  @click="emailLoginFun(email,psd)">登录</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { emailLogin } from '@/api/login.ts'
import { showDialog } from 'vant';

let email = ref()
let psd = ref()
// 错误提示信息
let errMsg = ref()

// 手机号输入框失去焦点,验证格式是否正确
const emailBlur = () => {
if (email.value.length === 0) return
  // 截取后8位
let str = email.value.substr(email.value.length - 8)
// 如果后8位不是@163.com,加上@163.com
if(str !== '@163.com') {
  email.value = email.value + '@163.com'
}


  let emailRule = /^[\w._]+@(163)\.com(\r\n|\r|\n)?$/g.test(email.value)
  if (emailRule) {
    // 正确
    // 清空错误提示信息
    errMsg.value = ''
    
  } else {
    // 错误
    errMsg.value = '请输入网易邮箱'
  }
}

// 登录请求
const emailLoginFun = async (email, psd) => {
  console.log(email,psd)
  // 输入为空
  if (email.value == '' || psd.value == '') return
  
  showDialog({title: '提示',message: '暂不支持网易邮箱登录,推荐扫码登录。'})
  // 发起请求
  const data = await emailLogin(email, psd)
}
</script>

<style lang="less" scoped>
.email-login {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.login-btn {
  margin-top: 30px;
  width: 250px;
  height: 40px;
  border: 0;
  color: #fff;
  border-radius: 50px;
  background: #f0261c;
  font-size: 16px;
}
</style>
