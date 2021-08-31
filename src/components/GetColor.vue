<template>
  <div ref="parent">
    <h3 class="title">ctrl+F2:颜色提取</h3>
    <el-radio v-model="radio" label="hex">hex</el-radio>
    <el-radio v-model="radio" label="hsl">hsl</el-radio>
    <el-radio v-model="radio" label="hwb">hwb</el-radio>
    <el-radio v-model="radio" label="rgb">rgb</el-radio>
  </div>
</template>

<script>
import {remote,ipcRenderer}  from 'electron';
import colorString from 'color-string';  
const { screen,desktopCapturer,clipboard } = remote;
import { ElRadio } from 'element-plus'

export default {
  components:{
    ElRadio
  },
  data(){
    return {
      radio:'hex'
    }
  },
  created(){
    // console.log(colorString);
    ipcRenderer.on('screenshot',(event,data)=>{
      this.registerKey();
    });
  },
  methods:{
    registerKey(){
      let { width,height } = screen.getPrimaryDisplay().size;
      desktopCapturer.getSources({types:['window','screen']}).then(async sources=>{
        const stream = await navigator.mediaDevices.getUserMedia({
          audio:false,
          video:{
            mandatory:{
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[0].id,
              minWidth: width,
              maxWidth: width,
              minHeight: height,
              maxHeight: height
            }
          }
        })
        this.handleStream(stream);
      })
    },
    getpixelColor(ctx,x,y){
      let imageData = ctx.getImageData(x-2,y-2,1,1);
      //如果xy不减2  鼠标的颜色会影响到结果
      let [r,g,b,a] = imageData.data;
      clipboard.writeText(colorString.to[this.radio]([r,g,b]));
      return {r,g,b,a}
    },
    handleStream(stream){
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let {x,y} = screen.getCursorScreenPoint();
      let { width,height } = screen.getPrimaryDisplay().size;
      canvas.width = width;
      canvas.height = height;
      let video = document.createElement('video');
      video.srcObject = stream;
      video.oncanplay =()=>{
        video.play();
        // ctx.drawImage(video,x,y,1,1);
        ctx.drawImage(video,0,0,width,height);
        video.pause();
        // this.$refs.parent.appendChild(canvas);
        console.log(this.getpixelColor(ctx,x,y));

        // ctx.beginPath();
        // ctx.arc(x,y,10,0,2*Math.PI);
        // ctx.stroke();

      }



    }
  }
}
</script>

<style>
  .title{
    display: inline-block;
  }
</style>
