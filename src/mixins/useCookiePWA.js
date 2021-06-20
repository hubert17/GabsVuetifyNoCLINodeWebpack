import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.0-rc.1/dist/js.cookie.min.mjs";

export default {
    name: "useCookiePWA",
    data() {
      return {
        deferredPrompt: null
      }
    },
    created() {
        window.addEventListener("beforeinstallprompt", e => {
          e.preventDefault();
          // Stash the event so it can be triggered later.
          if (Cookies.get("add-to-home-screen") === undefined) {
            this.deferredPrompt = e;
          }
        });
        window.addEventListener("appinstalled", () => {
          this.deferredPrompt = null;
        });
      },
      methods: {
        async dismiss() {
          Cookies.set("add-to-home-screen", null, { expires: 15 });
          this.deferredPrompt = null;
        },
        async install() {
          this.deferredPrompt.prompt();
        }
      },
  }