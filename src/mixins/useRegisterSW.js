export default {
  name: "useRegisterSW",
  data: () => ({
    updateSW: undefined,
    offlineReady: false,
    needRefresh: false,
  }),
  async mounted() {
    const { registerSW } = await import("virtual:pwa-register")
    const vm = this;
    this.updateSW =  registerSW({
      immediate: true,
      onOfflineReady() {
        vm.offlineReady = true;
        vm.onOfflineReadyFn();
      } ,
      onNeedRefresh() {
        vm.needRefresh = true;
        vm.onNeedRefreshFn()
      },
    })
  },
  methods: {
    async closePrompt() {
      this.offlineReady = false;
      this.needRefresh = false;
    },
    onOfflineReadyFn() {
      console.log('onOfflineReady');
    },
    onNeedRefreshFn() {
      console.log('onNeedRefresh');
    },
    updateServiceWorker() {
      this.updateSW && this.updateSW(true)
    }
  }
}
