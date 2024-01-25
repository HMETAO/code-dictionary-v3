<template>
  <div class="term-box">
    <div ref="xterm" id='xterm' class='xterm'/>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import 'xterm/css/xterm.css'
import {Terminal} from 'xterm'
import {FitAddon} from 'xterm-addon-fit'
import {AttachAddon} from 'xterm-addon-attach'
import {SSH} from "@/api/other";
import {errorMessage, infoMessage} from "@/utils/baseMessage";
import {useBaseStore} from "@/store";
import {useRouter} from "vue-router";

const baseStore = useBaseStore();
const socketURI = {
  type: SSH + "?token=" + baseStore.token
}
let socket: WebSocket;
const xterm = ref<HTMLDivElement>()

let globalTerm: Terminal;
onMounted(() => {
  initSocket()
})

const initTerm = () => {
  const fitAddon = new FitAddon()

  const term = new Terminal({
    rows: 40, //行数
    cols: 100, // 不指定行数，自动回车后光标从下一行开始
    convertEol: true, //启用时，光标将设置为下一行的开头
    scrollback: 50, //终端中的回滚量
    disableStdin: false, //是否应禁用输入
    windowsMode: true, // 根据窗口换行
    cursorStyle: 'underline', //光标样式
    cursorBlink: true, //光标闪烁
    theme: {
      foreground: '#ECECEC', //字体
      background: '#000000', //背景色
      cursor: 'help', //设置光标
    }
  })
  const attachAddon = new AttachAddon(socket)
  term.loadAddon(attachAddon)
  term.loadAddon(fitAddon)
  setTimeout(() => {
    globalTerm.open(xterm.value as HTMLDivElement)
    fitAddon.fit()
    globalTerm.focus()
  }, 300) // 而且不能是0 ,xterm 生成时间在2ms左右

  globalTerm = term
  window.onresize = function () { // 窗口尺寸变化时，终端尺寸自适应
    fitAddon.fit()
  }

}

const socketOnOpen = () => {
  socket.onopen = () => {
    // 链接成功后
    initTerm()
  }
}
const socketOnClose = () => {
  socket.onclose = (closeMessage) => {
    infoMessage('socket 关闭 ' + closeMessage.reason)
    backOther()
  }
}
const router = useRouter()
const backOther = () => {
  router.push({name: 'other'})
}
const socketOnError = () => {
  socket.onerror = (err) => {
    errorMessage('socket 链接失败: ' + err)
    backOther()
  }
}
const initSocket = () => {
  socket = new WebSocket(socketURI.type)
  socketOnOpen()
  socketOnClose()
  socketOnError()
}
onUnmounted(() => {
  socket.close()
})
</script>
<style scoped lang="less">
.term-box {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .xterm {
    flex: auto;
    height: 0;
  }
}
</style>
