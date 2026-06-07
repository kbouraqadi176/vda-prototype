# VDA — Base neutre propre v1

Objectif : repartir de zéro avec un squelette testable, sobre et maintenable.

## Ce qui est inclus

- Consentement
- Identification locale
- Hub principal clair
- Test VDA avec tirage équilibré en cycle
- Test PCM avec classement réel des réponses
- Test Ombre court
- Résultats digestes : résumé, détails, vue coach
- Journal filtrable
- Vue coach locale
- Pause / reprise via localStorage
- Tirage brut avant filtre de présentation

## Structure

```txt
index.html
css/style.css
js/app.js
js/data.js
js/engine.js
js/store.js
```

## Règle produit verrouillée

Le mode neutre est la base officielle. Les univers narratifs futurs ne devront modifier que la présentation, jamais le lot tiré, les réponses internes, les index originaux ou le scoring.

## Limite volontaire

La banque de questions est volontairement courte dans cette base. Elle sert à valider le moteur, l’UX et la structure avant de produire la vraie banque complète.
