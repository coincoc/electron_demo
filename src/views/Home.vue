<template>
  <div ref="parent">
    shotcut
    <GetColor />
    <KillProcess />
    <PicToWord />
  </div>

</template>

<script>
// @ is an alias to /src
import GetColor from '@/components/GetColor.vue';
import KillProcess from '@/components/KillProcess.vue';
import PicToWord from '@/components/PicToWord.vue';
import {remote,ipcRenderer}  from 'electron';
const { screen,globalShortcut,desktopCapturer } = remote;
export default {
  components: {
    GetColor,
    KillProcess,
    PicToWord
  },
  created(){
  
  },
  methods:{
  

  }
  }
</script>
