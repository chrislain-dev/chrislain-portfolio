/**
 * Fichier de configuration du router
 * @module src/router/index
 * @author Chrislain AVOCEGAN <chrislainavocegan@gmail.com>
 * @copyright 2024 Chrislain AVOCEGAN
 * @license MIT
 */
import { createRouter, createWebHistory } from 'vue-router'

/**
 * Tableau des routes
 * @type {Object[]}
 */
const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/contact', component: () => import('../views/ContactView.vue') },
  { path: '/works', component: () => import('../views/WorksView.vue') },
  { path: '/resume', component: () => import('../views/ResumeView.vue') },
  { path: '/about', component: () => import('../views/AboutView.vue') },
  { path: '/blog', component: () => import('../views/Blog/BlogView.vue') },
  { path: '/blog/:slug', component: () => import('../views/Blog/BlogPostView.vue'), props: true },
  // Anciennes URLs du blog : on redirige pour ne pas casser les liens existants
  { path: '/posts', redirect: '/blog' },
  { path: '/post/:id', redirect: '/blog' },
  { path: '/tag/:id', redirect: '/blog' },
  { path: '/work/:slug', component: () => import('../views/Works/WorkDetailView.vue'), props: true },
  { path: '/settings', component: () => import('../views/Dashboard/SettingsView.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
]

/**
 * Création du router
 * @type {Object}
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return { top: 0 }
  },
})

export default router



