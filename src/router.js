import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/addFile',
			component: () => import('./views/addFile.vue')
		},
		{
			path: '/about',
			component: () => import('./views/about.vue')
		},
		// {
		// 	path: '/analytics',
		// 	component: () => import('../views/Analytics.vue')
		// },
	],
})

export default router