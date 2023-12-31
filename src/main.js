import {createApp} from 'vue'
import App from './App.vue'
import Axios from 'axios'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/css/base.css"
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import {createRouter, createWebHashHistory} from "vue-router";
import CmsCreate from './components/context/CmsCreate.vue'
import CmsDetails from './components/context/CmsDetails.vue'
import CmsList from "@/components/context/CmsList.vue";
import CmsEdit from "@/components/context/CmsEdit.vue";
import InvoiceEdit from "@/components/context/InvoiceEdit.vue";

//创建容器
const app = createApp(App)

//配置axios
Axios.defaults.baseURL = "http://localhost:8088"
app.config.globalProperties.$http = Axios

//配置element-icon
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//配置awesome-icon库
library.add(faCircleUser)
app.component('font-awesome-icon', FontAwesomeIcon)

//配置router
const routes = [
    {path: '/', redirect: '/cmsList'},
    {path: '/cmsList', component: CmsList},
    {path: '/cmsDetails/:contractId', component: CmsDetails},
    {path: '/cmsCreate', component: CmsCreate},
    {path: '/cmsEdit/:contractId', component: CmsEdit},
    {path: '/invoiceEdit/:contractId', component: InvoiceEdit}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    // 在每次导航之前滚动到页面顶部
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 可选的，使滚动平滑进行
    });
    next();
});
app.use(router)

//容器挂载
app.mount('#app')
