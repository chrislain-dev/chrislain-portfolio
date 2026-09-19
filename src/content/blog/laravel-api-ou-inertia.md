---
title: Laravel + Vue : API séparée ou Inertia ?
description: Deux façons de brancher Vue sur Laravel, et comment je choisis entre les deux selon le projet.
date: 2026-08-22
tags: [Laravel, Vue.js, Architecture]
cover: /assets/images/tech-laravel.svg
lang: fr
---

C'est la question qui revient sur chaque nouveau projet Laravel : est-ce qu'on expose une API REST avec un front Vue indépendant, ou est-ce qu'on passe par Inertia ?

Les deux fonctionnent. Ils ne résolvent simplement pas le même problème.

## L'API séparée

Laravel expose des routes `/api/*`, Vue consomme ces routes, les deux vivent dans des dépôts distincts ou au moins dans des dossiers indépendants.

Ce que ça apporte : le front et le back évoluent à leur rythme, une application mobile peut réutiliser la même API, et deux personnes peuvent travailler en parallèle sans se marcher dessus.

Ce que ça coûte : l'authentification demande du travail (Sanctum, tokens, CORS), chaque écran a besoin de son état de chargement et de son état d'erreur, et on réécrit côté Vue des choses que Laravel donnait gratuitement — la validation, les redirections, les messages flash.

## Inertia

Inertia garde les contrôleurs Laravel et remplace simplement les vues Blade par des composants Vue. Le contrôleur renvoie des props, Vue les affiche. Il n'y a pas d'API à concevoir.

```php
public function index()
{
    return Inertia::render('Articles/Index', [
        'articles' => Article::with('author')->latest()->paginate(15),
    ]);
}
```

Ce que ça apporte : on garde les sessions, la validation, les policies, les routes nommées. Le développement est nettement plus rapide, surtout sur des applications à beaucoup d'écrans CRUD.

Ce que ça coûte : le front est soudé au back. Si une application mobile arrive dans six mois, il faudra construire une API de toute façon.

## Comment je tranche

Je pose deux questions au client.

**Est-ce qu'une application mobile ou un autre client est prévu ?** Si oui, API séparée — même si ce n'est pas pour tout de suite. Reconstruire après coup coûte toujours plus cher.

**Combien de personnes vont travailler dessus ?** Seul ou à deux sur une application interne, Inertia fait gagner des semaines. À partir de trois personnes avec une séparation front/back claire, l'API séparée évite les blocages.

Pour une application de gestion interne livrée par une seule personne, Inertia gagne presque à chaque fois. Pour une plateforme qui aura plusieurs clients, l'API séparée est le seul choix qui tienne dans la durée.

## Le piège à éviter

Choisir Inertia « pour aller vite » puis exposer petit à petit des routes `/api/*` à côté, pour un widget, puis pour un export, puis pour un écran. On finit avec deux architectures à moitié faites et deux fois plus de code à maintenir.

Si des routes API commencent à apparaître dans un projet Inertia, c'est le moment de se poser franchement la question plutôt que de continuer à empiler.
