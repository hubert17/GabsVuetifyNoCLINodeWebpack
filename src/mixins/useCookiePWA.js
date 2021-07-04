import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.0-rc.1/dist/js.cookie.min.mjs"

export default {
  name: "useCookiePWA",
  data() {
    return {
      deferredPrompt: null,
    }
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      if (Cookies.get("add-to-home-screen") === undefined) {
        this.deferredPrompt = e
        localStorage.removeItem('pwa_' + window.location.hostname)
      }
    })
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null
      localStorage.setItem('pwa_' + window.location.hostname, true)
    })
    this.$root.$on("appInstall", async () => {
      await this.install()
    })
  },
  methods: {
    async dismiss() {
      Cookies.set("add-to-home-screen", null, { expires: 15 })
      this.deferredPrompt = null
    },
    async install() {
      try {
        this.deferredPrompt.prompt()
        const result = await this.deferredPrompt.userChoice
        if (result.outcome === "accepted") {
          localStorage.setItem('pwa_' + window.location.hostname, true)
          this.$root.$emit("isInstalled")
        }
      } catch {}
    }
  }
}
