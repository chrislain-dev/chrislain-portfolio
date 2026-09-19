<template>
  <div class="relative min-h-screen pb-20 overflow-hidden">
    <!-- Halos d'ambiance -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
    </div>

    <div class="container mx-auto px-4 pt-24 lg:pt-32 max-w-6xl">
      <!-- En-tête -->
      <header class="mb-14 max-w-2xl">
        <h1 class="text-4xl lg:text-6xl font-extrabold mb-5">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
            {{ t('blog.title') }}
          </span>
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {{ t('blog.subtitle') }}
        </p>
      </header>

      <!-- Aucun article publié -->
      <div v-if="allPosts.length === 0" class="py-24 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-5">
          <PenLine :size="26" class="text-slate-400" />
        </div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ t('blog.empty.title') }}</h2>
        <p class="text-slate-500 dark:text-slate-400">{{ t('blog.empty.description') }}</p>
      </div>

      <template v-else>
        <!-- Recherche + sujets -->
        <div class="mb-10 space-y-5">
          <div class="relative max-w-md">
            <Search class="absolute left-4 top-3.5 text-slate-400" :size="18" />
            <input
              v-model="searchQuery"
              type="search"
              :placeholder="t('blog.search')"
              class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              @click="selectedTag = null"
              class="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
              :class="selectedTag === null
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                : 'bg-transparent text-slate-600 border-slate-200 hover:bg-slate-100 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800'"
            >
              {{ t('blog.allTags') }}
            </button>
            <button
              v-for="tag in tags"
              :key="tag.name"
              type="button"
              @click="selectedTag = selectedTag === tag.name ? null : tag.name"
              class="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
              :class="selectedTag === tag.name
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                : 'bg-transparent text-slate-600 border-slate-200 hover:bg-slate-100 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800'"
            >
              {{ tag.name }}
              <span class="ml-1 text-xs opacity-60">{{ tag.count }}</span>
            </button>
          </div>
        </div>

        <!-- Liste des articles -->
        <div v-if="filteredPosts.length > 0" class="grid gap-6 md:grid-cols-2">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
          >
            <RouterLink :to="`/blog/${post.slug}`" class="flex flex-col h-full">
              <div v-if="post.cover" class="h-40 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-8">
                <img :src="post.cover" :alt="''" aria-hidden="true" class="h-full max-h-24 object-contain" loading="lazy" />
              </div>

              <div class="flex flex-col flex-1 p-6">
                <div class="flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium"
                  >
                    {{ tag }}
                  </span>
                </div>

                <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {{ post.title }}
                </h2>

                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 flex-1">
                  {{ post.description }}
                </p>

                <div class="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <time :datetime="post.date">{{ formatDate(post.date, locale) }}</time>
                  <span aria-hidden="true">&bull;</span>
                  <span>{{ post.readingTime }} {{ t('blog.readingTime') }}</span>
                </div>
              </div>
            </RouterLink>
          </article>
        </div>

        <!-- Aucun résultat -->
        <div v-else class="py-20 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-5">
            <SearchX :size="26" class="text-slate-400" />
          </div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ t('blog.noResults.title') }}</h2>
          <p class="text-slate-500 dark:text-slate-400 mb-6">{{ t('blog.noResults.description') }}</p>
          <button
            type="button"
            @click="resetFilters"
            class="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            {{ t('blog.noResults.reset') }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router'
import { Search, SearchX, PenLine } from 'lucide-vue-next'
import { useBlog } from '../../composables/useBlog'

const { t, locale } = useI18n()
const { allPosts, tags, formatDate } = useBlog()

const searchQuery = ref('')
const selectedTag = ref(null)

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return allPosts.value.filter((post) => {
    const matchesTag = !selectedTag.value || post.tags.includes(selectedTag.value)
    const matchesQuery =
      query === '' ||
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))

    return matchesTag && matchesQuery
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedTag.value = null
}

useHead({
  title: computed(() => `${t('blog.title')} - Chrislain Avocegan`),
  meta: [{ name: 'description', content: computed(() => t('blog.subtitle')) }],
})
</script>
