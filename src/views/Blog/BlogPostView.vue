<template>
  <div class="relative min-h-screen pb-24">
    <div class="container mx-auto px-4 pt-24 lg:pt-32 max-w-3xl">
      <!-- Article introuvable -->
      <div v-if="!post" class="py-24 text-center">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">{{ t('blog.notFound.title') }}</h1>
        <p class="text-slate-500 dark:text-slate-400 mb-8">{{ t('blog.notFound.description') }}</p>
        <RouterLink
          to="/blog"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium"
        >
          <ArrowLeft :size="16" />
          {{ t('blog.backToBlog') }}
        </RouterLink>
      </div>

      <template v-else>
        <RouterLink
          to="/blog"
          class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-8"
        >
          <ArrowLeft :size="16" />
          {{ t('blog.backToBlog') }}
        </RouterLink>

        <header class="mb-10">
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium"
            >
              {{ tag }}
            </span>
          </div>

          <h1 class="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
            {{ post.title }}
          </h1>

          <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
            {{ post.description }}
          </p>

          <div class="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
            <time :datetime="post.date">{{ formatDate(post.date, locale) }}</time>
            <span aria-hidden="true">&bull;</span>
            <span>{{ post.readingTime }} {{ t('blog.readingTime') }}</span>
          </div>
        </header>

        <div class="article-body" v-html="post.html"></div>

        <!-- À lire ensuite -->
        <section v-if="related.length > 0" class="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">{{ t('blog.relatedPosts') }}</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <RouterLink
              v-for="item in related"
              :key="item.slug"
              :to="`/blog/${item.slug}`"
              class="group p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <h3 class="font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{{ item.description }}</p>
            </RouterLink>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { useBlog } from '../../composables/useBlog'

const props = defineProps({
  slug: { type: String, required: true },
})

const { t, locale } = useI18n()
const { getPost, getRelatedPosts, formatDate } = useBlog()

const post = computed(() => getPost(props.slug))
const related = computed(() => (post.value ? getRelatedPosts(props.slug) : []))

useHead({
  title: computed(() => (post.value ? `${post.value.title} - Chrislain Avocegan` : t('blog.notFound.title'))),
  meta: [{ name: 'description', content: computed(() => post.value?.description || '') }],
})
</script>

<style scoped>
/* Mise en forme du Markdown rendu (pas de plugin typography requis) */
.article-body {
  @apply text-slate-700 dark:text-slate-300 leading-relaxed;
}

.article-body :deep(h2) {
  @apply text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4;
}

.article-body :deep(h3) {
  @apply text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3;
}

.article-body :deep(p) {
  @apply mb-5;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  @apply mb-5 pl-6 space-y-2;
}

.article-body :deep(ul) {
  @apply list-disc;
}

.article-body :deep(ol) {
  @apply list-decimal;
}

.article-body :deep(strong) {
  @apply font-semibold text-slate-900 dark:text-white;
}

.article-body :deep(a) {
  @apply text-indigo-600 dark:text-indigo-400 underline underline-offset-2;
}

.article-body :deep(blockquote) {
  @apply border-l-4 border-indigo-400 pl-4 italic text-slate-600 dark:text-slate-400 my-6;
}

.article-body :deep(pre) {
  @apply bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-xl p-5 overflow-x-auto my-6 text-sm border border-slate-800;
}

.article-body :deep(pre code) {
  @apply bg-transparent p-0 text-inherit;
}

.article-body :deep(code) {
  @apply bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 rounded px-1.5 py-0.5 text-sm font-mono;
}

.article-body :deep(table) {
  @apply w-full my-6 text-sm border-collapse;
}

.article-body :deep(th) {
  @apply text-left font-semibold text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 py-2 px-3;
}

.article-body :deep(td) {
  @apply border-b border-slate-200 dark:border-slate-800 py-2 px-3;
}

.article-body :deep(hr) {
  @apply my-10 border-slate-200 dark:border-slate-800;
}

.article-body :deep(img) {
  @apply rounded-xl my-6 max-w-full;
}
</style>
