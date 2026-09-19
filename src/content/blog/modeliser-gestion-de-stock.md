---
title: Modéliser une gestion de stock qui ne ment pas
description: Pourquoi stocker une quantité dans une colonne est une mauvaise idée, et ce que je fais à la place.
date: 2026-07-30
tags: [Base de données, Architecture, Laravel]
cover: /assets/images/coming_soon.webp
lang: fr
---

Sur ma première application de gestion de stock, j'avais une colonne `quantite` sur la table `produits`. À chaque entrée, `+1`. À chaque sortie, `-1`. Simple, rapide, et faux au bout de trois semaines.

## Le problème d'une quantité stockée

Une colonne `quantite` ne dit qu'une chose : combien il y en a maintenant, d'après la dernière écriture réussie. Elle ne dit pas comment on est arrivé là.

Le jour où le gérant demande pourquoi il reste 12 cartons alors qu'il en attendait 15, il n'y a rien à lui répondre. Et si deux utilisateurs enregistrent une sortie au même moment, les deux lisent 12, les deux écrivent 11 — alors qu'il devrait en rester 10.

## Le mouvement comme unité de base

La solution est d'arrêter de stocker un état et de stocker des faits. Une table `mouvements_stock`, une ligne par événement, jamais de mise à jour ni de suppression :

| produit_id | type    | quantite | motif             | date       | utilisateur_id |
|------------|---------|----------|-------------------|------------|----------------|
| 42         | entree  | 20       | Livraison #1180   | 2026-07-02 | 3              |
| 42         | sortie  | 5        | Vente #4471       | 2026-07-04 | 7              |
| 42         | sortie  | 3        | Casse             | 2026-07-09 | 3              |

Le stock devient une somme, pas une colonne :

```php
public function getStockAttribute(): int
{
    return $this->mouvements()
        ->selectRaw("SUM(CASE WHEN type = 'entree' THEN quantite ELSE -quantite END) as total")
        ->value('total') ?? 0;
}
```

Chaque chiffre affiché devient justifiable. « Pourquoi 12 ? » a maintenant une réponse, ligne par ligne, avec une date et un nom.

## Les trois règles qui vont avec

**Un mouvement ne se modifie jamais.** Une erreur de saisie se corrige par un mouvement inverse, avec un motif explicite. L'historique doit rester le reflet de ce qui s'est passé, y compris les erreurs.

**Toute opération multi-lignes passe par une transaction.** Un transfert entre dépôts, c'est une sortie et une entrée : les deux passent, ou aucune.

```php
DB::transaction(function () use ($produit, $quantite, $source, $destination) {
    Mouvement::create([...]); // sortie du dépôt source
    Mouvement::create([...]); // entrée dans le dépôt destination
});
```

**Le verrou protège les règles métier.** Avant de valider une sortie, `lockForUpdate()` sur le produit garantit qu'aucune autre requête ne passera en même temps et ne fera descendre le stock sous zéro.

## Et la performance ?

C'est l'objection immédiate : additionner des milliers de lignes à chaque affichage, ce n'est pas tenable. Deux réponses.

La première : un index sur `(produit_id, date)` suffit largement jusqu'à plusieurs centaines de milliers de mouvements. On sous-estime beaucoup ce qu'une base fait sans broncher.

La seconde, quand le volume grimpe : une colonne `stock_actuel` mise à jour à chaque mouvement — mais en cache, pas en source de vérité. La table des mouvements reste la référence, et une tâche planifiée recalcule la colonne toutes les nuits. Si les deux divergent, c'est le cache qui a tort.

## Ce que ça change côté utilisateur

L'écran le plus utilisé de l'application que j'ai livrée n'est pas la liste des produits. C'est l'historique d'un produit. Les gens veulent comprendre, pas seulement consulter — et une modélisation qui garde les faits est la seule qui permet de leur répondre.
