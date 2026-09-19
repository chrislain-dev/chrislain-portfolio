<template>
  <section class="animate-fade-up animate-delay-200">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
            <Layers :size="24" />
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            {{ t('home.projects.title') }}
          </h2>
        </div>
        <p class="text-slate-600 dark:text-slate-400 max-w-xl">
          {{ t('home.projects.description') }}
        </p>
      </div>

      <RouterLink to="/works"
        class="hidden md:flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
        {{ t('home.projects.seeMore') }}
        <ArrowRight :size="16" />
      </RouterLink>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard
        v-for="project in featuredProjects"
        :key="project.slug"
        :project="project"
        @viewDetails="goToDetails"
      />
    </div>

    <!-- Mobile 'See More' -->
    <div class="mt-8 md:hidden text-center">
      <RouterLink to="/works" class="btn-primary inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium">
         {{ t('home.projects.seeMore') }}
         <ArrowRight :size="16" />
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Layers, ArrowRight } from 'lucide-vue-next';
import ProjectCard from './ProjectCard.vue';
import { featuredProjects as projects } from '../../data/projects';

const { t } = useI18n();
const router = useRouter();

const featuredProjects = computed(() => projects);

const goToDetails = (detailsLink) => {
  if (detailsLink) router.push(detailsLink);
};
</script>
