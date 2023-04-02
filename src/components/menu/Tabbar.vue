<template>
  <van-tabbar v-model="tabbarActive">
    <van-tabbar-item icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item icon="search">标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { Tabbar, TabbarItem } from 'vant'
import {ref} from 'vue'

const tabbarActive = ref()
</script>
