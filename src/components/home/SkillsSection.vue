<template>
  <section class="animate-fade-up">
    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
          <Cpu :size="24" />
        </div>
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
          {{ t('home.skills.title') }}
        </h2>
      </div>
      <p class="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
        {{ t('home.skills.description') }}
      </p>
    </div>

    <!-- Tech Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="(skill, index) in skills" :key="skill.name" 
           class="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
           :style="{ animationDelay: `${index * 100}ms` }">
        
        <!-- Glow Effect on Hover -->
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative z-10 flex flex-col items-center text-center gap-4">
          <!-- Icon Container -->
          <div class="w-16 h-16 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
            <img :src="skill.icon" :alt="skill.name" class="w-10 h-10 object-contain" loading="lazy"
                 @error="handleImageError">
          </div>
          
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-1.5">{{ skill.name }}</h3>
            
            <!-- Level Badge -->
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                  :class="getLevelClasses(skill.levelKey)">
              {{ t(`home.skills.levels.${skill.levelKey}`) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Cpu } from 'lucide-vue-next'

const { t } = useI18n()

// Si un logo n'est plus disponible, on masque l'image plutôt que d'afficher une icône cassée.
const handleImageError = (event) => {
  event.target.style.display = 'none'
}

// Fonction pour styliser le badge selon le niveau
const getLevelClasses = (level) => {
  if (level === 'advanced') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
  }
  return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
}

const skills = [
  {
    name: 'Laravel',
    icon: '/assets/images/tech-laravel.svg',
    levelKey: 'advanced'
  },
  {
    name: 'Spring Boot',
    icon: '/assets/images/tech-spring.svg',
    levelKey: 'advanced'
  },
  {
    name: 'Vue.js',
    icon: '/assets/images/tech-vuejs.svg',
    levelKey: 'advanced'
  },
  {
    name: 'React',
    icon: '/assets/images/tech-react.svg',
    levelKey: 'advanced'
  },
  {
    name: 'NestJS',
    icon: '/assets/images/tech-nestjs.svg',
    levelKey: 'intermediate'
  },
  {
    name: 'Tailwind CSS',
    icon: '/assets/images/tech-tailwindcss.svg',
    levelKey: 'advanced'
  },
  {
    name: 'Nuxt.js',
    icon: '/assets/images/tech-nuxtjs.svg',
    levelKey: 'intermediate'
  },
  {
    name: 'MySQL',
    icon: '/assets/images/tech-mysql.svg',
    levelKey: 'advanced'
  },
  {
    name: 'PostgreSQL',
    icon: '/assets/images/tech-postgresql.svg',
    levelKey: 'intermediate'
  },
  {
    name: 'Flutter',
    icon: '/assets/images/tech-flutter.svg',
    levelKey: 'intermediate'
  },
  {
    name: 'WordPress',
    icon: '/assets/images/tech-wordpress.svg',
    levelKey: 'advanced'
  },
  {
    name: 'Git & GitHub',
    icon: '/assets/images/tech-git.svg',
    levelKey: 'advanced'
  },
]
</script>