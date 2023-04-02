<template>
  <div class="qrcode-box">
    <text>请打开网易云APP扫描二维码</text>
    <div class="qrcode">
      <img :src="sginImgURL" />
      <i class="img-overlay" @click="replayQrcode" v-show="isShowOverlay">
        <div>二维码已过期,请刷新</div>
        <div>
          <van-icon name="replay" size="30"/>
        </div>
      </i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { showSuccessToast, showFailToast } from 'vant'
import {
  qrCodeLoginKey,
  qrCodeLoginImg,
  qrCodeLoginCheck
} from '@/api/login.ts'

let sginImgURL = ref()
let check = null
let isShowOverlay = ref(false)

const getQrcode = async () => {
  // 重新请求二维码时,关闭遮罩层
  isShowOverlay.value = false
  let nowtime = Date.now()
  //调第一个接口拿key
  let key = (await qrCodeLoginKey(nowtime)).data.data.unikey
  console.log(key)
  //调第二个接口拿二维码图片(base64格式)
  sginImgURL.value = (await qrCodeLoginImg(key)).data.data.qrimg
  // console.log(sginImgURL.value);
  // this.$store.state.signShow = true
  // this.$store.state.signURL = sginImgURL
  // 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
  // 每三秒check一次
  check = setInterval(async () => {
    let nowtime2 = new Date().getTime()
    let res = await qrCodeLoginCheck(key, nowtime2).then()
    console.log(res.data.message, '---')
    if (res.data.code == 800) {
      showFailToast(res.data.message)
      // 展示遮罩层
      isShowOverlay.value = true
      // alert(res.data.message)
      clearInterval(check)
    }
    if (res.data.code == 803) {
      console.log('success', res);
      localStorage.setItem('QrcodeCookie',JSON.stringify(res.data.cookie))
      showSuccessToast(res.data.message)
      // alert(res.data.message)
      clearInterval(check)
    }
  }, 3000)
}

// 刷新二维码
const replayQrcode = () => getQrcode()


onMounted(() => getQrcode())

onBeforeUnmount(() => {
  clearInterval(check)
})
</script>

<style lang="less" scoped>
.qrcode-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12rem;
  height: 12rem;
  font-size: 14px;

  .qrcode {
    position: relative;
  }
}
.img-overlay {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  background: rgba(0, 0, 0, .7);
  color: #fff;
}
</style>
