<template>
  <div class="relative min-h-screen transition-colors duration-500">
    <div class="container mx-auto px-6 py-16 max-w-7xl">

      <!-- Hero Section -->
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <!-- Text Content -->
        <div class="order-2 lg:order-1">
          <div class="overflow-hidden mb-3">
            <h1 class="hero-title text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              {{ t('about.title') }}
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 mt-1">
                {{ t('home.heroe.fullName') }}
              </span>
            </h1>
          </div>

          <div class="hero-text opacity-0 transform translate-y-8">
            <p class="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {{ t('about.description') }}
            </p>

            <div class="flex flex-wrap gap-3">
              <RouterLink to="/resume"
                class="group inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium text-sm hover:shadow-md transition-all">
                <FileText :size="16" />
                {{ t('about.myResume') }}
              </RouterLink>

              <RouterLink to="/contact"
                class="inline-flex items-center gap-2 px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Mail :size="16" />
                Contact
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            class="hero-image relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-xl opacity-0 scale-95">
            <img src="/assets/images/chrislain.jpg" alt="Chrislain Avocegan"
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>

            <!-- Status Badge -->
            <div
              class="absolute bottom-4 left-4 right-4 p-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p class="text-xs font-semibold text-slate-900 dark:text-white">{{ t('about.openToWork') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="stats-container grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 opacity-0">
        <div v-for="(stat, index) in stats" :key="index"
          class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group">

          <!-- Icon Container -->
          <div
            class="mb-3 w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
            <component :is="stat.icon" :size="20" stroke-width="2" />
          </div>

          <div class="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{{ stat.value }}</div>
          <div class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{{ stat.label }}
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid lg:grid-cols-12 gap-12">

        <!-- Left Column: Story & Skills -->
        <div class="lg:col-span-5 space-y-12">
          <!-- My Story -->
          <div class="story-section opacity-0">
            <div class="flex items-center gap-2 mb-4">
              <User :size="20" class="text-indigo-600 dark:text-indigo-400" />
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('about.story') }}</h2>
            </div>
            <div class="text-slate-600 dark:text-slate-400 leading-relaxed text-sm space-y-4">
              <p v-for="(paragraph, index) in storyParagraphs" :key="index">{{ paragraph }}</p>
              <RouterLink to="/resume"
                class="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline text-sm pt-1">
                {{ t('about.myResume') }}
                <ArrowRight :size="14" />
              </RouterLink>
            </div>
          </div>

          <!-- Skills -->
          <div class="skills-section opacity-0">
            <div class="flex items-center gap-2 mb-4">
              <Code :size="20" class="text-emerald-600 dark:text-emerald-400" />
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('home.skills.title') }}</h2>
            </div>

            <div class="space-y-6">
              <div v-for="(category, index) in skillCategories" :key="index">
                <h3 class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">{{
                  category.title }}</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="skill in category.items" :key="skill"
                    class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-default">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Experience Timeline -->
        <div class="lg:col-span-7">
          <div class="timeline-section opacity-0">
            <div class="flex items-center gap-2 mb-6">
              <Briefcase :size="20" class="text-indigo-600 dark:text-indigo-400" />
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('resume.experience.title') }}</h2>
            </div>

            <div class="relative pl-6 border-l border-slate-200 dark:border-slate-700 space-y-8">
              <div v-for="(item, index) in $tm('resume.experience.items')" :key="index"
                class="timeline-item relative group">
                <!-- Dot -->
                <div
                  class="absolute -left-[25px] top-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 bg-slate-400 dark:bg-slate-600 group-hover:bg-indigo-600 group-hover:scale-125 transition-all duration-300">
                </div>

                <div
                  class="p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300">
                  <div class="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <div>
                      <h3
                        class="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {{ item.role }}
                      </h3>
                      <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">{{ item.company }}</p>
                    </div>
                    <span
                      class="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-md">
                      {{ item.period }}
                    </span>
                  </div>

                  <ul class="space-y-1.5">
                    <li v-for="(detail, i) in item.details" :key="i"
                      class="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                      <Check :size="14" class="text-emerald-500 shrink-0 mt-0.5" />
                      {{ detail }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, Mail, User, Code, Briefcase, Check, ArrowRight, Clock, Rocket, Award, Users } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const { t, tm } = useI18n()

// SEO
useHead({
  title: computed(() => `${t('about.title')} - Chrislain Avocegan`),
  meta: [
    { name: 'description', content: computed(() => t('about.description')) }
  ]
})

// Le parcours est découpé en paragraphes (séparés par une ligne vide dans les traductions)
const storyParagraphs = computed(() =>
  t('about.longDescription')
    .replace(/<[^>]*>/g, '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
)

// Stats Data
const stats = computed(() => [
  {
    value: '8+',
    label: t('about.sections.workedYears.title'),
    icon: Clock
  },
  {
    value: '30+',
    label: t('about.sections.workedProjects.title'),
    icon: Rocket
  },
  {
    value: '5+',
    label: t('about.sections.certifications.title'),
    icon: Award
  },
  {
    value: '40+',
    label: t('about.sections.happyClients.title'),
    icon: Users
  }
])

// Skills Data
const skillCategories = computed(() => [
  {
    title: t('resume.professionalSkills.title'),
    items: tm('resume.professionalSkills.items')
  },
  {
    title: t('resume.softSkills.title'),
    items: tm('resume.softSkills.items')
  },
  {
    title: t('resume.languages.title'),
    items: tm('resume.languages.items')
  }
])

onMounted(() => {
  // Hero Animations
  const tl = gsap.timeline()

  tl.from('.hero-title', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
    .to('.hero-text', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .to('.hero-image', {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6')

  // Scroll Animations
  gsap.to('.stats-container', {
    scrollTrigger: {
      trigger: '.stats-container',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.6
  })

  gsap.to('.story-section', {
    scrollTrigger: {
      trigger: '.story-section',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.6
  })

  gsap.to('.skills-section', {
    scrollTrigger: {
      trigger: '.skills-section',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.6
  })

  gsap.to('.timeline-section', {
    scrollTrigger: {
      trigger: '.timeline-section',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.6
  })

  gsap.from('.timeline-item', {
    scrollTrigger: {
      trigger: '.timeline-section',
      start: 'top 70%',
    },
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15
  })
})
</script>
