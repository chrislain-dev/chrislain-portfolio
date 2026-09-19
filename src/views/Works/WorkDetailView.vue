<template>
  <section class="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden font-sans">
    
    <!-- Background Ambient Effects -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl relative z-10">
      
      <!-- Navigation (Back Button) -->
      <button
        @click="router.go(-1)"
        class="group mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 transition-all duration-300"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span class="text-sm font-medium">Retour aux projets</span>
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p class="text-slate-500 dark:text-slate-400 animate-pulse">Chargement du projet...</p>
      </div>

      <!-- Project Content -->
      <div v-else-if="project" class="animate-fade-up">
        
        <!-- Header Section -->
        <div class="mb-10">
          <div class="flex flex-wrap items-center gap-3 mb-4">
             <span class="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
               {{ project.category }}
             </span>
             <span v-if="project.tags.includes('Backend')" class="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
               Backend
             </span>
          </div>
          
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            {{ project.title }}
          </h1>
        </div>

        <!-- Featured Image -->
        <div class="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-12 bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Left Column: Description (8 cols) -->
          <div class="lg:col-span-8 space-y-12">
            
            <!-- Description Block -->
            <div class="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 class="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white mb-6">
                <FileText class="text-indigo-500" />
                À propos du projet
              </h2>
              
              <!-- Custom prose styling for the v-html content -->
              <div 
                class="prose dark:prose-invert prose-slate max-w-none prose-p:leading-relaxed prose-li:marker:text-indigo-500 prose-strong:text-indigo-600 dark:prose-strong:text-indigo-400"
                v-html="formatDescription(project.description)">
              </div>
            </div>

            <!-- Screenshots / Gallery Placeholder (Optional) -->
            <!-- Vous pourrez ajouter une galerie ici plus tard -->

          </div>

          <!-- Right Column: Sidebar Info (4 cols) -->
          <div class="lg:col-span-4">
            <div class="sticky top-8 space-y-6">
              
              <!-- Key Info Card -->
              <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                  Fiche Technique
                </h3>
                
                <ul class="space-y-4">
                  <li class="flex items-start justify-between">
                    <span class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                      <Monitor class="w-4 h-4" /> Plateforme
                    </span>
                    <span class="font-medium text-slate-900 dark:text-white text-right">{{ project.siteName }}</span>
                  </li>
                  <li class="flex items-start justify-between">
                    <span class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                      <Layers class="w-4 h-4" /> Catégorie
                    </span>
                    <span class="font-medium text-slate-900 dark:text-white text-right">{{ project.category }}</span>
                  </li>
                </ul>

                <!-- Visit Button -->
                <div v-if="project.link && project.link !== '#'" class="mt-8">
                  <a
                    :href="project.link"
                    target="_blank"
                    class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                  >
                    Visiter le site
                    <ExternalLink class="w-4 h-4" />
                  </a>
                </div>
              </div>

              <!-- Tech Stack Card -->
              <div class="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                 <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                   <Code2 class="w-5 h-5 text-emerald-500" />
                   Technologies
                 </h3>
                 <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in project.technologies"
                      :key="tech"
                      class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {{ tech }}
                    </span>
                 </div>
              </div>

              <!-- Tags Card -->
              <div class="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                 <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                   <Tag class="w-5 h-5 text-pink-500" />
                   Mots-clés
                 </h3>
                 <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in project.tags"
                      :key="tag"
                      class="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded border border-slate-100 dark:border-slate-700"
                    >
                      #{{ tag }}
                    </span>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-24">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Projet introuvable</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8">Le projet que vous recherchez semble ne pas exister ou a été déplacé.</p>
        <button
          @click="router.push('/works')"
          class="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium"
        >
          Retour au portfolio
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import { ArrowLeft, ExternalLink, Code2, Tag, Layers, Monitor, FileText } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const project = ref(null);
const loading = ref(true);

// Fonction pour nettoyer un peu le HTML brut si nécessaire
const formatDescription = (desc) => {
  // On remplace les sauts de ligne simples par des marges pour la lisibilité
  return desc.replace(/<br\/?>/g, '<br/>');
};

