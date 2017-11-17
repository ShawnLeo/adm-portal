<template>
  <iframe src="https://www.baidu.com" width="100%" frameborder="0" scrolling="no" id="external-frame"
          onload="setIframeHeight(this)"></iframe>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      setIframeHeight(iframe) {
        if (iframe) {
          var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
          if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
          }
        }
      }
    },
    mounted() {
      window.onload = function () {
        this.setIframeHeight(document.getElementById('external-frame'));
      };
    }
  };
</script>

<style>
  #external-frame{
    min-height: 800px;
  }
</style>
