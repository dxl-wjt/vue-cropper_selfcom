<template>
  <div id="app">
    <div 
      class="upload"
      @click="upload(200, 200, 'bgimg')">
    </div>
    <imgcut v-show="isshow" @cancel='cancel'/>
  </div>
</template>

<script>
import imgcut from './components/imgcut.vue'

import { CHANGE_IMG } from "./store/constData";

export default {
  name: 'App',
  components: {
    imgcut
  },
  data(){
    return {
      isshow:false
    }
  },
  methods:{
    upload(w, h, c) {
      this.$store.commit(CHANGE_IMG, {
        width: w,
        height: h,
        cata: c,
      });
      this.isshow = !this.isshow;
    },
    cancel(){
      this.isshow = false
    }
  }
}
</script>

<style scoped lang='less'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  .upload{
    width: 200px;
    height: 100px;
    margin:0 auto;
    border-radius: 10px;
    position: relative;
    &:hover{
      cursor: pointer;
    }
  }
  .upload::after{
    content: 'upload img';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5) url('./assets/img/camera.svg') center 50px no-repeat;
    border-radius: 10px;
    color:#fff;
    box-sizing: border-box;
    padding: 20px;
  }
}
</style>
