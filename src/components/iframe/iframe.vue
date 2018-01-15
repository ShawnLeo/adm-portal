<template>
  <iframe :src="toPath" width="100%" frameborder="0" scrolling="no" id="external-frame"></iframe>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import * as mainConst from '../../utils/const';
  export default {
    data() {
      return {
        toPath: ''
      };
    },
    methods: {
      setIframeHeight(iframe) {
        if (iframe) {
          let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
          if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
          }
        }
      },
      getPath(path, title) {
        let ts = new Date().getTime();
        if (path.split('?').length > 1) {
          this.toPath = path + '&sessionId=' + Cookies.get(mainConst.ADM_SESSION_ID) + '&ts=' + ts;
        } else {
          this.toPath = path + '?sessionId=' + Cookies.get(mainConst.ADM_SESSION_ID) + '&ts=' + ts;
        }
        if (title) {
          document.title = title;
        }
      }
    },
    mounted() {
      this.setIframeHeight(document.getElementById('external-frame'));
      this.getPath(decodeURIComponent(window.location.hash.split('path=')[1]), decodeURIComponent(window.location.hash.split('name=')[1]).split('&path=')[0]);
    },
    watch: {
      '$route' (to, from) {
        this.getPath(decodeURIComponent(window.location.hash.split('path=')[1]), to.query.name);
      }
    }
  };
</script>

<style>
  #external-frame{
    min-height: 800px;
  }
  .container{
    background: #ffffff;
  }
</style>
