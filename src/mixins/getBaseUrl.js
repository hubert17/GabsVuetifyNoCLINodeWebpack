export default {
    baseUrl() {
        return window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")+1)
    }
  }