export const WOUNDS = ["rejet", "abandon", "humiliation", "trahison", "injustice"];
export const PCM_TYPES = ["Analyseur", "Persévérant", "Empathique", "Imagineur", "Énergiseur", "Promoteur"];

export const VDA_QUESTIONS = [
  {id:"vda_001", category:"rejet", domain:"groupe", title:"Idée ignorée", prompt:"Tu dis une idée dans un groupe, mais personne ne répond vraiment. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu parles moins et tu gardes tes prochaines idées pour toi.", scores:{rejet:3}},
    {text:"Tu regardes si quelqu’un t’a quand même écouté.", scores:{abandon:3}},
    {text:"Tu fais une blague ou tu changes vite de sujet.", scores:{humiliation:3}},
    {text:"Tu observes qui mène la discussion avant de reparler.", scores:{trahison:3}},
    {text:"Tu restes calme, mais tu repenses longtemps à ce moment.", scores:{rejet:3, injustice:1}}
  ]},
  {id:"vda_002", category:"abandon", domain:"lien", title:"Message sans réponse", prompt:"Tu envoies un message à quelqu’un d’important et la réponse tarde beaucoup. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu te dis que tu as peut-être écrit quelque chose de trop.", scores:{rejet:3}},
    {text:"Tu vérifies plusieurs fois si la personne a répondu.", scores:{abandon:3}},
    {text:"Tu fais semblant que ça ne te dérange pas.", scores:{humiliation:3}},
    {text:"Tu cherches ce qui a pu changer dans son attitude.", scores:{trahison:3}},
    {text:"Tu te forces à ne rien montrer, même si ça te travaille.", scores:{humiliation:3, abandon:1}}
  ]},
  {id:"vda_003", category:"humiliation", domain:"erreur", title:"Erreur devant les autres", prompt:"Tu te trompes devant plusieurs personnes. Qu’est-ce qui te ressemble le plus ?", answers:[
    {text:"Tu voudrais qu’on ne te remarque plus pendant un moment.", scores:{rejet:3}},
    {text:"Tu cherches un regard qui te montre que tout va bien.", scores:{abandon:3}},
    {text:"Tu ris ou tu parles vite pour faire passer le moment.", scores:{humiliation:3}},
    {text:"Tu reprends vite les choses en main pour éviter que ça continue.", scores:{humiliation:3, trahison:1}},
    {text:"Tu gardes un visage calme, mais dedans tu es très tendu.", scores:{humiliation:3, injustice:1}}
  ]},
  {id:"vda_004", category:"trahison", domain:"confiance", title:"Promesse non tenue", prompt:"Quelqu’un te promet quelque chose, puis ne le fait pas. Tu réagis comment le plus souvent ?", answers:[
    {text:"Tu prends de la distance pour ne pas être trop touché.", scores:{rejet:3}},
    {text:"Tu veux savoir si tu comptes encore pour la personne.", scores:{abandon:3}},
    {text:"Tu réponds plus fort que prévu parce que ça te pique.", scores:{humiliation:3}},
    {text:"Tu attends des actes clairs avant de croire à nouveau ses mots.", scores:{trahison:3}},
    {text:"Tu retiens surtout que la règle n’a pas été respectée.", scores:{injustice:3, trahison:1}}
  ]},
  {id:"vda_005", category:"injustice", domain:"regles", title:"Règle différente", prompt:"Une règle est appliquée pour toi, mais pas pour les autres. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu te demandes pourquoi on te met à part.", scores:{rejet:3}},
    {text:"Tu aimerais que quelqu’un voie que ça te pèse.", scores:{abandon:3}},
    {text:"Tu essaies de ne pas montrer que ça te touche.", scores:{humiliation:3}},
    {text:"Tu cherches qui profite de la situation.", scores:{trahison:3}},
    {text:"Tu as du mal à passer à autre chose tant que ce n’est pas clair.", scores:{injustice:3}}
  ]},
  {id:"vda_006", category:"rejet", domain:"invitation", title:"Invitation floue", prompt:"Des gens parlent d’une sortie, mais tu ne sais pas si tu es vraiment invité. Tu fais quoi ?", answers:[
    {text:"Tu évites de demander et tu fais comme si tu n’avais rien vu.", scores:{rejet:3}},
    {text:"Tu attends un signe clair qu’ils veulent vraiment que tu viennes.", scores:{abandon:3}},
    {text:"Tu lances une phrase légère pour voir leur réaction.", scores:{humiliation:3}},
    {text:"Tu observes qui décide et ce qu’ils attendent vraiment.", scores:{trahison:3}},
    {text:"Tu te dis qu’ils devraient être plus clairs avec tout le monde.", scores:{injustice:3, rejet:1}}
  ]},
  {id:"vda_007", category:"abandon", domain:"amitie", title:"Proche distant", prompt:"Un proche est très sympa un jour, puis très distant le lendemain. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu te mets un peu en retrait pour ne pas trop attendre.", scores:{rejet:3}},
    {text:"Tu essaies de retrouver le lien comme avant.", scores:{abandon:3}},
    {text:"Tu fais le/la détendu·e, même si ça te touche.", scores:{humiliation:3}},
    {text:"Tu fais attention aux petits signes pour comprendre ce qui arrive.", scores:{trahison:3}},
    {text:"Tu restes droit·e, mais tu trouves ça difficile à accepter.", scores:{injustice:3, abandon:1}}
  ]},
  {id:"vda_008", category:"humiliation", domain:"groupe", title:"Petite remarque", prompt:"Quelqu’un fait une remarque sur toi devant les autres. Elle n’est pas énorme, mais elle te gêne. Tu fais quoi ?", answers:[
    {text:"Tu te fais petit·e et tu attends que le moment passe.", scores:{rejet:3}},
    {text:"Tu regardes si quelqu’un remarque que ça t’a touché.", scores:{abandon:3}},
    {text:"Tu réponds vite, souvent avec humour ou énergie.", scores:{humiliation:3}},
    {text:"Tu retiens qui a parlé et qui a laissé faire.", scores:{trahison:3}},
    {text:"Tu gardes ton calme, mais tu trouves que ça ne se fait pas.", scores:{injustice:3, humiliation:1}}
  ]},
  {id:"vda_009", category:"trahison", domain:"secret", title:"Info apprise après", prompt:"Tu apprends après coup une information qu’on aurait pu te dire avant. Tu réagis comment ?", answers:[
    {text:"Tu t’éloignes un peu pour digérer seul·e.", scores:{rejet:3}},
    {text:"Tu veux comprendre pourquoi on ne t’a pas inclus·e.", scores:{abandon:3, trahison:1}},
    {text:"Tu peux parler plus sèchement que d’habitude.", scores:{humiliation:3}},
    {text:"Tu vérifies les détails avant de refaire confiance.", scores:{trahison:3}},
    {text:"Tu bloques sur le fait que les choses n’ont pas été dites clairement.", scores:{injustice:3, trahison:1}}
  ]},
  {id:"vda_010", category:"injustice", domain:"effort", title:"Effort peu vu", prompt:"Tu fais beaucoup d’efforts, mais les autres le remarquent à peine. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu te demandes si ce que tu fais compte vraiment.", scores:{rejet:3}},
    {text:"Tu aimerais qu’une personne te dise qu’elle a vu tes efforts.", scores:{abandon:3}},
    {text:"Tu fais comme si ce n’était pas important.", scores:{humiliation:3}},
    {text:"Tu regardes si quelqu’un utilise ton travail sans le dire.", scores:{trahison:3, injustice:1}},
    {text:"Tu continues, mais ça reste coincé dans ta tête.", scores:{injustice:3}}
  ]},
  {id:"vda_011", category:"injustice", domain:"preparation", title:"Effort passé inaperçu", prompt:"Tu as préparé ou aidé pour quelque chose d’important, mais presque personne ne le remarque. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu te dis que tu n’aurais peut-être pas dû t’impliquer autant.", scores:{rejet:3}},
    {text:"Tu aimerais qu’au moins une personne te dise merci ou te regarde.", scores:{abandon:3}},
    {text:"Tu fais comme si ce n’était pas grave, même si ça te touche.", scores:{humiliation:3}},
    {text:"Tu repères qui profite du résultat sans avoir participé.", scores:{trahison:3}},
    {text:"Tu as du mal à passer à autre chose tant que personne n’en parle.", scores:{injustice:3, rejet:1}}
  ]},
  {id:"vda_012", category:"abandon", domain:"lien", title:"Silence soudain", prompt:"Une personne proche devient soudain plus froide, sans t’expliquer pourquoi. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu prends du recul pour ne pas insister.", scores:{rejet:3}},
    {text:"Tu essaies de comprendre ce que tu as pu faire de travers.", scores:{abandon:3}},
    {text:"Tu fais semblant que tout va bien quand tu la croises.", scores:{humiliation:3}},
    {text:"Tu observes si son comportement change aussi avec les autres.", scores:{trahison:3}},
    {text:"Tu trouves difficile de rester dans le doute sans explication.", scores:{injustice:3, abandon:1}}
  ]},
  {id:"vda_013", category:"injustice", domain:"regles", title:"Deux poids, deux mesures", prompt:"Tu remarques qu’une même règle n’est pas appliquée pareil selon les personnes. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu te demandes si tu es celui ou celle qu’on surveille plus.", scores:{rejet:3}},
    {text:"Tu cherches un allié qui voit la même chose que toi.", scores:{abandon:3}},
    {text:"Tu évites d’en parler pour ne pas te mettre en avant.", scores:{humiliation:3}},
    {text:"Tu notes qui est traité différemment et par qui.", scores:{trahison:3}},
    {text:"Tu as besoin que les choses soient dites clairement pour tout le monde.", scores:{injustice:3}}
  ]},
  {id:"vda_014", category:"rejet", domain:"aide", title:"Demander de l’aide", prompt:"Tu as besoin d’aide pour avancer, mais tu hésites à la demander. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu te débrouilles seul·e le plus longtemps possible.", scores:{rejet:3}},
    {text:"Tu attends qu’on te propose de l’aide sans avoir à la demander.", scores:{abandon:3}},
    {text:"Tu minimises le problème pour ne pas déranger.", scores:{humiliation:3}},
    {text:"Tu teste d’abord si la personne semble disponible et fiable.", scores:{trahison:3}},
    {text:"Tu trouves normal de galérer seul·e alors que d’autres demandent facilement.", scores:{injustice:3, rejet:1}}
  ]},
  {id:"vda_015", category:"trahison", domain:"plan", title:"Plan de dernière minute", prompt:"Quelqu’un change un plan convenu au tout dernier moment. Tu fais quoi le plus souvent ?", answers:[
    {text:"Tu dis que ce n’est pas grave, même si tu es déçu·e.", scores:{rejet:3}},
    {text:"Tu veux savoir si tu comptes encore dans la décision.", scores:{abandon:3}},
    {text:"Tu peux réagir sèchement parce que tu n’étais pas préparé·e.", scores:{humiliation:3}},
    {text:"Tu attends une explication claire avant d’accepter le changement.", scores:{trahison:3}},
    {text:"Tu retiens que ton temps et ton organisation n’ont pas été respectés.", scores:{injustice:3, trahison:1}}
  ]}
];

