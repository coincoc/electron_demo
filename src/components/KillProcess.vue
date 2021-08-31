<template>
  <div ref="parent">
    <h3 class="title">ctrl+F4:杀死指定进程</h3> ：
      <el-input class="inp" size="small" v-model="key"></el-input>
  </div>
</template>

<script>
import {remote,ipcRenderer}  from 'electron';
const { screen,desktopCapturer } = remote;
import cmd from 'node-cmd';
import fs from 'fs';
import path from 'path';
import { ElInput } from 'element-plus'

export default {
  components:{
    ElInput
  },
  data(){
    return {
      key:'start',
    }
  },
  mounted(){
    ipcRenderer.on('killProcess',(event,data)=>{
      this.killProcess();
    });
  },
  methods:{ 
    killProcess(){
      let {basepath} = this.$gl;
      // console.log(process,basepath,'basepath');
      let key = this.key;
      if(!key)return;
      let reg = new RegExp(key,'ig');
      cmd.run(`cd ${basepath} && tasklist >tasklist.txt`,async (err,data,str)=>{
        let filepath = path.join(basepath,'tasklist.txt');
        let txt = fs.readFileSync(filepath,'utf8');
        let infolist = txt.split(/\n/).filter(e=>/\.exe/ig.test(e)); //过滤非系统程序
        let reslist = infolist.filter(e=>reg.test(e)); //找到进程
        reslist = reslist.map(e=>e.split(/\s/).filter(ee=>!!ee)[1]);//找到pid
        reslist.forEach(e=>{   
          cmd.runSync(`taskkill /F /T /PID ${e}`);  //结束相关进程
          //  /F 强制结束  /T 包括相关子进程 所以这里不用循环
        })

        console.log(reslist,'reslist')
      });
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
