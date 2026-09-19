<template>
  <div class="text"></div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// Variable pour gérer la langue sélectionnée


// Définition de la classe TextScramble
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span>${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Variables réactives pour gérer l'animation et le contenu des phrases
const phrases = computed(() => [
  t('home.heroe.hi'),
  t('home.heroe.im'),
  t('home.heroe.fullName')
]);

const counter = ref(0);
const fx = ref(null);

// Fonction pour lancer le cycle des animations
const next = () => {
  if (counter.value < phrases.value.length) {
    if (fx.value) {
      fx.value.setText(phrases.value[counter.value]).then(() => {
        setTimeout(next, 1500);
      });
    }
    counter.value++;
  }
};

// Initialiser l'animation au montage du composant
onMounted(() => {
  fx.value = new TextScramble(document.querySelector('.text'));
  next();
});

// Watcher pour redémarrer l'animation à chaque changement de langue
watch(locale, () => {
  counter.value = 0;  // Réinitialiser le compteur
  if (fx.value) {
    fx.value.setText(phrases.value[counter.value]).then(() => {
      setTimeout(next, 2000);
    });
  }
});
</script>

<style scoped>
.text {
  @apply bg-gradient-to-r from-indigo-600 to-green-800 bg-clip-text text-transparent tracking-tight;
}
</style>
