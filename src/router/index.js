import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { authorizeToken } from './guards'

Vue.use(Router)

const router = new Router({ routes })
router.beforeEach(authorizeToken)

export default router
