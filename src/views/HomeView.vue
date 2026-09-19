<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background Ambient Effects (Global pour la Home) -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
    </div>

    <div class="container mx-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        <HeroeSection />
        <SkillsSection />
        <WorksSection />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroeSection from '../components/home/HeroeSection.vue'
import SkillsSection from '../components/home/SkillsSection.vue'
import WorksSection from '../components/home/WorksSection.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Chrislain AVOCEGAN - Développeur Full-Stack & Analyste-Programmeur',
  meta: [
    {
      name: 'description',
      content: "Développeur full-stack basé à Cotonou. API Laravel et Spring Boot, interfaces Vue.js et React, de l'analyse du besoin à la mise en production."
    },
    {
      name: 'keywords',
      content: 'Développeur Full-Stack, Analyste Programmeur, Laravel, Spring Boot, Vue.js, React, Tailwind CSS, Cotonou, Bénin'
    },
    {
      property: 'og:title',
      content: 'Chrislain AVOCEGAN - Développeur Full-Stack & Analyste-Programmeur'
    },
    {
      property: 'og:description',
      content: 'Réalisations, parcours et notes de développement autour de Laravel, Spring Boot, Vue.js et React.'
    },
    {
      property: 'og:image',
      content: 'https://chrislain-portfolio.vercel.app/preview-image.png'
    },
    {
      property: 'og:url',
      content: 'https://chrislain-portfolio.vercel.app'
    }
  ]
});
</script>
