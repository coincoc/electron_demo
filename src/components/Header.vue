<template>
  <div class="header">
    <img class="logo" src="@/assets/logo.png" alt="" />
    <div class="title">cc</div>
    <div class="right">
      <span
        class="icon iconfont icon-zuixiaohua3"
        title="最小化"
        @click="minimizeWin"
      ></span>
      <span
        class="icon iconfont icon-zuidahua"
        title="最大化"
        @click="maximizeWin"
      ></span>
      <span
        class="icon iconfont icon-guanbi"
        title="关闭"
        @click="closeWin"
      ></span>
    </div>
  </div>
</template>

<script>
import { remote } from "electron";
export default {
  name: "Header",
  methods: {
    minimizeWin() {
      remote.getCurrentWindow().minimize(); // 窗口最小化
    },
    maximizeWin() {
      const win = remote.getCurrentWindow();
      if (win.isMaximized()) {
        // 判断 窗口是否已最大化
        win.restore(); // 恢复原窗口大小
      } else {
        win.maximize(); //最大化窗口
      }
    },
    closeWin() {
      // ipcRenderer.send('close');
      remote.getCurrentWindow().close(); // 关闭窗口，也结束了所有进程
    },
  },
};
</script>

<style scoped>
.title{
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #eeeeee;
    position: absolute;
    left: 50%;
    transform: translate((-50%,0));
}
.right {
  float: right;
  -webkit-app-region: no-drag; /*自定义元素上添加此样式否自无法操作*/
}
.right .icon {
  display: inline-block;
  line-height: 30px;
  height: 30px;
  width: 30px;
  text-align: center;
  cursor: pointer;
  color: #d3dae3;
}
.right .icon:hover {
  color: #ffffff;
  background-color: #b4b6ba;
}
.right .icon-guanbi:hover {
  background-color: #b10202;
}
.header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  background-color: #ffffff;
  border-bottom: 2px solid #f0f0f0;
  -webkit-app-region: drag; /*添加此样式*/
}
.logo {
  position: absolute;
  left: 10px;
  width: 30px;
}
</style>
