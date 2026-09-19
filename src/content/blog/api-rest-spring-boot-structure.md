---
title: Structurer une API REST Spring Boot sans se perdre
description: Le découpage en couches que j'utilise sur mes projets Spring Boot, et les trois erreurs qui m'ont coûté le plus de temps.
date: 2026-09-08
tags: [Spring Boot, API, Java]
cover: /assets/images/tech-spring.svg
lang: fr
---

Quand j'ai commencé Spring Boot après plusieurs années de Laravel, mon premier réflexe a été de tout mettre dans le contrôleur. Ça marche — jusqu'au jour où il faut ajouter une règle métier et qu'on se retrouve à copier-coller la même vérification dans quatre endroits.

Voici le découpage que j'utilise aujourd'hui sur tous mes projets.

## Quatre couches, quatre responsabilités

**Le contrôleur** reçoit la requête et renvoie une réponse. Rien d'autre. Il ne connaît ni la base de données, ni les règles métier. S'il fait plus de dix lignes, c'est qu'il porte du travail qui ne lui appartient pas.

```java
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> show(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.findById(id));
    }
}
```

**Le service** porte les règles métier. C'est la seule couche qui décide. Un stock ne peut pas passer sous zéro ? La règle vit ici, pas dans le contrôleur et pas dans une contrainte SQL.

**Le repository** parle à la base. Spring Data JPA génère l'essentiel à partir du nom des méthodes, donc cette couche reste souvent à trois lignes.

**Les DTO** définissent ce qui entre et ce qui sort. Exposer directement ses entités JPA, c'est donner à ses clients un accès à son schéma de base — et se condamner à ne plus jamais pouvoir le changer.

## Les trois erreurs qui m'ont coûté du temps

### Renvoyer l'entité au lieu d'un DTO

Le jour où j'ai renommé une colonne, trois écrans front ont cassé. Un `ArticleResponse` qui expose exactement ce dont le client a besoin coûte cinq minutes à écrire et évite ce genre de journée.

### Oublier la gestion globale des erreurs

Sans `@RestControllerAdvice`, une exception métier remonte en HTTP 500 avec une stack trace complète. Une classe centralisée qui traduit les exceptions en réponses propres règle le problème une fois pour toutes :

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException exception) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ApiError("RESOURCE_NOT_FOUND", exception.getMessage()));
    }
}
```

### Le N+1 silencieux

Une liste de commandes, chacune avec son client : Hibernate exécute une requête pour la liste, puis une par commande. Vingt commandes, vingt-et-une requêtes. En local, personne ne le voit. En production, la page met quatre secondes.

La solution : une jointure explicite avec `JOIN FETCH`, et l'activation de `spring.jpa.show-sql=true` en développement pour voir ce qui part vraiment vers la base.

## Ce que je retiens

La structure n'est pas un exercice d'esthétique. Elle sert à répondre vite à une question simple : « où est-ce que je modifie ça ? » Quand chaque couche a une seule responsabilité, la réponse est évidente — et c'est tout ce qu'on demande à une architecture.
