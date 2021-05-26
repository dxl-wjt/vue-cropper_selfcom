<template>
  <div class="imginfo" :style='{width:`${wrapperW}px`,height:`${wrapperH}px`}'>
    <!-- 裁剪框 -->
    <div class="cropper" :style='{width:`${cropperW}px`,height:`${cropperH}px`}'>
      <VueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :info="option.info"
        :canScale="option.canScale"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :full="option.full"
        :fixedBox="option.fixedBox"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :centerBox="option.centerBox"
        :height="option.height"
        :infoTrue="option.infoTrue"
        :maxImgSize="option.maxImgSize"
        :enlarge="option.enlarge"
        :mode="option.mode"
      />
    </div>
    <!-- 操作栏 -->
    <div class="footer">
      <label for="img" class="btn">选择图片</label>
      <input
        ref='img'
        type="file"
        id="img"
        style="display: none"
        @change="selectImg($event)"
      />
      <div class="btn" @click='upload("blob")'>上传图片</div>
      <div class="btn" @click='cancel'>取消</div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import {uploadimg} from '../network/request'

export default {
  components: {
    VueCropper,
  },
  created(){
    this.option.autoCropWidth = this.$store.state.img.width
    this.option.autoCropHeight = this.$store.state.img.height
    this.cata = this.$store.state.img.cata
  },
  data() {
    return {
      option: {
        img: "", //裁剪图片的地址
        outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
        outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
        info: true, //图片大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: '', //默认生成截图框宽度
        autoCropHeight: '', //默认生成截图框高度
        fixed: false, //是否开启截图框宽高固定比例
        fixedNumber: [1.53, 1], //截图框的宽高比例
        full: false, //false按原比例裁切图片，不失真
        fixedBox: true, //固定截图框大小，不允许改变
        canMove: true, //上传图片是否可以移动
        canMoveBox: true, //截图框能否拖动
        original: false, //上传图片按照原始比例渲染
        centerBox: true, //截图框是否被限制在图片里面
        height: true, //是否按照设备的dpr 输出等比例图片
        infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 2000, //限制图片最大宽度和高度
        enlarge: 1, //图片根据截图框输出比例倍数
        mode: 'cover', //图片默认渲染方式
      },
      cata:''
    }
  },
  methods: {
    selectImg(e) {
      let file = e.target.files[0];
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$toast.show('图片格式必须为jpg、jpeg、png')
        return false;
      }
      //转化为blob
      let reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data;
      };
      //转化为base64
      reader.readAsDataURL(file);
    },
    upload (type) {
      if (type === 'blob') {
        //获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          let formData = new FormData()
          formData.append('file',data,this.$refs.img.files[0].name)
          formData.append('cata',this.cata)
          //调用axios上传
          let res = await uploadimg(formData)
          if(res.isupload){
            this.$toast.show('上传成功!',2000)
            this.cancel()
            this.$store.dispatch('getuser')
          }else {
            this.$toast.show('上传失败!',2000)
          }
        })
      }
    },
    cancel(){
      // 解决不同img保留问题：刷新input以及裁剪框
      this.$refs.img.value = ''
      this.option.img = ''
      this.$emit('cancel')
    }
  },
  computed:{
    cropperW(){
      return this.option.autoCropWidth * 1.2
    },
    cropperH(){
      return this.option.autoCropHeight * 1.2
    },
    wrapperW(){
      let w = this.option.autoCropWidth * 1.2
      return (w > 500 ? w +50 : 500)
    },
    wrapperH(){
      let h = this.option.autoCropHeight * 1.2
      return h + 200
    }
  },
  watch:{
    "$store.state.img":{
      handler(newVal,oldVal){
        this.option.autoCropWidth = newVal.width
        this.option.autoCropHeight = newVal.height
        this.cata = newVal.cata
      },
			immediate:true,
			deep:true
    }
  }
};
</script>

<style scoped lang='less'>
.imginfo {
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .footer {
    width: 500px;
    height: 100px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    .btn {
      height: 30px;
      min-width: 70px;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      border-radius: 5px;
      background: #eee;
      color: #333;
      font-weight: 500;
      padding: 5px;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
</style>