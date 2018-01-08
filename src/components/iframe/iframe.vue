<template>
  <iframe :src="toPath" width="100%" frameborder="0" scrolling="no" id="external-frame"></iframe>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  export default {
    data() {
      return {
        toPath: ''
      };
    },
    methods: {
      setIframeHeight(iframe) {
        if (iframe) {
          var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
          if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
          }
        }
      },
      getPath(path, title) {
        if (path.split('?').length > 1) {
          this.toPath = path + '&accessToken=' + Cookies.get('sessionId');
        } else {
          this.toPath = path + '?accessToken=' + Cookies.get('sessionId');
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
        this.getPath(to.query.path, to.query.name);
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
