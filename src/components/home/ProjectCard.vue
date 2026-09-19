<template>
  <div class="group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
    
    <!-- Image Container with Overlay -->
    <div class="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img 
        :src="project.image" 
        :alt="project.title" 
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        @error="handleImageError"
      />
      
      <!-- Overlay Gradient (Darkens on hover) -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
      
      <!-- Tag -->
      <div class="absolute top-4 right-4">
        <span class="px-3 py-1 text-xs font-semibold tracking-wide text-white bg-white/20 backdrop-blur-md border border-white/20 rounded-full shadow-sm">
          {{ project.tag }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 p-6 flex flex-col">
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {{ project.title }}
        </h3>
        <!-- Dynamic Icon mapping if needed, or static -->
        <component :is="getIcon(project.icon)" class="text-slate-400" :size="20" />
      </div>
      
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 flex-grow">
        {{ project.description }}
      </p>

      <!-- Actions -->
      <div class="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <a v-if="project.link && project.link !== '#'" 
           :href="project.link" 
           target="_blank" 
           rel="noopener noreferrer"
           class="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-colors">
          <span>Visiter</span>
          <ExternalLink :size="14" />
        </a>
        
        <button 
           @click="$emit('viewDetails', project.detailsLink)"
           class="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <span>Détails</span>
          <Info :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ExternalLink, Info, LayoutDashboard, Database, Globe, Smartphone, ShoppingBag,
  Package, Server, Briefcase, Calendar, Building2, Sparkles
} from 'lucide-vue-next'

defineProps({
  project: { type: Object, required: true }
});

defineEmits(['viewDetails']);

// Image de repli si la capture du projet n'est pas (ou plus) disponible
const handleImageError = (event) => {
  if (event.target.src.includes('coming_soon')) return
  event.target.src = '/assets/images/coming_soon.webp'
};

// Helper simple pour mapper les string icons vers les composants Lucide
const getIcon = (name) => {
  const icons = {
    'LayoutDashboard': LayoutDashboard,
    'Database': Database,
    'Globe': Globe,
    'Smartphone': Smartphone,
    'ShoppingBag': ShoppingBag,
    'Package': Package,
    'Server': Server,
    'Briefcase': Briefcase,
    'Calendar': Calendar,
    'Building2': Building2,
    'Sparkles': Sparkles
  };
  return icons[name] || Globe; // Fallback
};
</script>