import{css as t}from"https://cdn.jsdelivr.net/npm/goober@2.0.33/dist/goober.modern.js";import{D as e}from"./vendor.bdb5613f.js";import n from"https://cdn.jsdelivr.net/npm/js-cookie@3.0.0-rc.1/dist/js.cookie.min.mjs";let o;const i={},a=function(t,e){if(!e)return t();if(void 0===o){const t=document.createElement("link").relList;o=t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(e.map((t=>{if(t in i)return;i[t]=!0;const e=t.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${n}`))return;const a=document.createElement("link");return a.rel=e?"stylesheet":o,e||(a.as="script",a.crossOrigin=""),a.href=t,document.head.appendChild(a),e?new Promise(((t,e)=>{a.addEventListener("load",t),a.addEventListener("error",e)})):void 0}))).then((()=>t()))};var s={name:"Home",data:()=>({title:"Home page",bingPhotos:[]}),methods:{getBingWallpapers(){axios.get("data/bingPhotos.json").then((t=>{this.bingPhotos=t.data.images,this.saveToLocal(this.bingPhotos)})).catch((t=>{axios.get("public/data/bingPhotos.json").then((t=>{this.bingPhotos=t.data.images,this.saveToLocal(this.bingPhotos)})).catch((t=>{let e=localStorage.getItem("bingphotos");e&&(this.bingPhotos=e)}))}))},saveToLocal(t){localStorage.setItem("bingphotos",JSON.stringify(t))}},mounted(){this.getBingWallpapers()},template:'\n\n<v-main>\n    <v-container>\n        <h1>\n            {{ title }}\n        </h1>\n        <v-row>\n            <v-col sm="4" v-for="photo in bingPhotos" :key="photo.startdate">\n                <v-card class="mx-auto">\n                    <v-img class="white--text align-end"  :src="\'https://www.bing.com\' + photo.url" >\n                        <v-card-title>{{ photo.title }}</v-card-title>\n                    </v-img>\n                    <v-card-subtitle class="pb-0"> {{ photo.copyright }} </v-card-subtitle>\n                    <v-card-actions>\n                      <v-spacer></v-spacer>\n                      <v-btn icon> <v-icon>mdi-heart</v-icon> </v-btn>\n                      <v-btn icon> <v-icon>mdi-bookmark</v-icon> </v-btn>\n                      <v-btn icon> <v-icon>mdi-share-variant</v-icon> </v-btn>\n                  </v-card-actions>\n                </v-card>\n            </v-col>\n        </v-row>\n    </v-container>\n</v-main>\n\n    '},l={name:"Settings",data:()=>({title:"Settings page"}),components:{BaseButton:()=>a((()=>import("./BaseButton.aa4da055.js")),void 0)},template:"\n\n<v-main>\n    <v-container>\n        <h1>\n            {{ title }}\n        </h1>\n        <v-row>\n            <v-col>\n                <BaseButton />\n            </v-col>\n        </v-row>\n    </v-container>\n</v-main>\n\n    "};var r={name:"Help",data:()=>({title:"Help page"}),template:`\n\n<v-main class=${t`

background-color: lightgrey;
.header {
    background: dodgerblue;
    color: white;
    padding: 1em;
}

`}>\n    <v-container>\n        <h1 class="header">\n            {{ title }}\n        </h1>\n    </v-container>\n</v-main>\n\n    `};const c=new e("gabs-vue-app2");c.version(2).stores({friends:"++id,name,isCloseFriend",pets:"++id,name,kind",billboardSongs:"++id,releaseDate,peakChartPosition,artist,title,duration,recordLabelCatalogNo"});var d={name:"billboard",data:()=>({title:"Billboard Songs",songs:[],overlay:!1,searchItem:null}),methods:{async getSongsAPI(){this.overlay=!0,axios.get("https://api45gabs.azurewebsites.net/api/sample/billboardsongs").then((t=>{this.addSongsToDb(t.data.splice(0,100)),this.getSongsFromDb()})).catch((t=>{alert("offline"),this.getSongsFromDb()}))},async addSongsToDb(t){await c.billboardSongs.bulkAdd(t).then((function(t){console.log("Done adding billboard songs all over the place..."),alert("Last song's id was: "+t)})).catch((t=>{console.log("Some songs did not succeed. However, ...songs was added successfully")}))},async getSongsFromDb(){self=this,c.open(),await c.billboardSongs.toArray().then((t=>{self.songs=t,this.overlay=!1})).catch((t=>{console.error(t),this.overlay=!1}))},itemFilter:function(t){return!this.searchItem||t&&(t.title==this.searchItem||t.artist==this.searchItem)}},mounted(){this.getSongsAPI()},template:`\n\n<v-main class=${t`

background-color: lightgrey;
.header {
    background: dodgerblue;
    color: white;
    padding: 1em;
}

`}>\n    <v-overlay :value="overlay"> <v-progress-circular indeterminate size="64" ></v-progress-circular> </v-overlay>\n    <v-container>\n        <h1 class="header">\n            {{ title }}\n        </h1>\n        <v-row>\n            <v-col>\n                <v-text-field v-model="searchItem" hide-details dense filled label="Item Search" autocomplete="off" clearable ></v-text-field>\n                <v-simple-table>\n                    <template v-slot:default>\n                      <thead>\n                        <tr>\n                          <th class="text-left"> Title </th>\n                          <th class="text-left"> Artist </th>\n                          <th class="text-left"> Duration </th>\n                          <th class="text-left"> Release </th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr v-for="item in songs" :key="item.id" v-show="itemFilter(item)" >\n                          <td>{{ item.title }}</td>\n                          <td>{{ item.artist }}</td>\n                          <td>{{ item.duration }}</td>\n                          <td>{{ item.releaseDate }}</td>\n                        </tr>\n                      </tbody>\n                    </template>\n                  </v-simple-table>\n            </v-col>\n        </v-row>\n    </v-container>\n</v-main>\n\n    `};Vue.use(VueRouter);const p=[{title:"Home",icon:"home",path:"/",component:s},{title:"Billboard",icon:"library_music",path:"/billboard",component:d},{title:"Settings",icon:"settings",path:"/settings",component:l},{title:"Help",icon:"help_outline",path:"/help",component:r}],v=new VueRouter({base:window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/")+1),mode:"history",routes:p});v.onReady((async()=>{try{const{registerSW:t}=await a((()=>import("./virtual_pwa-register.e392dfa7.js")),void 0);t({immediate:!0})}catch(t){console.log(JSON.stringify(t))}})),Vue.use(Vuex);const m=new Vuex.Store({state:{appConfig:{name:"Gabs Vue App",baseUrl:"",apiBaseUrl:"https://api45gabs.azurewebsites.net",imgBaseUrl:"",storageName:"lsgabsvueapp"},authHeader:{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:null}},authHeaderForm:{headers:{"Content-Type":"multipart/form-data",Authorization:null}},user:null},getters:{appConfig:function(t){return t.appConfig},user:function(t){return t.user},authHeader:function(t){return t.authHeader},authHeaderForm:function(t){return t.authHeaderForm}},mutations:{setUser:function(t,e,n=!1){t.user=e,e&&e.token?(n||localStorage.setItem(t.appConfig.storageName,JSON.stringify(t.user)),t.authHeader.headers.Authorization="Bearer "+e.token,t.authHeaderForm.headers.Authorization="Bearer "+e.token):(t.authHeader.headers.Authorization=null,t.authHeaderForm.headers.Authorization=null,localStorage.removeItem(t.appConfig.storageName),console.log("User has logged out."))}},actions:{}});var u={name:"SideInfoPanel",props:["TitleHeader","TitleText","DetailHeader","DetailText","StatusHeader","StatusText","OtherHeader","OtherText"],data:()=>({}),template:`\n\n<v-container fluid class="hidden-sm-and-down">\n      <v-row class=${t`
    .bgcolor {
        background-color: #fff!important;
        border-color: #fff!important;
    }

`} >\n        <v-col cols="12">\n          <v-row class="ml-5" align="end" justify="end" style="height: calc(100vh - 450px);overflow-y: hidden;" >\n            \x3c!-- outlined tile --\x3e\n            <div class="bgcolor ml-1 pa-0">\n              <v-col cols="12" class="blue-grey lighten-1 pr-0 mr-0" style="height:20px;border-radius: 0px 0px 20px 0px;"> </v-col>\n              <v-col cols="12" class="blue-grey lighten-1 pa-0 ma-0" style="border-radius: 0px 0px 0px 0px;">\n                <v-row class="pa-0 ma-0">\n                  <v-col cols="12" class="bgcolor pa-0 ma-0" style="height: 20px; border-radius: 20px 0px 0px 0px;"> </v-col>\n                </v-row>\n              </v-col>\n              <div class="pl-5 mr-8" style="min-width: 100px;">\n                <p v-if="TitleHeader" class="amber--text text--darken-4 font-weight-light pb-0 my-0">{{TitleHeader}}</p>\n                <p v-if="TitleHeader" class="title mb-2">{{TitleText}}</p>\n                <p v-if="DetailHeader" class="amber--text text--darken-4 font-weight-light py-0 my-0">{{DetailHeader}}</p>\n                <p v-if="DetailHeader" class="title mb-2">{{DetailText}}</p>\n                <p v-if="StatusHeader" class="amber--text text--darken-4 font-weight-light py-0 my-0">{{StatusHeader}}</p>\n                <p v-if="StatusHeader" class="mb-3" style="font-size:medium;font-weight: bold;letter-spacing:1px">\n                  <span style="padding-left:3px; padding-right: 3px;display:inline;-moz-box-decoration-break:clone;\n                      -webkit-box-decoration-break:clone;box-decoration-break:clone;">{{StatusText}}\n                  </span>\n                </p>\n                <p v-if="OtherHeader" class="amber--text text--darken-4 font-weight-light pb-0 my-0">{{OtherHeader}}</p>\n                <p v-if="OtherHeader" class="font-weight-light mb-2">{{OtherText}}</p>\n              </div>\n              <v-col cols="12" class="blue-grey lighten-1 pr-0 mr-0" style="height:20px;border-radius: 0px 20px 0px 0px;"> </v-col>\n            </div>\n          </v-row>\n        </v-col>\n      </v-row>\n    </v-container>\n\n    `};const h=t`
    .pwa-toast {
      position: fixed;
      right: 0;
      bottom: 0;
      margin: 16px;
      padding: 12px;
      border: 1px solid #8885;
      border-radius: 4px;
      z-index: 1;
      text-align: left;
      box-shadow: 3px 4px 5px 0px #8885;
      background-color: white;
    }
    .pwa-toast .message {
      margin-bottom: 8px;
    }
    .pwa-toast button {
      border: 1px solid #8885;
      outline: none;
      margin-right: 5px;
      border-radius: 2px;
      padding: 3px 10px;
    }

`,g=a((()=>import("./useRegisterSW.96637cad.js")),["/GabsVuetifyNoCLINodeWebpack/assets/useRegisterSW.96637cad.js","/GabsVuetifyNoCLINodeWebpack/assets/vendor.bdb5613f.js"]);var b={name:"ReloadPrompt",mixins:[g],data:()=>({renderThis:!0,offlineReady:null,needRefresh:null}),mounted(){0===Object.keys(g).length?this.renderThis=!1:console.log("useRegisterSW is "+JSON.stringify(g))},template:`\n\n<div v-if="renderThis" class=${h}>\n    <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">\n    <div class="message">\n      <span v-if="offlineReady"> App ready to work offline </span>\n      <span v-else> New content available, click on reload button to update. </span>\n    </div>\n    <button v-if="needRefresh" @click="updateServiceWorker"> Reload </button>\n    <button @click="closePrompt"> Close </button>\n  </div>\n</div>\n\n\n    `},f=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:b}),x={name:"App",data:()=>({appDrawer:!0,showSideInfo:!0,learnings:[{title:"Vue",link:"https://vuejs.org/v2/guide/"},{title:"Vuetify",link:"https://vuetifyjs.com/en/introduction/why-vuetify/"},{title:"Github",link:"https://github.com/hubert17/GabsVuetifyNoCLINodeWebpack"}]}),watch:{$route(t,e){this.showSideInfo="/"===t.path&&this.$vuetify.breakpoint.smAndUp}},methods:{clickToggleDrawer:function(){this.showSideInfo?this.$root.$emit("appDrawer",!0):this.$root.$emit("appDrawer",!this.appDrawer)},gotoRoute(t){v.push({path:t}).catch((()=>{}))},logout(){m.commit("setUser",null),v.push({path:"/"}).catch((()=>{}))}},mounted(){this.$root.$on("appDrawer",(t=>{this.appDrawer=t}))},computed:{routes(){return this.$router.options.routes},appConfig:()=>m.getters.appConfig,user(){let t=m.getters.user;return t||(t={userName:"offline user"}),t}},components:{SideInfoPanel:u,ReloadPrompt:b},template:'\n<div>\n   <ReloadPrompt />\n    <v-navigation-drawer v-model="appDrawer" :clipped="$vuetify.breakpoint.smAndUp" app dark :width="$vuetify.breakpoint.xsOnly ? 270 : 250" class="blue-grey lighten-1">\n\n    <v-list nav dark class="blue-grey lighten-1">\n      <v-subheader class="hidden-sm-and-up">{{appConfig.name}}</v-subheader>\n\n      <v-list-item-group>\n        <v-list-item v-for="(menu, i) in routes"  :key="i" :to="menu.path" active-class="blue-grey darken-0" >\n          <v-list-item-icon>\n            <v-icon v-text="menu.icon"></v-icon>\n          </v-list-item-icon>\n          <v-list-item-content>\n            <v-list-item-title v-text="menu.title"></v-list-item-title>\n          </v-list-item-content>\n        </v-list-item>\n\n        <v-list-group prepend-icon="local_library" no-action>\n          <template v-slot:activator>\n            <v-list-item-content>\n              <v-list-item-title>Learn</v-list-item-title>\n            </v-list-item-content>\n          </template>\n          <v-list-item v-for="menu in learnings" :key="menu.title" :href="menu.link" target="_blank" >\n            <v-list-item-content>\n              <v-list-item-title v-text="menu.title"></v-list-item-title>\n            </v-list-item-content>\n          </v-list-item>\n      </v-list-group>\n\n      </v-list-item-group>\n\n      \x3c!-- Mobile only Menu items  --\x3e\n      <v-list-item active-class="blue-grey darken-0" class="hidden-sm-and-up">\n            <v-list-item-icon>\n              <v-icon>forum</v-icon>\n            </v-list-item-icon>\n            <v-list-item-content>\n              <v-list-item-title>Customer Service</v-list-item-title>\n            </v-list-item-content>\n      </v-list-item>\n      <v-list-item active-class="blue-grey darken-0"  class="hidden-sm-and-up">\n            <v-list-item-icon>\n              <v-icon>how_to_vote</v-icon>\n            </v-list-item-icon>\n            <v-list-item-content>\n              <v-list-item-title>Send Suggesstions</v-list-item-title>\n            </v-list-item-content>\n      </v-list-item>\n\n    </v-list>\n\n    <SideInfoPanel v-if="showSideInfo"\n      TitleHeader="Title" TitleText="Some Title"\n      DetailHeader="Detail" DetailText="Some a bit long detail here"\n      StatusHeader="Status" StatusText="Some Status" />\n\n  </v-navigation-drawer>\n\n  <v-app-bar :clipped-left="$vuetify.breakpoint.smAndUp" app color="blue-grey" dark>\n        <v-app-bar-nav-icon @click.stop="clickToggleDrawer"></v-app-bar-nav-icon>\n\n        <v-toolbar-title>{{appConfig.name}}</v-toolbar-title>\n\n        <v-spacer></v-spacer>\n\n        <v-tooltip bottom>\n            <template v-slot:activator="{ on }">\n            <v-btn v-on="on" icon dark @click="">\n              <v-icon>mdi-lightbulb-on</v-icon>\n            </v-btn>\n            </template>\n            <span>Bulb Menu</span>\n          </v-tooltip>\n\n        <v-tooltip bottom>\n            <template v-slot:activator="{ on }">\n              <v-btn v-on="on" icon dark class="hidden-xs-only">\n                <v-icon>mdi-forum</v-icon>\n              </v-btn>\n            </template>\n            <span>Customer Service</span>\n          </v-tooltip>\n\n          <v-tooltip bottom>\n            <template v-slot:activator="{ on }">\n              <v-btn v-on="on" icon dark class="hidden-xs-only">\n                <v-icon>mdi-vote</v-icon>\n              </v-btn>\n            </template>\n            <span>Send Suggesstions</span>\n          </v-tooltip>\n\n            <v-menu left bottom>\n                <template v-slot:activator="{ on }">\n                  <v-btn text v-on="on" slot="activator" small="small"  dark  class="hidden-xs-only">{{user.userName}}</span>\n                      <v-icon>keyboard_arrow_down</v-icon>\n                    </v-btn>\n                </template>\n\n                <v-list >\n                  <v-list-item @click="gotoRoute(\'/settings\')">\n                      <v-icon class="mr-2">settings</v-icon>\n                    <v-list-item-title>Settings</v-list-item-title>\n                  </v-list-item>\n                  <v-list-item @click.prevent="logout">\n                      <v-icon class="mr-2">exit_to_app</v-icon>\n                    <v-list-item-title>Logout</v-list-item-title>\n                  </v-list-item>\n                </v-list>\n              </v-menu>\n\n            <v-menu left bottom>\n                <template v-slot:activator="{ on }">\n                  <v-avatar v-ripple v-on="on" slot="activator" class="mr-2" size="36"  ><img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" /></v-avatar>\n                </template>\n\n                <v-list  class="hidden-sm-and-up">\n                  <v-list-item @click="() => {gotoRoute(\'/settings\')}">\n                      <v-icon class="mr-2">settings</v-icon>\n                    <v-list-item-title>Settings</v-list-item-title>\n                  </v-list-item>\n                  <v-list-item @click.prevent="logout">\n                      <v-icon class="mr-2">exit_to_app</v-icon>\n                    <v-list-item-title>Logout</v-list-item-title>\n                  </v-list-item>\n                </v-list>\n              </v-menu>\n\n      </v-app-bar>\n\n\n</div>\n\n'},w={name:"AppLogin",data:()=>({login:{username:"admin",password:"admin123"},loading:!1,snackbar:{show:!1,text:""}}),methods:{getToken(){this.loading=!0,axios.post(this.appConfig.apiBaseUrl+"/TOKEN?username="+this.login.username+"&password="+this.login.password,this.authHeader).then((t=>{let e=t.data;if(!e||!e.token)throw{};m.commit("setUser",e),console.log("Authentication OK. ")})).catch((t=>{console.log(t.message),this.loading=!1,this.snackbar.text="Invalid username and/or password.",this.snackbar.show=!0,this.$refs.username.focus()}))}},mounted(){document.body.style.backgroundSize="cover",document.body.style.backgroundImage="url(https://www.bing.com/th?id=OHR.FinlandBrownBear_ROW6208280659_1920x1080.jpg&rf=LaDigue_1920x1080.jpg)"},computed:{appConfig:function(){return m.getters.appConfig}},template:'\n\n<v-main>\n\n    <v-container fluid fill-height>\n        <v-row align="center" justify="center">\n            <v-col sm="4" class="text-xs-center">\n              <v-card class="elevation-12">\n                    <v-toolbar dark color="blue-grey">\n                        <v-toolbar-title>Login</v-toolbar-title>\n                        <v-spacer></v-spacer>\n                        <v-tooltip left>\n                            <template v-slot:activator="{ on }">\n                            <v-btn v-on="on" icon dark @click="">\n                            <v-icon>vpn_key</v-icon>\n                            </v-btn>\n                            </template>\n                            <span>Forgot Password</span>\n                        </v-tooltip>\n                    </v-toolbar>\n\n                    <v-card-text>\n                        <v-form @keyup.enter.native="getToken">\n                            <v-text-field type="text" v-model="login.username" prepend-icon="person" label="Username" ref="username"></v-text-field>\n                            <v-text-field type="password" v-model="login.password" prepend-icon="lock" label="Password"></v-text-field>\n                            <v-btn color="blue-grey white--text" :loading="loading" block="block" @click.prevent="getToken" type="button" :disabled="loading">Sign in</v-btn>\n                        </v-form>\n                    </v-card-text>\n                    <v-card-actions>\n                        <v-spacer></v-spacer>\n                    </v-card-actions>\n              </v-card>\n            </v-col>\n        </v-row>\n      </v-container>\n\n      <v-snackbar v-model="snackbar.show" top :timeout="8000" color="purple darken-3">\n        <span class="float-left">{{ snackbar.text }}</span>\n        <v-btn class="float-right" color="warning" x-small @click="snackbar.show = false">\n            x\n        </v-btn>\n      </v-snackbar>\n\n</v-main>\n\n    '},y={name:"useCookiePWA",data:()=>({deferredPrompt:null}),created(){window.addEventListener("beforeinstallprompt",(t=>{t.preventDefault(),void 0===n.get("add-to-home-screen")&&(this.deferredPrompt=t)})),window.addEventListener("appinstalled",(()=>{this.deferredPrompt=null}))},methods:{async dismiss(){n.set("add-to-home-screen",null,{expires:15}),this.deferredPrompt=null},async install(){this.deferredPrompt.prompt()}}};Vue.use(Vuetify),new Vue({el:"#app",vuetify:new Vuetify,router:v,mixins:[y],components:{"app-main":x,Login:w,ReloadPrompt:()=>a((()=>Promise.resolve().then((function(){return f}))),void 0)},mounted(){if(document.getElementsByTagName("html")[0].style.overflowY="auto",!navigator.onLine){let t=localStorage.getItem(this.appConfig.storageName);t&&m.commit("setUser",JSON.parse(t),!0)}},computed:{authorized:function(){return null!=m.getters.user},appConfig:function(){return m.getters.appConfig}},template:'\n\n<v-app :style="(!authorized ? \'background: rgba(0,0,0,0)\' : \'\')" class="-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-touch-callout: none;">\n    <ReloadPrompt />\n    <v-banner v-if="deferredPrompt" color="info" dark class="text-left">\n        Get our free app. It won\'t take up space on your phone and also works offline!\n        <template v-slot:actions>\n          <v-btn text @click="dismiss">Dismiss</v-btn>\n          <v-btn text @click="install">Install</v-btn>\n        </template>\n      </v-banner>\n    <app-main v-if="authorized"></app-main>\n    <router-view v-if="authorized"></router-view>\n    <Login v-if="!authorized" />\n\n</v-app>\n\n'});export{a as _};
