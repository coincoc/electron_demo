// const WorkerPlugin = require('worker-plugin')

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions:{
        "productName":"cc",//项目名 这也是生成的exe文件的前缀名
        "appId": "cc",//包名  
        "copyright":"cc",//版权  信息
        "compression": "store", // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
        "directories": {
            "output": "build" // 输出文件夹
        }, 
        "asar": true, // asar打包(如果需要操作本地文件时设置次选项为false)
        "extraResources":  { // 拷贝dll等静态文件到指定位置
            "from": "./extraResources",
            "to": "extraResources"
        },
        "win": {  
            "icon": "./public/icons/icon.ico",//图标路径,
            // "extraResources":  { // 拷贝dll等静态文件到指定位置(用于某个系统配置)
            //     "from": "./extraResources/",
            //     "to": "extraResources"
            // }
        },
        "nsis": {
            "oneClick": true, // 一键安装  allowToChangeInstallationDirectory = false
            "guid": "xxxx", //注册表名字，不推荐修改
            "perMachine": true, // 是否开启安装时权限限制（此电脑或当前用户）
            "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
            "allowToChangeInstallationDirectory": false, // 允许修改安装目录
            "installerIcon": "./public/icons/icon.ico", // 安装图标
            "uninstallerIcon": "./public/icons/icon.ico", //卸载图标
            "installerHeaderIcon": "./public/icons/icon.ico", // 安装时头部图标
            "createDesktopShortcut": true, // 创建桌面图标
            "createStartMenuShortcut": true, // 创建开始菜单图标
            "shortcutName": "cc" // 图标名称
        }

      }
     
    }
  },
  // configureWebpack: {
  //   plugins: [new WorkerPlugin()]
  // }
}