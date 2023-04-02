<template>
  <div class="phone-login">
    <van-cell-group inset>
      <van-field
        v-model.number="phone"
        type="tel"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errMsg"
        maxlength="11"
        @blur="PhoneBlur"
      />
      <van-field
        v-model.trim="psd"
        type="password"
        required
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>

    <button class="login-btn"  @click="phoneLoginFun(phone,psd)">登录</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { phoneLogin } from '@/api/login.ts'
import { showDialog } from 'vant';

let phone = ref()
let psd = ref()
// 错误提示信息
let errMsg = ref()

// 手机号输入框失去焦点,验证格式是否正确
const PhoneBlur = () => {
  if (phone.value.length === 0) return
  let phoneRule = /^(?:(?:\+|00)86)?1\d{10}$/g.test(phone.value)
  if (phoneRule) {
    // 正确
    // 清空错误提示信息
    errMsg.value = ''
    
  } else {
    // 错误
    errMsg.value = '请输入正确的手机号'
  }
}

// 登录请求
const phoneLoginFun = async (phone, psd) => {
  // 输入为空
  if (phone.value == '' || psd.value == '') return

  showDialog({title: '提示',message: '暂不支持手机号码登录,推荐扫码登录。'})
  // 发起请求
  const data = await phoneLogin(phone, psd)
}
</script>

<style lang="less" scoped>
.phone-login {
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
