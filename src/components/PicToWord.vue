<template>
  <div ref="parent">
    <h3 class="title">ctrl+F5:截图</h3> 
  </div>
</template>

<script>
import {remote,ipcRenderer}  from 'electron';
const { clipboard } = remote;
import { execFile } from 'child_process';
import path from 'path';
import fs from'fs';
export default {
  components:{
  },
  data(){
    return {
      
    }
  },
  mounted(){
    ipcRenderer.on('pictoword',(event,data)=>{
        this.picToWord();
    });
  },
  methods:{ 
      picToWord(){
          let {basepath} = this.$gl;
          let exepath = path.join(basepath,'/tools/qqscreenshot/PrintScr.exe');
          let res = execFile(exepath);
          res.on('exit',async (code)=>{
              if(code==1){
                return;
                let img = clipboard.readImage();
                let buffer = img.toJPEG(100);
                await fs.writeFileSync(path.join(basepath,'/res/picToWord/pic.jpg'),buffer);
                // tesseract.process(path.join(basepath,'/res/picToWord/pic.jpg'),(err,text)=>{
                //     if(err){
                //         console.log(err,'tesseract-err')
                //         return
                //     }
                //     console.log(text,'text')
                // })
              }
          })
      }


    }
  }
</script>
<style>
  .title{
    display: inline-block;
  }
  .inp{
    width: 100px !important;
  }
</style>
