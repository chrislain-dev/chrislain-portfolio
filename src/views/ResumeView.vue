<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans pb-20">

    <!-- Floating Action Button for Download -->
    <div class="fixed bottom-8 right-8 z-50 animate-fade-left">
      <button @click="showDialog = true"
        class="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1">
        <Download :size="20" />
        <span class="font-medium">{{ t('resume.downloadButton') }}</span>
      </button>
    </div>

    <!-- Main Container -->
    <div class="container mx-auto px-4 py-12 max-w-6xl animate-fade-up">

      <!-- Header / Profile Section -->
      <div class="mb-10 relative">
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div
          class="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1
                class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 tracking-tight mb-2">
                {{ t('resume.header.name') }}
              </h1>
              <h2 class="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2">
                <Code :size="24" class="text-indigo-500" />
                {{ t('resume.header.title') }}
              </h2>
              <p class="mt-3 max-w-xl text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {{ t('resume.header.tagline') }}
              </p>
            </div>

            <!-- Quick Contact Chips -->
            <div class="flex flex-wrap gap-3 justify-center md:justify-end">
              <a href="mailto:chrislainavocegan1@gmail.com" class="contact-chip">
                <Mail :size="14" />
                <span>Email Me</span>
              </a>
              <div class="contact-chip">
                <MapPin :size="14" />
                <span>{{ t('resume.contact.address') }}</span>
              </div>
              <div class="contact-chip">
                <Phone :size="14" />
                <span>+229 01 56 11 53 63</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- LEFT COLUMN (Sidebar-like: Contact, Skills, Languages) -->
        <div class="lg:col-span-4 space-y-8">

          <!-- Skills Card -->
          <div class="glass-card">
            <div class="card-header">
              <Cpu :size="20" class="text-indigo-500" />
              <h3>{{ t('resume.professionalSkills.title') }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="(skill, index) in $tm('resume.professionalSkills.items')" :key="index"
                class="skill-tag bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800">
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Tech Stack / Hard Skills (Dynamic from script) -->
          <div class="glass-card">
            <div class="card-header">
              <Terminal :size="20" class="text-emerald-500" />
              <h3>{{ t('resume.hardSkills.title') }}</h3>
            </div>
            <div class="space-y-3">
              <div v-for="(skill, index) in skills" :key="index"
                class="text-sm text-slate-600 dark:text-slate-400 border-l-2 border-emerald-500 pl-3">
                {{ skill }}
              </div>
            </div>
          </div>

          <!-- Soft Skills -->
          <div class="glass-card">
            <div class="card-header">
              <Smile :size="20" class="text-pink-500" />
              <h3>{{ t('resume.softSkills.title') }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="(skill, index) in $tm('resume.softSkills.items')" :key="index"
                class="skill-tag bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800">
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Languages -->
          <div class="glass-card">
            <div class="card-header">
              <Languages :size="20" class="text-orange-500" />
              <h3>{{ t('resume.languages.title') }}</h3>
            </div>
            <ul class="space-y-2">
              <li v-for="(language, index) in $tm('resume.languages.items')" :key="index"
                class="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                <Globe :size="14" class="text-slate-400" />
                {{ language }}
              </li>
            </ul>
          </div>

          <!-- Interests -->
          <div class="glass-card">
            <div class="card-header">
              <Heart :size="20" class="text-red-500" />
              <h3>{{ t('resume.interests.title') }}</h3>
            </div>
            <div class="flex flex-wrap gap-3">
              <span v-for="(interest, index) in interests" :key="index"
                class="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                #{{ interest.toLowerCase().replace(' ', '') }}
              </span>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN (Main: Experience, Education, Projects) -->
        <div class="lg:col-span-8 space-y-8">

          <!-- Experience Section (Timeline) -->
          <div class="glass-card">
            <div class="card-header mb-6">
              <Briefcase :size="24" class="text-indigo-600 dark:text-indigo-400" />
              <h3 class="text-xl">{{ t('resume.experience.title') }}</h3>
            </div>

            <div class="relative pl-4 space-y-8 sm:pl-8">
              <!-- Vertical Line -->
              <div class="absolute left-0 sm:left-2 top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

              <div v-for="(item, index) in experiences" :key="index" class="relative group">
                <!-- Dot -->
                <div
                  class="absolute -left-[21px] sm:-left-[30px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 bg-indigo-500 group-hover:scale-125 transition-transform duration-300">
                </div>

                <div
                  class="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                  <div class="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h4 class="text-lg font-bold text-slate-900 dark:text-white">{{ item.role }}</h4>
                    <span
                      class="text-xs font-bold px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">{{
                      item.period }}</span>
                  </div>
                  <div class="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                    <Building2 :size="14" />
                    {{ item.company }}
                  </div>
                  <ul class="space-y-1.5">
                    <li v-for="(detail, detailIndex) in item.details" :key="detailIndex"
                      class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      {{ detail }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Education Section -->
          <div class="glass-card">
            <div class="card-header mb-4">
              <GraduationCap :size="24" class="text-emerald-600 dark:text-emerald-400" />
              <h3 class="text-xl">{{ t('resume.education.title') }}</h3>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div v-for="(education, index) in educations" :key="index"
                class="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 dark:to-slate-800 border border-emerald-100 dark:border-emerald-900/50">
                <div class="font-bold text-slate-900 dark:text-white mb-1">{{ education.degree }}</div>
                <div class="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2">{{ education.institution }}
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
                  <Calendar :size="12" />
                  {{ education.year }}
                </div>
              </div>
            </div>
          </div>

          <!-- Freelance Projects -->
          <div class="glass-card">
            <div class="card-header mb-4">
              <Rocket :size="24" class="text-purple-600 dark:text-purple-400" />
              <h3 class="text-xl">{{ t('resume.freelance.title') }}</h3>
            </div>
            <ul class="grid gap-3">
              <li v-for="(project, index) in $tm('resume.freelance.items')" :key="index"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <CheckCircle2 :size="18" class="text-purple-500 mt-0.5 shrink-0" />
                <span class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{{ project }}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <!-- Modal Dialog -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <div v-show="showDialog" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showDialog = false"></div>

        <!-- Content -->
        <div
          class="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
          <div class="bg-indigo-600 p-4 flex justify-between items-center">
            <h2 class="font-bold text-white text-lg flex items-center gap-2">
              <FileDown :size="20" />
              {{ t('resume.dialog.title') }}
            </h2>
            <button @click="showDialog = false" class="text-white/80 hover:text-white transition-colors">
              <X :size="20" />
            </button>
          </div>

          <div class="p-6">
            <form @submit.prevent="downloadResume" class="space-y-5">
              <div>
                <label for="lang" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {{ t('resume.dialog.languageLabel') }}
                </label>
                <div class="relative">
                  <select v-model="selectedLanguage" id="lang"
                    class="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                    <option value="fr">{{ t('resume.dialog.french') }} 🇫🇷</option>
                    <option value="en">{{ t('resume.dialog.english') }} 🇬🇧</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-3.5 text-slate-400 pointer-events-none" :size="16" />
                </div>
              </div>

              <div class="flex gap-3 pt-2">
                <button type="button" @click="showDialog = false"
                  class="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  {{ t('resume.dialog.closeButton') }}
                </button>
                <button type="submit"
                  class="flex-1 py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/25 transition-all">
                  {{ t('resume.dialog.submitButton') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import {
  Download, Mail, MapPin, Phone, Code,
  Cpu, Terminal, Smile, Languages, Globe, Heart,
  Briefcase, Building2, GraduationCap, Calendar, Rocket,
  CheckCircle2, FileDown, X, ChevronDown
} from 'lucide-vue-next'

const { t, tm, locale } = useI18n()

const showDialog = ref(false)
const selectedLanguage = ref(locale.value)

const downloadResume = () => {
  const lang = selectedLanguage.value
  const link = document.createElement('a')
  link.href = `/assets/cv/chrislain_avocegan_cv_${lang}.pdf`
  link.download = `chrislain_avocegan_cv_${lang}.pdf`
  link.click()
  showDialog.value = false
}

// Toutes les données du CV viennent des fichiers de traduction (src/locales/*.json),
// ce qui évite d'avoir deux versions du parcours à maintenir en parallèle.
const educations = computed(() => tm('resume.education.items'))
const experiences = computed(() => tm('resume.experience.items'))
const skills = computed(() => tm('resume.hardSkills.items'))
const interests = computed(() => tm('resume.interests.items'))

useHead({
  title: 'CV - Chrislain Avocegan',
  meta: [
    { name: 'description', content: "Parcours, compétences et réalisations de Chrislain Avocegan, développeur full-stack Laravel, Spring Boot, Vue.js et React." }
  ]
})
</script>

<style scoped>
/* Utility Classes for Glassmorphism Reuse */
.glass-card {
  @apply bg-white/60 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-300;
}

.card-header {
  @apply flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-bold text-lg;
}

.contact-chip {
  @apply flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 transition-colors;
}

.skill-tag {
  @apply px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:scale-105 cursor-default;
}
</style>