<template>
	<div class="toast" v-show="isShow">
    <div>{{msg}}</div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        msg:'',
        isShow:false
      }
    },
    methods:{
      show(msg = '',duration = 1500){
        this.msg = msg
        this.isShow = true

        setTimeout(() => {
          this.isShow = false
          this.msg = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 200px;
    left: 50%;
    padding:8px 10px;
    border-radius: 10px;
    transform: translate(-50%,-50%);
    color:#fff;
    background: rgba(0,0,0,.7);
  }
</style>