export const PCM_QUESTIONS = [
  {id:"pcm_01", title:"Quand une discussion devient confuse", prompt:"Classe les réactions de la plus naturelle à la moins naturelle pour toi.", answers:[
    {type:"Analyseur", text:"Je remets de l’ordre pour comprendre ce qui est prioritaire."},
    {type:"Persévérant", text:"Je cherche ce qui est juste, cohérent et défendable."},
    {type:"Empathique", text:"Je vérifie d’abord comment chacun vit la situation."},
    {type:"Imagineur", text:"Je prends du recul pour laisser émerger une réponse plus claire."},
    {type:"Énergiseur", text:"Je détends l’atmosphère pour que ça circule mieux."},
    {type:"Promoteur", text:"Je propose une option concrète pour sortir du blocage."}
  ]},
  {id:"pcm_02", title:"Quand tu dois avancer vite", prompt:"Classe ce qui t’aide le plus à rester disponible.", answers:[
    {type:"Analyseur", text:"Un cadre simple, des étapes et une échéance réaliste."},
    {type:"Persévérant", text:"Une raison solide qui donne du sens à l’effort."},
    {type:"Empathique", text:"Une présence respectueuse qui reconnaît l’énergie donnée."},
    {type:"Imagineur", text:"Un espace calme pour traiter l’information sans pression."},
    {type:"Énergiseur", text:"Une dynamique légère qui évite de rendre tout trop lourd."},
    {type:"Promoteur", text:"Un défi clair avec une marge d’action immédiate."}
  ]},
  {id:"pcm_03", title:"Quand quelqu’un attend quelque chose de toi", prompt:"Classe les réponses selon ce qui te met le plus en mouvement.", answers:[
    {type:"Analyseur", text:"Qu’on précise le besoin, le délai et les critères de réussite."},
    {type:"Persévérant", text:"Qu’on explique pourquoi c’est important et aligné."},
    {type:"Empathique", text:"Qu’on te parle avec considération et chaleur."},
    {type:"Imagineur", text:"Qu’on te laisse intégrer la demande avant de répondre."},
    {type:"Énergiseur", text:"Qu’on rende l’échange vivant et moins pesant."},
    {type:"Promoteur", text:"Qu’on te laisse choisir vite une option efficace."}
  ]}
];

