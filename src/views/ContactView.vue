<template>
  <div
    class="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden font-sans">

    <!-- Background Ambient Effects -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 py-16 relative z-10 max-w-6xl">

      <!-- Header -->
      <div class="mb-12 text-center lg:text-left animate-fade-down">
        <h2 class="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
          <span class="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
            {{ t('contact.title') }}.
          </span>
        </h2>
        <p class="text-slate-600 dark:text-slate-400 text-lg max-w-2xl lg:mx-0 mx-auto">
          Un projet en tête ? Une question ? N'hésitez pas à me contacter.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

        <!-- Colonne Gauche : Informations (4 cols) -->
        <div class="lg:col-span-5 space-y-6 animate-fade-right">

          <!-- Contact Cards -->
          <div
            class="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles class="text-emerald-500" :size="24" />
              {{ t('contact.information.title') }}
            </h3>

            <div class="space-y-6">
              <!-- Email -->
              <a href="mailto:chrislainavocegan1@gmail.com"
                class="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800">
                <div
                  class="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Mail :size="24" />
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{{
                    t('contact.information.emailLabel') }}</p>
                  <p class="text-slate-900 dark:text-white font-semibold break-all">chrislainavocegan1@gmail.com</p>
                </div>
              </a>

              <!-- Phone & Whatsapp -->
              <div
                class="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 border border-transparent hover:border-emerald-100 dark:hover:border-emerald-800">
                <div
                  class="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone :size="24" />
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{{
                    t('contact.information.phoneLabel') }} / WhatsApp</p>
                  <p class="text-slate-900 dark:text-white font-semibold">+229 01 56 11 53 63</p>
                </div>
              </div>

              <!-- ComeUp -->
              <a href="https://comeup.com/fr/@chrislain-code" target="_blank" rel="noopener noreferrer"
                class="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 border border-transparent hover:border-red-100 dark:hover:border-red-800">
                <div
                  class="bg-red-100 dark:bg-red-900/50 p-3 rounded-xl text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                  <ExternalLink :size="24" />
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{{
                    t('contact.information.comeUpLabel') }}</p>
                  <p
                    class="text-slate-900 dark:text-white font-semibold group-hover:underline decoration-red-500 underline-offset-4">
                    Visiter mon profil ComeUp</p>
                </div>
              </a>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p class="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex items-start gap-2">
                <ShieldCheck :size="16" class="shrink-0 text-emerald-500" />
                <span v-html="t('contact.information.securityMessage')"></span>
              </p>
            </div>
          </div>
        </div>

        <!-- Colonne Droite : Formulaire (8 cols) -->
        <div class="lg:col-span-7 animate-fade-left">
          <div
            class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-200 dark:border-slate-800 relative overflow-hidden">

            <!-- Décoration interne -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full"></div>

            <form @submit.prevent="handleSubmit" class="space-y-6 relative z-10">

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name Input -->
                <div class="space-y-2">
                  <label for="name" class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                    {{ t('contact.form.nameLabel') }}
                  </label>
                  <div class="relative group">
                    <User
                      class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                      :size="20" />
                    <input type="text" id="name" v-model="formData.name" required
                      class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="John Doe" />
                  </div>
                </div>

                <!-- Email Input -->
                <div class="space-y-2">
                  <label for="email" class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                    {{ t('contact.form.emailLabel') }}
                  </label>
                  <div class="relative group">
                    <AtSign
                      class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                      :size="20" />
                    <input type="email" id="email" v-model="formData.email" required
                      class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="john@example.com" />
                  </div>
                </div>
              </div>

              <!-- Message Input -->
              <div class="space-y-2">
                <label for="message" class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  {{ t('contact.form.messageLabel') }}
                </label>
                <div class="relative group">
                  <MessageSquare
                    class="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                    :size="20" />
                  <textarea id="message" v-model="formData.message" required
                    class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-4 h-40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 resize-none"
                    placeholder="Votre message ici..."></textarea>
                </div>
              </div>

              <!-- Submit Button & Alerts -->
              <div class="pt-4">
                <button type="submit" :disabled="isLoading"
                  class="w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                  <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
                  <Send v-else :size="20" />
                  <span>{{ isLoading ? t('contact.form.sendingButton') : t('contact.form.sendButton') }}</span>
                </button>
              </div>

              <!-- Alerts -->
              <transition enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <div v-if="success"
                  class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-6 py-4 rounded-xl flex items-center gap-3 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 :size="20" />
                  <p class="font-medium">{{ t('contact.form.successMessage') }}</p>
                </div>
              </transition>

              <transition enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100">
                <div v-if="error"
                  class="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-6 py-4 rounded-xl flex items-center gap-3 border border-red-200 dark:border-red-800">
                  <AlertCircle :size="20" />
                  <p class="font-medium">Une erreur est survenue. Veuillez réessayer.</p>
                </div>
              </transition>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import emailjs from "emailjs-com"
import { useI18n } from "vue-i18n"
import { useHead } from '@vueuse/head'
import {
  Mail, Phone, ExternalLink, Sparkles, ShieldCheck,
  User, AtSign, MessageSquare, Send, Loader2,
  CheckCircle2, AlertCircle
} from 'lucide-vue-next'

const { t } = useI18n()

// Données du formulaire
const formData = ref({
  name: "",
  email: "",
  message: "",
});

// États
const isLoading = ref(false);
const success = ref(false);
const error = ref(false);

const handleSubmit = () => {
  isLoading.value = true;
  success.value = false;
  error.value = false;

  emailjs
    .send(
      "service_l3hiz3b",
      "template_ik22uc1",
      formData.value,
      "wYSc5hqM1T8_k1WQW"
    )
    .then(
      () => {
        success.value = true;
        formData.value = { name: "", email: "", message: "" };
        setTimeout(() => {
          success.value = false;
        }, 5000);
      },
      (err) => {
        console.error("Erreur :", err);
        error.value = true;
      }
    )
    .finally(() => {
      isLoading.value = false;
    });
};

useHead({
  title: 'Contact - Chrislain AVOCEGAN',
  meta: [
    {
      name: 'description',
      content: 'Contactez Chrislain AVOCEGAN, développeur web full stack spécialisé en Laravel, Vue.js, et Tailwind CSS. Posez vos questions ou collaborez sur vos projets web.'
    },
    {
      name: 'keywords',
      content: 'Contact, Chrislain AVOCEGAN, Laravel, Spring Boot, Vue.js, React, Développeur Full-Stack, Cotonou, Bénin'
    },
    {
      property: 'og:title',
      content: 'Contact - Chrislain AVOCEGAN'
    },
    {
      property: 'og:description',
      content: 'Prenez contact avec Chrislain AVOCEGAN pour discuter de vos besoins en développement web et découvrir comment il peut vous aider à atteindre vos objectifs.'
    },
    {
      property: 'og:image',
      content: 'https://chrislain-portfolio.vercel.app/preview-image.png'
    },
    {
      property: 'og:url',
      content: 'https://chrislain-portfolio.vercel.app/contact'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'author',
      content: 'Chrislain AVOCEGAN'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ]
});
</script>
