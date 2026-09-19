<template>
  <div class="relative min-h-screen pb-20 overflow-hidden">
    
    <!-- Background Ambient Effects -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
    </div>

    <div class="container mx-auto px-4 pt-24 lg:pt-32 max-w-7xl">
      
      <!-- Header Section -->
      <div class="text-center mb-16 animate-fade-down">
        <h1 class="text-4xl lg:text-6xl font-extrabold mb-6">
          <span class="text-slate-900 dark:text-white">Mes </span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Réalisations</span>
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Exploration de mes projets récents, du développement backend complexe aux interfaces utilisateur interactives.
        </p>
      </div>

      <!-- Filter Bar (Floating Glass) -->
      <div class="mb-12 sticky top-24 z-30 animate-fade-up">
        <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xl lg:flex lg:items-center lg:justify-between gap-4 space-y-4 lg:space-y-0">
          
          <!-- Search -->
          <div class="relative flex-grow max-w-md group">
            <Search class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" :size="20" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un projet..."
              class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all"
            >
          </div>

          <!-- Filters Group -->
          <div class="flex flex-col sm:flex-row gap-4">
            
            <!-- Category Select -->
            <div class="relative min-w-[200px]">
              <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Filter :size="16" class="text-slate-500" />
              </div>
              <select
                v-model="selectedCategory"
                class="w-full pl-10 pr-8 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="all">Toutes les catégories</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
              <ChevronDown class="absolute right-3 top-3.5 text-slate-400 pointer-events-none" :size="16" />
            </div>

            <!-- Tech Select -->
            <div class="relative min-w-[200px]">
              <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Code2 :size="16" class="text-slate-500" />
              </div>
              <select
                v-model="selectedTechnology"
                class="w-full pl-10 pr-8 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="all">Toutes les technologies</option>
                <option v-for="tech in technologies" :key="tech" :value="tech">
                  {{ tech }}
                </option>
              </select>
              <ChevronDown class="absolute right-3 top-3.5 text-slate-400 pointer-events-none" :size="16" />
            </div>

            <!-- Reset Button -->
            <button
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <X :size="18" />
              <span class="lg:hidden">Effacer</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
        v-if="filteredProjects.length > 0"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @viewDetails="viewProjectDetails"
        />
      </TransitionGroup>

      <!-- Empty State -->
      <div v-else class="text-center py-24 animate-fade-in">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
          <SearchX :size="32" class="text-slate-400" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucun projet trouvé</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-6">
          Essayez de modifier vos termes de recherche ou vos filtres.
        </p>
        <button
          @click="resetFilters"
          class="px-6 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-medium shadow-lg shadow-indigo-500/25"
        >
          Réinitialiser tout
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import ProjectCard from '../components/home/ProjectCard.vue';
import { projects } from '../data/projects';
import { Search, Filter, Code2, ChevronDown, X, SearchX } from 'lucide-vue-next';

const router = useRouter();

useHead({
  title: 'Réalisations - Chrislain AVOCEGAN',
  meta: [
    { name: 'description', content: 'Explorez le portfolio de projets de Chrislain AVOCEGAN : Applications web, APIs, et sites e-commerce.' }
  ]
});

// Données des projets : source unique dans src/data/projects.js
const allProjects = ref(projects);

// Filtres
const selectedCategory = ref('all');
const selectedTechnology = ref('all');
const searchQuery = ref('');

const categories = computed(() => {
  const cats = new Set();
  allProjects.value.forEach(project => cats.add(project.category));
  return Array.from(cats).sort();
});

const technologies = computed(() => {
  const techs = new Set();
  allProjects.value.forEach(project => {
    project.technologies.forEach(tech => techs.add(tech));
  });
  return Array.from(techs).sort();
});

const hasActiveFilters = computed(() => {
  return selectedCategory.value !== 'all' || selectedTechnology.value !== 'all' || searchQuery.value !== '';
});

const filteredProjects = computed(() => {
  return allProjects.value.filter(project => {
    const categoryMatch = selectedCategory.value === 'all' || project.category === selectedCategory.value;
    const techMatch = selectedTechnology.value === 'all' || project.technologies.includes(selectedTechnology.value);
    const searchMatch = searchQuery.value === '' ||
                       project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       project.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       project.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()));

    return categoryMatch && techMatch && searchMatch;
  });
});

const resetFilters = () => {
  selectedCategory.value = 'all';
  selectedTechnology.value = 'all';
  searchQuery.value = '';
};

const viewProjectDetails = (detailsLink) => {
  router.push(detailsLink);
};
</script>

<style scoped>
/* Animations de liste */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.list-leave-active {
  position: absolute;
}
</style>