export const SHADOW_QUESTIONS = [
  {id:"sh_01", title:"Réaction intense", prompt:"Quand tu sens une tension monter, quelle réaction peut devenir tentante ?", answers:[
    {key:"contrôle", text:"Tout verrouiller pour ne plus dépendre de l’incertitude."},
    {key:"retrait", text:"Couper le contact pour retrouver de l’air."},
    {key:"décharge", text:"Réagir fort pour faire sortir ce qui déborde."},
    {key:"dureté", text:"Te montrer irréprochable pour ne pas être atteint·e."}
  ]},
  {id:"sh_02", title:"Quand tu te sens touché·e", prompt:"Qu’est-ce qui devient le plus difficile à réguler ?", answers:[
    {key:"contrôle", text:"L’envie de vérifier, tester ou anticiper."},
    {key:"retrait", text:"L’envie de disparaître de la situation."},
    {key:"décharge", text:"L’envie de répondre plus fort que nécessaire."},
    {key:"dureté", text:"L’envie de ne rien laisser paraître."}
  ]}
];

export const VDA_CORE_SENTENCE = "Le système guide, il n’enferme pas.";

export const RESULT_TEXTS = {
  wounds:{
    rejet:{label:"Rejet", voie:"Voie du Fantôme", summary:"une sensibilité à la place, à la visibilité et au risque de ne pas compter.", need:"besoin de sentir que ta présence est accueillie sans devoir te justifier.", step:"Repérer une situation où tu peux prendre une petite place sans te suradapter."},
    abandon:{label:"Abandon", voie:"Voie du Gardien", summary:"une sensibilité à la continuité du lien et aux distances non expliquées.", need:"besoin de présence fiable, de signes clairs et de sécurité relationnelle.", step:"Formuler une demande simple de présence ou de clarification, sans t’accuser."},
    humiliation:{label:"Humiliation", voie:"Voie du Berserker", summary:"une sensibilité à la gêne, à l’exposition et au risque de perdre ta dignité.", need:"besoin de respect, de douceur et d’espace pour redevenir stable après une tension.", step:"Nommer intérieurement la gêne avant de répondre, puis choisir une phrase courte."},
    trahison:{label:"Trahison", voie:"Voie du Dragon", summary:"une sensibilité à la fiabilité, à la cohérence et aux engagements tenus.", need:"besoin d’éléments concrets pour pouvoir relâcher la vigilance.", step:"Demander un fait vérifiable plutôt que chercher à tout contrôler."},
    injustice:{label:"Injustice", voie:"Voie du Titan", summary:"une sensibilité à l’équité, à la justesse et à l’effort reconnu.", need:"besoin de cohérence, de respect des limites et de reconnaissance de ce qui est porté.", step:"Identifier ce qui est réellement injuste, puis ce qui peut être ajusté concrètement."}
  },
  pcm:{
    Analyseur:{need:"structure, informations claires, temps organisé", channel:"questions précises, faits, étapes", stress:"risque de sur-analyse ou de critique du flou", step:"Clarifier une demande en trois points : quoi, quand, attendu."},
    Persévérant:{need:"sens, reconnaissance de l’engagement, cohérence", channel:"valeurs, raison d’être, position claire", stress:"risque de jugement ou de rigidité", step:"Dire ce qui compte pour toi sans transformer la discussion en verdict."},
    Empathique:{need:"chaleur, reconnaissance personnelle, qualité du lien", channel:"présence, considération, mots doux et directs", stress:"risque de prendre trop sur toi ou de chercher l’approbation", step:"Demander un signe concret de considération."},
    Imagineur:{need:"calme, espace intérieur, consigne simple", channel:"phrase courte, temps de réponse, peu de pression", stress:"risque de retrait ou de silence subi", step:"Prévenir que tu as besoin d’un temps avant de répondre."},
    Énergiseur:{need:"stimulation, spontanéité, relation vivante", channel:"ton léger, rythme, interaction", stress:"risque de dispersion ou de provocation défensive", step:"Ramener de la légèreté sans esquiver le sujet."},
    Promoteur:{need:"défi, action, marge de décision", channel:"direct, concret, orienté solution", stress:"risque d’impatience ou de passage en force", step:"Choisir une action utile sans brûler l’étape relationnelle."}
  },
  shadow:{
    contrôle:{need:"sécurité et prévisibilité", regulation:"ralentir, distinguer les faits des scénarios, demander une clarification limitée."},
    retrait:{need:"protection et espace", regulation:"annoncer une pause courte plutôt que disparaître complètement."},
    décharge:{need:"être entendu·e et respecté·e", regulation:"baisser l’intensité avant de parler du fond."},
    dureté:{need:"dignité et stabilité", regulation:"laisser exister l’émotion sans devoir être parfait·e."}
  }
};
