<template>
  <!-- Main Floating Navbar Container -->
  <header class="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center animate-fade-down">
    <nav
      class="w-full max-w-5xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2.5 flex items-center justify-between">
      
      <!-- Logo -->
      <RouterLink to="/" class="flex-shrink-0 ml-2 hover:scale-105 transition-transform" aria-label="Retour à l'accueil">
        <img :src="`/assets/images/chrislain-${theme}-logo.png`" 
             alt="Logo" 
             class="w-8 h-8 object-contain" />
      </RouterLink>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
        <li v-for="link in navLinks" :key="link.path">
          <RouterLink 
            :to="link.path"
            class="relative px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300"
            :class="isActive(link.path) 
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50'"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- Right Actions (Theme, Lang, Mobile Toggle) -->
      <div class="flex items-center gap-2">
        
        <!-- Language Switcher -->
        <div class="relative group">
          <button 
            @click="toggleDropdown" 
            class="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
          >
             <img :src="locales === 'en' ? '/assets/images/flag-usa.svg' : '/assets/images/flag-france.svg'" 
                  class="w-5 h-5 rounded-full object-cover shadow-sm" alt="Lang" />
             <ChevronDown :size="14" class="opacity-50" />
          </button>

          <!-- Dropdown -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="dropdownOpen" class="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden py-1">
              <button 
                v-for="lang in ['fr', 'en']" 
                :key="lang"
                @click="changeLanguage(lang)"
                class="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                :class="locales === lang ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-slate-600 dark:text-slate-300'"
              >
                <img :src="lang === 'en' ? '/assets/images/flag-usa.svg' : '/assets/images/flag-france.svg'" class="w-4 h-4 rounded-full" />
                {{ lang === 'en' ? 'English' : 'Français' }}
              </button>
            </div>
          </Transition>
        </div>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          :aria-label="theme === 'dark' ? 'Mode clair' : 'Mode sombre'"
        >
          <Sun v-if="theme === 'dark'" :size="20" class="text-yellow-400" />
          <Moon v-else :size="20" class="text-indigo-600" />
        </button>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden p-2 rounded-full text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Menu v-if="!mobileMenuOpen" :size="20" />
          <X v-else :size="20" />
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-10 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-10 opacity-0"
  >
    <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6">
      <nav class="flex flex-col gap-2">
        <RouterLink 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          @click="mobileMenuOpen = false"
          class="p-4 rounded-xl text-lg font-medium transition-all"
          :class="isActive(link.path) 
            ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          <div class="flex items-center gap-3">
             <component :is="link.icon" :size="20" />
             {{ link.label }}
          </div>
        </RouterLink>
      </nav>
      
      <div class="mt-auto mb-8 text-center text-xs text-slate-400">
        &copy; {{ new Date().getFullYear() }} Chrislain AVOCEGAN
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { 
  Menu, X, Sun, Moon, ChevronDown, 
  Home, User, FileText, Send, Terminal, Layers 
} from 'lucide-vue-next';

const { t, locale } = useI18n();
const route = useRoute();

const theme = ref(localStorage.getItem('theme') || 'light');
const dropdownOpen = ref(false);
const mobileMenuOpen = ref(false);
const locales = ref(locale.value);

// Navigation Data
const navLinks = computed(() => {
  return [
    { path: '/', label: t('home.navBar.home'), icon: Home },
    { path: '/about', label: t('home.navBar.about'), icon: User },
    { path: '/works', label: t('home.navBar.works'), icon: Layers },
    { path: '/blog', label: t('home.navBar.blog'), icon: Terminal },
    { path: '/resume', label: t('home.navBar.resume'), icon: FileText },
    { path: '/contact', label: t('home.navBar.contact'), icon: Send },
  ];
});

// Helpers
const isActive = (path) => route.path === path;

const toggleDropdown = () => { dropdownOpen.value = !dropdownOpen.value; };

const toggleMobileMenu = () => { 
  mobileMenuOpen.value = !mobileMenuOpen.value; 
  // Prevent scrolling when menu is open
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const changeLanguage = (selectedLang) => { 
  locale.value = selectedLang; 
  locales.value = selectedLang; 
  dropdownOpen.value = false;
};

const toggleTheme = () => { 
  theme.value = theme.value === 'dark' ? 'light' : 'dark'; 
  document.body.className = theme.value; 
  localStorage.setItem('theme', theme.value); 
};

// Close dropdown when clicking outside (simple implementation)
onMounted(() => { 
  changeLanguage(locales.value); 
  document.body.className = theme.value;

  window.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.group')) {
      dropdownOpen.value = false;
    }
  });
});

// Reset overflow if screen resized while menu open
watch(mobileMenuOpen, (val) => {
   if (!val) document.body.style.overflow = '';
});
</script>