const projects = ref([
  {
    id: 1,
    slug: "amazone_tchad",
    title: "Amazone Tchad - Dashboard Admin",
    siteName: "Amazone Tchad",
    description: `
      <p>Développement d'une plateforme de réservation complète orchestrée avec <strong>Laravel 10</strong> et <strong>Vue.js 3</strong> (via Inertia.js), conçue pour gérer un flux complexe de réservations multiservices.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Côté client (Front-Office)</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Système unifié de réservation (Vols, Véhicules, Hôtels)</li>
        <li>Formulaires dynamiques multi-étapes avec validation temps réel</li>
        <li>Paiement sécurisé intégré et espace client pour l'historique</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Dashboard Administrateur (Back-Office)</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Tableau de bord décisionnel avec KPIs et graphiques interactifs</li>
        <li>Workflow de validation des réservations (Vue Kanban)</li>
        <li>Système de notification omnicanal (Email + SMS via Twilio)</li>
        <li>Gestion granulaire des rôles et permissions (RBAC)</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Architecture Backend</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>API RESTful sécurisée avec Laravel Sanctum</li>
        <li>Traitement asynchrone via Laravel Queue (Redis) pour les notifications</li>
        <li>Monitoring applicatif avec Laravel Telescope</li>
      </ul>
    `,
    image: "/assets/images/amazone.png",
    tag: "Laravel & Vue.js",
    tags: ["Dashboard", "Backoffice", "Administration", "SaaS"],
    technologies: ["Laravel 10", "Vue.js 3", "Tailwind CSS", "Inertia.js", "MySQL"],
    category: "Application Web",
    link: "https://amazone-tchad.com/",
    detailsLink: "/work/amazone_tchad",
  },
  {
    id: 2,
    slug: "school_management",
    title: "API School Management",
    siteName: "School Management API",
    description: `
      <p>Conception et développement d'une API RESTful robuste dédiée à la digitalisation des processus scolaires. Cette solution backend sert de moteur pour des applications web et mobiles.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Modules Fonctionnels</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Gestion Académique :</strong> Fiches élèves, inscriptions, historique scolaire.</li>
        <li><strong>Ressources Humaines :</strong> Gestion des professeurs, affectations aux classes et matières.</li>
        <li><strong>Planification :</strong> Génération et gestion des emplois du temps complexes.</li>
        <li><strong>Évaluation :</strong> Système de notes, bulletins automatiques et calculs de moyennes pondérées.</li>
        <li><strong>Discipline :</strong> Suivi des absences, retards et sanctions.</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Stack Technique</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Core :</strong> Laravel 10 avec Architecture Service-Repository.</li>
        <li><strong>Sécurité :</strong> Authentification JWT via Laravel Sanctum.</li>
        <li><strong>Performance :</strong> Caching Redis pour les requêtes fréquentes.</li>
        <li><strong>Exports :</strong> Génération de PDF et Excel (Laravel Excel/Snappy).</li>
        <li><strong>Qualité :</strong> Tests unitaires et fonctionnels (Pest/PHPUnit).</li>
      </ul>
    `,
    image: "https://placehold.co/600x400?text=School+Managment+API",
    tag: "API Laravel",
    tags: ["Education", "Backend", "REST API", "Microservices"],
    technologies: ["Laravel", "MySQL", "Redis", "Docker", "JWT"],
    category: "API Backend",
    link: "#",
    detailsLink: "/work/school_management",
  },
  {
    id: 3,
    slug: "fsppi",
    title: "Site FSPPI",
    siteName: "FSPPI",
    description: `
      <p>Modernisation complète de l'identité numérique de la <strong>Fédération des Sociétés Philatéliques de la Côte d'Ivoire</strong>. Le projet visait à migrer une infrastructure vieillissante vers une SPA (Single Page Application) performante.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Challenges & Réalisations</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Refonte totale de l'UI/UX pour une meilleure accessibilité (WCAG 2.1).</li>
        <li>Développement d'une galerie philatélique virtuelle haute résolution.</li>
        <li>Mise en place d'un système de filtrage avancé pour les collections.</li>
        <li>Espace membre pour la gestion des collections privées.</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Technologies</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Frontend :</strong> Angular v15+ avec TypeScript.</li>
        <li><strong>Design System :</strong> Angular Material & SCSS custom.</li>
        <li><strong>State Management :</strong> NgRx pour la gestion des données complexes.</li>
        <li><strong>Optimisation :</strong> Lazy Loading, format WebP, stratégie de caching PWA.</li>
      </ul>
    `,
    image: "/assets/images/fsppi.PNG",
    tag: "Angular",
    tags: ["Association", "Frontend", "SPA", "UI/UX"],
    technologies: ["Angular", "TypeScript", "SCSS", "RxJS"],
    category: "Site Web",
    link: "https://fsppi.org/",
    detailsLink: "/work/fsppi",
  },
  {
    id: 4,
    slug: "future_transport_expo",
    title: "Future Transport Expo",
    siteName: "Future Transport Expo",
    description: `
      <p>Plateforme événementielle intégrée pour un salon international dédié aux innovations dans les transports. Le site gère l'ensemble du cycle de vie de l'événement, de la promotion à la vente de billets.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Écosystème Événementiel</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Billetterie :</strong> Vente de pass en ligne avec QR Code (Woocommerce/Event Tickets).</li>
        <li><strong>Exposants :</strong> Espace dédié avec catalogue digital et prise de RDV B2B.</li>
        <li><strong>Programme :</strong> Agenda interactif des conférences avec filtres par thématique.</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Intégrations Techniques</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Développement de widgets Elementor sur-mesure.</li>
        <li>Synchronisation des leads avec CRM (HubSpot).</li>
        <li>Optimisation SEO pour le référencement international.</li>
      </ul>
    `,
    image: "/assets/images/fte.png",
    tag: "WordPress",
    tags: ["Événementiel", "Billetterie", "B2B"],
    technologies: ["WordPress", "WooCommerce", "Elementor Pro", "PHP"],
    category: "Site Événementiel",
    link: "https://futuretransportexpo.com",
    detailsLink: "/work/future_transport_expo",
  },
  {
    id: 5,
    slug: "gie_holding_group",
    title: "GIE Holding Group Diama",
    siteName: "GIE Holding Group",
    description: `
      <p>Portail institutionnel multilingue conçu pour présenter la structure complexe d'un groupe holding et de ses diverses filiales à travers l'Afrique.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Architecture de Contenu</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Système multi-sites/multi-langues (WPML) pour une portée internationale.</li>
        <li>Pages dynamiques pour chaque filiale avec charte graphique adaptée.</li>
        <li>Section "Investisseurs" avec accès aux rapports annuels sécurisés.</li>
        <li>Carte interactive des implantations géographiques.</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Stack</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>WordPress CMS avec Advanced Custom Fields (ACF).</li>
        <li>Thème enfant customisé sur base Divi.</li>
        <li>Optimisation poussée (WP Rocket, CDN Cloudflare).</li>
      </ul>
    `,
    image: "/assets/images/giehgd.png",
    tag: "WordPress",
    tags: ["Corporate", "Vitrine", "Finance"],
    technologies: ["WordPress", "ACF", "Divi", "WPML"],
    category: "Site Institutionnel",
    link: "https://gieholdinggroupdiama.com",
    detailsLink: "/work/gie_holding_group",
  },
  {
    id: 6,
    slug: "fiesta_restaurant",
    title: "Restaurant Fiesta - Dakar",
    siteName: "Fiesta Restaurant",
    description: `
      <p>Vitrine digitale immersive pour un restaurant gastronomique, axée sur la séduction visuelle et la conversion (réservation de tables).</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Expérience Utilisateur</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Design "Mobile First" pour une utilisation fluide sur smartphone.</li>
        <li>Menu digital interactif filtrable (Allergènes, Végétarien).</li>
        <li>Module de réservation de table en temps réel (Bookly).</li>
        <li>Intégration dynamique des avis Google Reviews et TripAdvisor.</li>
      </ul>
    `,
    image: "https://placehold.co/600x400?text=Restaurant+Fiesta",
    tag: "WordPress",
    tags: ["Restaurant", "Gastronomie", "Local Business"],
    technologies: ["WordPress", "Elementor", "CSS3 Animation"],
    category: "Site Vitrine",
    link: "#",
    detailsLink: "/work/fiesta_restaurant",
  },
  {
    id: 7,
    slug: "ovaticket",
    title: "OvaTicket - API",
    siteName: "OvaTicket",
    description: `
      <p>Backend performant pour une plateforme SaaS de billetterie événementielle capable de gérer des pics de trafic importants lors des mises en vente.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Fonctionnalités Core</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Gestion d'événements complexes (Multi-dates, Multi-lieux).</li>
        <li>Génération de billets PDF avec QR Codes chiffrés.</li>
        <li>Passerelles de paiement intégrées (Stripe, PayPal, Mobile Money).</li>
        <li>Système de contrôle d'accès (Scan App API).</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Architecture</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Runtime :</strong> Node.js avec Express.js.</li>
        <li><strong>Database :</strong> MongoDB pour la flexibilité des schémas événements.</li>
        <li><strong>Scalabilité :</strong> Architecture Microservices ready.</li>
      </ul>
    `,
    image: "https://placehold.co/600x400?text=Ova+Ticket",
    tag: "Node.js API",
    tags: ["Billetterie", "Backend", "SaaS"],
    technologies: ["Node.js", "Express", "MongoDB", "Stripe API"],
    category: "API / SaaS",
    link: "#",
    detailsLink: "/work/ovaticket",
  },
  {
    id: 8,
    slug: "lassissi_itech",
    title: "LASSISSI iTech",
    siteName: "LASSISSI iTech",
    description: `
      <p>Plateforme e-commerce B2C spécialisée dans la vente de produits High-Tech. L'accent a été mis sur la confiance utilisateur et la facilité de commande.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Fonctionnalités E-commerce</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Catalogue produits avec filtres à facettes (Marque, Specs, Prix).</li>
        <li>Comparateur de produits techniques.</li>
        <li>Checkout optimisé en une page (One Page Checkout).</li>
        <li>Intégration des paiements locaux (Orange Money, Wave).</li>
      </ul>
    `,
    image: "/assets/images/lassissi-itech.PNG",
    tag: "E-commerce",
    tags: ["Mobile", "Vente en ligne", "Retail"],
    technologies: ["Laravel", "Vue.js", "MySQL"],
    category: "E-commerce",
    link: "#",
    detailsLink: "/work/lassissi_itech",
  },
  {
    id: 9,
    slug: "byl_in",
    title: "Byl In - Mode Africaine",
    siteName: "Byl In",
    description: `
      <p>Marketplace multi-vendeurs dédiée à la mode et à l'artisanat africain, connectant créateurs locaux et acheteurs internationaux.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Pour les Acheteurs</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Découverte par région ou type d'artisanat.</li>
        <li>Paiements multi-devises sécurisés.</li>
        <li>Suivi de colis international.</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Pour les Vendeurs (Vendor Dashboard)</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Gestion autonome des stocks et produits.</li>
        <li>Outils d'analyse des ventes et revenus.</li>
        <li>Génération automatique des étiquettes d'expédition.</li>
      </ul>
    `,
    image: "/assets/images/byl-in.PNG",
    tag: "E-commerce",
    tags: ["Mode", "Artisanat", "Marketplace"],
    technologies: ["Laravel", "Vue.js", "Stripe Connect", "AWS S3"],
    category: "Marketplace",
    link: "#",
    detailsLink: "/work/byl_in",
  },
  {
    id: 10,
    slug: "glory_spa",
    title: "Glory Spa & Beauté",
    siteName: "Glory Spa",
    description: `
      <p>Site expérientiel pour un Spa de luxe. L'objectif était de retranscrire l'ambiance relaxante de l'établissement à travers l'interface web.</p>
      
      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Fonctionnalités</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Design épuré et animations douces (GSAP).</li>
        <li>Prise de rendez-vous synchronisée avec le planning du personnel.</li>
        <li>Vente de cartes cadeaux en ligne.</li>
        <li>Blog conseils beauté et bien-être.</li>
      </ul>
    `,
    image: "/assets/images/glory-spa.PNG",
    tag: "WordPress",
    tags: ["Beauté", "Wellness", "Luxe"],
    technologies: ["WordPress", "GSAP", "Booking System"],
    category: "Site Vitrine",
    link: "#",
    detailsLink: "/work/glory_spa",
  },
  {
    id: 11,
    slug: "stock_management",
    title: "Application de Gestion de Stock",
    siteName: "Gestion de Stock",
    description: `
      <p>Application de suivi de stock conçue pour des commerces et petites structures qui géraient jusque-là leur inventaire sur papier ou tableur. L'enjeu principal : un stock affiché toujours justifiable, mouvement par mouvement.</p>

      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Fonctionnalités</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Enregistrement des entrées et sorties avec motif et utilisateur responsable</li>
        <li>Inventaire par dépôt et historique complet par produit</li>
        <li>Alertes automatiques de seuil minimum</li>
        <li>Rapports de mouvements exportables en Excel et PDF</li>
        <li>Gestion des rôles : gérant, magasinier, consultation seule</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Choix techniques</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Modélisation événementielle : le stock est calculé à partir des mouvements, jamais stocké tel quel</li>
        <li>Transactions et verrous en base pour éviter les stocks négatifs en accès concurrent</li>
        <li>Interface Vue.js pensée pour la saisie rapide au clavier</li>
      </ul>
    `,
    image: "/assets/images/coming_soon.webp",
    tag: "Laravel & Vue.js",
    tags: ["Gestion", "Métier", "Inventaire"],
    technologies: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
    category: "Application Web",
    link: "#",
    detailsLink: "/work/stock_management",
  },
  {
    id: 12,
    slug: "springboot_api",
    title: "API métier Spring Boot",
    siteName: "API Spring Boot",
    description: `
      <p>API REST servant de socle à une application de gestion interne : elle centralise les données métier et alimente à la fois une interface web React et des exports automatisés.</p>

      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Fonctionnalités</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Authentification JWT et gestion fine des rôles</li>
        <li>Endpoints versionnés et documentés avec Swagger / OpenAPI</li>
        <li>Validation des entrées et gestion centralisée des erreurs</li>
        <li>Pagination, filtres et tri sur l'ensemble des ressources</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Architecture</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Découpage strict contrôleur / service / repository, avec DTO en entrée et en sortie</li>
        <li>Spring Data JPA et requêtes optimisées pour éviter les N+1</li>
        <li>Conteneurisation Docker pour aligner les environnements</li>
      </ul>
    `,
    image: "/assets/images/coming_soon.webp",
    tag: "Spring Boot",
    tags: ["Backend", "REST API", "Java"],
    technologies: ["Spring Boot", "Java", "PostgreSQL", "Docker"],
    category: "API",
    link: "#",
    detailsLink: "/work/springboot_api",
  },
  {
    id: 13,
    slug: "vitrine_tpe",
    title: "Sites vitrines pour TPE",
    siteName: "Sites vitrines TPE",
    description: `
      <p>Série de sites de présentation réalisés pour de petites entreprises et des indépendants. Même objectif à chaque fois : être trouvable, inspirer confiance, et rester modifiable par le client sans développeur.</p>

      <h4 class="text-lg font-semibold mt-6 mb-2">✔ Ce que comprend chaque site</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Pages services, réalisations et contact, adaptées au métier du client</li>
        <li>Back-office simple pour modifier textes, images et coordonnées</li>
        <li>Formulaire de contact relié à l'e-mail et à WhatsApp</li>
        <li>Optimisation SEO de base et temps de chargement soignés</li>
        <li>Affichage mobile traité en priorité</li>
      </ul>

      <h4 class="text-lg font-semibold mt-6 mb-2">⚙ Accompagnement</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Recueil du besoin et cadrage du contenu avec le client</li>
        <li>Mise en ligne, nom de domaine et prise en main du back-office</li>
      </ul>
    `,
    image: "/assets/images/coming_soon.webp",
    tag: "Site vitrine",
    tags: ["Vitrine", "TPE", "Back-office"],
    technologies: ["Laravel", "Tailwind CSS", "Alpine.js"],
    category: "Site Vitrine",
    link: "#",
    detailsLink: "/work/vitrine_tpe",
  }
]);

onMounted(() => {
  const slug = route.params.slug;
  project.value = projects.value.find(p => p.slug === slug || p.detailsLink === `/work/${slug}`);
  loading.value = false;

  if (project.value) {
    // SEO dynamique
    useHead({
      title: `${project.value.title} - Portfolio`,
      meta: [
        { name: 'description', content: `Détails du projet ${project.value.title} réalisé avec ${project.value.technologies.join(', ')}.` }
      ]
    });
  } else {
    setTimeout(() => router.push('/404'), 2000);
  }
});
</script>

<style scoped>
/* Styles additionnels pour la prose si Tailwind Typography n'est pas installé */
:deep(.prose h4) {
  @apply text-slate-900 dark:text-white mt-6 mb-3 font-bold;
}
:deep(.prose p) {
  @apply text-slate-600 dark:text-slate-300 mb-4 leading-relaxed;
}
:deep(.prose ul) {
  @apply list-disc pl-5 space-y-2 mb-6 text-slate-600 dark:text-slate-300;
}
:deep(.prose li) {
  @apply pl-1;
}
:deep(.prose strong) {
  @apply font-semibold text-indigo-600 dark:text-indigo-400;
}
</style>