<script setup>
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { ArrowRight, FileText } from 'lucide-vue-next'
  import DotLottie from './../icons/DotLottie.vue'
  import NameAnimationComponent from './../elements/NameAnimationComponent.vue'

  const { t } = useI18n()
  const router = useRouter()

  // Le texte d'intro contient des liens internes injectés via v-html.
  // Les balises <RouterLink> ne sont pas compilées dans du v-html : on intercepte
  // donc les clics sur les <a> internes pour rester en navigation SPA.
  const handleInternalLinks = (event) => {
    const anchor = event.target.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    if (!href || !href.startsWith('/')) return
    event.preventDefault()
    router.push(href)
  }

  const stack = [
    { name: 'Laravel', icon: '/assets/images/tech-laravel.svg' },
    { name: 'Spring Boot', icon: '/assets/images/tech-spring.svg' },
    { name: 'Vue.js', icon: '/assets/images/tech-vuejs.svg' },
    { name: 'React', icon: '/assets/images/tech-react.svg' },
    { name: 'Tailwind CSS', icon: '/assets/images/tech-tailwindcss.svg' },
  ]
</script>

<template>
  <div class="lg:flex lg:flex-row justify-center items-center max-w-full">
    <div class="mx-auto lg:flex justify-left">
      <div class="text-left">
        <h1 class="mx-auto text-center animate-fade animate-duration-[5000ms] animate-alternate lg:text-left text-2xl tracking-tight sm:text-3xl md:text-5xl">
          <span class="block xl:inline">
              <NameAnimationComponent />
          </span>
        </h1>
        <p class="mt-3 text-center lg:text-left text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-500 dark:text-emerald-400 animate-fade-up animate-duration-[2000ms] animate-alternate">
          {{ t('home.heroe.myWork') }}
        </p>

        <div
          class="hero-intro mt-5 max-w-2xl animate-fade-right animate-duration-[2000ms] animate-alternate text-lg leading-relaxed text-slate-700 dark:text-gray-100 text-justify"
          @click="handleInternalLinks"
          v-html="t('home.heroe.introDescription')"></div>

        <!-- Stack technique -->
        <ul class="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
          <li v-for="tech in stack" :key="tech.name"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
            <img :src="tech.icon" :alt="''" aria-hidden="true" class="h-4 w-4 object-contain" loading="lazy" />
            {{ tech.name }}
          </li>
        </ul>

        <div class="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
          <RouterLink to="/works"
            class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            {{ t('home.heroe.viewWorks') }}
            <ArrowRight :size="16" />
          </RouterLink>
          <RouterLink to="/resume"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            <FileText :size="16" />
            {{ t('home.heroe.myResume') }}
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="flex justify-center mx-auto">
      <DotLottie />
    </div>
  </div>
</template>

<style scoped>
  .hero-intro :deep(strong) {
    font-weight: 600;
    color: rgb(30 41 59);
  }

  :global(.dark) .hero-intro :deep(strong) {
    color: rgb(255 255 255);
  }

  .hero-intro :deep(.link-inline) {
    color: rgb(79 70 229);
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  .hero-intro :deep(.link-inline:hover) {
    text-decoration-thickness: 2px;
  }

  :global(.dark) .hero-intro :deep(.link-inline) {
    color: rgb(52 211 153);
  }
</style>
