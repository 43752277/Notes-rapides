(function(){

    let zIndexCounter = 10000;

const menu = document.createElement("div");
menu.style.position = "fixed";
menu.style.bottom = "60px";
menu.style.right = "20px";
menu.style.background = "white";
menu.style.border = "none";
menu.style.borderRadius = "4px";
menu.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
menu.style.display = "none";
menu.style.zIndex = "99999";
document.body.appendChild(menu);

const isElectron = navigator.userAgent.includes('Electron');

if (!isElectron) {
    const mainBtn = document.createElement("button");
    mainBtn.textContent = "NOTES RAPIDES";
    mainBtn.style.position = "fixed";
    mainBtn.style.bottom = "35px";
    mainBtn.style.right = "20px";
    mainBtn.style.zIndex = "99999";
    mainBtn.style.background = "#f2f2f2";
    document.body.appendChild(mainBtn);
    mainBtn.onclick = function(){
        menu.style.display = menu.style.display === "none" ? "block" : "none";
    };
} else {
    menu.style.display = "block";
    menu.style.bottom = "auto";
    menu.style.right = "auto";
    menu.style.top = "50%";
    menu.style.left = "50%";
    menu.style.transform = "translate(-50%, -50%)";
}

    /* -------------------------
DONNÉES DES NOTES
------------------------- */

    const notesData = {
        "Annulation": {
            template: `{{Type de communication}} {{Nom du client}}
Annulation d'un contrat
Type d'annulation : {{Type d'annulation}}
Annulation en date du {{Date d'annulation}}
Raison de l'annulation : {{Raison de l'annulation}}
Démarches de sauvetage : {{Démarches de sauvetage}}
Méthode de confirmation reçu : {{Méthode de confirmation reçu}}
Sollicitation : {{Sollicitation}}
Information complémentaire : {{Information complémentaire}}
Transaction {{État}} chez {{Assureur}} {{Méthode}}
Crédit : {{Crédit}}$
Honoraires : {{Honoraires}}$
Client avisé des frais d'annulation en cours de terme : {{Client avisé des frais d'annulation en cours de terme}}
Confirmation au client : {{Confirmation au client}}
`,
            fields: [
                { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                { label: "Nom du client", type: "text" },
                { label: "Type d'annulation", type: "select", options: ["Annulation par l'assuré","Annulation par l'assureur","Annulation pour non-paiement","Changement assureur à l'interne"] },
                { label: "Date d'annulation", type: "date" },
                { label: "Raison de l'annulation", type: "select", options: ["Assureur - Annulation pour non-paiement","Assureur - Annulation pour aggravation du risque","Assureur - Annulation pour fausse déclaration","Client - Autre courtier est ami/famille","Client - Décédé","Client - Risque vendu","Client - Transfert d'agence","Client - Perdu à autre","Client - Perdu à Aviva","Client - Perdu à Belair","Client - Perdu à Beneva","Client - Perdu à Desjardins/La Personnelle","Client - Perdu à Economical","Client - Perdu à Intact","Client - Perdu à L'Unique","Client - Perdu à Promutuel","Client - Perdu à Intact","Client - Perdu à Wawanesa","Courtier - Transfert d'assureur"] },
                { label: "Démarches de sauvetage", type: "text" },
                { label: "Méthode de confirmation reçu", type: "select", options:["Courriel", "Poste", "En attente", "Ne s'applique pas"] },
                { label: "Sollicitation", type: "select", options:["Refusée", "Acceptée", "Ne s'applique pas"] },
                { label: "Information complémentaire", type: "textarea" },
                { label: "État", type: "select", options:["émise", "en suspend"] },
                { label: "Assureur", type: "select", options:["Intact", "L'Unique", "Promutuel", "Aviva", "Leclerc", "Echelon", "Soplex", "Morin Elliott", "Pafco", "Autre"] },
                { label: "Méthode", type: "select", options:["dans leur portail", "par courriel"] },
                { label: "Crédit", type: "text" },
                { label: "Honoraires", type: "text" },
                { label: "Client avisé des frais d'annulation en cours de terme", type: "select", options:["Non", "Oui", "Ne s'applique pas"] },
                { label: "Confirmation au client", type: "select", options : ["Oui", "Non"] },
            ]
        },
        "Nouvelle affaire": {
            "Nouvelle affaire - Automobile": {
                template: `{{Type de communication}} {{Nom du client}}
Émission d'un contrat {{Type d'assurance}} chez {{Mis en vigueur chez}}
Mise en vigueur le {{Date de Mise en vigueur}}
Numéro de police : {{Numéro de police}}

Risques sur la police :

{{RISQUES}}
Prime annuelle : {{Prime annuelle}}$
Honoraires : {{Honoraires}}$
Moyen de paiement : {{Moyen de paiement}}
Autorisation obtenue : {{Autorisation obtenue}}
Fichier sinistres consulté : {{Fichier sinistres consulté}}
Divergence avisée : {{Divergence avisée}}
Information particulière : {{Information particulière}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Type d'assurance", type: "select", options: ["Choisir","Automobile","VR/Roulotte","Autres"] },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Mis en vigueur chez", type: "text" },
                    { label: "Numéro de police", type: "text" },
                    {
                        label: "Véhicule(s)",
                        type: "risques",
                        placeholder: "Ex: 2012 Hyundai Elantra",
                        showAddButton: true,
                        addButtonText: "Ajouter un véhicule",
                        extraFields: [
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Tous risques", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Collision et renversement", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Tous risques sauf collision et renversement", type: "select", options: ["Aucun", "100", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Risques spécifiés", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "INOV/Lauto Protection/Proplan", type: "checkbox"},
                            { label: "F.A.Q. 33", type: "checkbox"},
                            { label: "F.A.Q. 34", type: "checkbox"},
                            { label: "F.A.Q. 43AE", type: "select", options: ["Non admissible", "Pas interessé", "Oui"]},
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Honoraires", type: "text" },
                    { label: "Moyen de paiement", type: "select", options:["Choisir","Directe - 1 facture","Directe - 12 prélèvements","Directe - 2/3 prélèvements","Directe - 1 prélèvement","Agence - 1 facture","Autre"] },
                    { label: "Autorisation obtenue", type: "checkbox" },
                    { label: "Fichier sinistres consulté", type: "checkbox" },
                    { label: "Divergence avisée", type: "checkbox" },
                    { label: "Information particulière", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Nouvelle affaire - Propriétaire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Émission d'un contrat Habitation chez {{Mis en vigueur chez}}
Mise en vigueur le {{Date de Mise en vigueur}}
Numéro de police : {{Numéro de police}}

Risques sur la police :

{{RISQUES}}
Prime annuelle : {{Prime annuelle}}$
Honoraires : {{Honoraires}}$
Moyen de paiement : {{Moyen de paiement}}
Autorisation obtenue : {{Autorisation obtenue}}
Information particulière : {{Information particulière}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Mis en vigueur chez", type: "text" },
                    { label: "Numéro de police", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Batiment", type: "text"},
                            { label: "Montant global", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Biens meubles", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Spa/Piscine creusé", type: "checkbox"},
                            { label: "Spa/Piscine hors-terre", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de reconstruire le batiment", type: "checkbox"},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Entrée d'eau", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Honoraires", type: "text" },
                    { label: "Moyen de paiement", type: "select", options:["Choisir","Directe - 1 facture","Directe - 12 prélèvements","Directe - 2/3 prélèvements","Directe - 1 prélèvement","Agence - 1 facture","Autre"] },
                    { label: "Autorisation obtenue", type: "checkbox" },
                    { label: "Information particulière", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Nouvelle affaire - Locataire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Émission d'un contrat Habitation chez {{Mis en vigueur chez}}
Mise en vigueur le {{Date de Mise en vigueur}}
Numéro de police : {{Numéro de police}}

Risques sur la police :

{{RISQUES}}
Prime annuelle : {{Prime annuelle}}$
Honoraires : {{Honoraires}}$
Moyen de paiement : {{Moyen de paiement}}
Autorisation obtenue : {{Autorisation obtenue}}
Information particulière : {{Information particulière}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Mis en vigueur chez", type: "text" },
                    { label: "Numéro de police", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Honoraires", type: "text" },
                    { label: "Moyen de paiement", type: "select", options:["Choisir","Directe - 1 facture","Directe - 12 prélèvements","Directe - 2/3 prélèvements","Directe - 1 prélèvement","Agence - 1 facture","Autre"] },
                    { label: "Autorisation obtenue", type: "checkbox" },
                    { label: "Information particulière", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Nouvelle affaire - Copropriétaire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Émission d'un contrat Habitation chez {{Mis en vigueur chez}}
Mise en vigueur le {{Date de Mise en vigueur}}
Numéro de police : {{Numéro de police}}

Risques sur la police :

{{RISQUES}}
Prime annuelle : {{Prime annuelle}}$
Honoraires : {{Honoraires}}$
Moyen de paiement : {{Moyen de paiement}}
Autorisation obtenue : {{Autorisation obtenue}}
Information particulière : {{Information particulière}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Mis en vigueur chez", type: "text" },
                    { label: "Numéro de police", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Améliorations locatives", type: "checkbox", hasDetails : true},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Honoraires", type: "text" },
                    { label: "Moyen de paiement", type: "select", options:["Choisir","Directe - 1 facture","Directe - 12 prélèvements","Directe - 2/3 prélèvements","Directe - 1 prélèvement","Agence - 1 facture","Autre"] },
                    { label: "Autorisation obtenue", type: "checkbox" },
                    { label: "Information particulière", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Nouvelle affaire - Copropriétaire loué": {
                template: `{{Type de communication}} {{Nom du client}}
Émission d'un contrat Habitation chez {{Mis en vigueur chez}}
Mise en vigueur le {{Date de Mise en vigueur}}
Numéro de police : {{Numéro de police}}

Risques sur la police :

{{RISQUES}}
Prime annuelle : {{Prime annuelle}}$
Honoraires : {{Honoraires}}$
Moyen de paiement : {{Moyen de paiement}}
Autorisation obtenue : {{Autorisation obtenue}}
Information particulière : {{Information particulière}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Mis en vigueur chez", type: "text" },
                    { label: "Numéro de police", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Améliorations locatives", type: "checkbox", hasDetails : true},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Honoraires", type: "text" },
                    { label: "Moyen de paiement", type: "select", options:["Choisir","Directe - 1 facture","Directe - 12 prélèvements","Directe - 2/3 prélèvements","Directe - 1 prélèvement","Agence - 1 facture","Autre"] },
                    { label: "Autorisation obtenue", type: "checkbox" },
                    { label: "Information particulière", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Nouvelle affaire - Propriétaire loué": {
                template: `{{Type de communication}} {{Nom du client}}
Émission d'un contrat Habitation chez {{Mis en vigueur chez}}
Mise en vigueur le {{Date de Mise en vigueur}}
Numéro de police : {{Numéro de police}}

Risques sur la police :

{{RISQUES}}
Prime annuelle : {{Prime annuelle}}$
Honoraires : {{Honoraires}}$
Moyen de paiement : {{Moyen de paiement}}
Autorisation obtenue : {{Autorisation obtenue}}
Information particulière : {{Information particulière}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Mis en vigueur chez", type: "text" },
                    { label: "Numéro de police", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Batiment", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Spa/Piscine creusé", type: "checkbox"},
                            { label: "Spa/Piscine hors-terre", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Entrée d'eau", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Honoraires", type: "text" },
                    { label: "Moyen de paiement", type: "select", options:["Choisir","Directe - 1 facture","Directe - 12 prélèvements","Directe - 2/3 prélèvements","Directe - 1 prélèvement","Agence - 1 facture","Autre"] },
                    { label: "Autorisation obtenue", type: "checkbox" },
                    { label: "Information particulière", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
        },
        "Soumission": {
            "Soumission - Automobile": {
                template: `{{Type de communication}} {{Nom du client}}
Soumission {{Type d'assurance}}
Mise en vigueur le {{Date de Mise en vigueur}}
Raison de la demande de soumission : {{Raison de la demande de soumission}}
Nom de l'assureur actuel : {{Nom de l'assureur actuel}}

Risques sur la police :

{{RISQUES}}
Soumission monté chez : {{Soumission monté chez}}
Numéro de soumission : {{Numéro de soumission}}
Prime annuelle : {{Prime annuelle}}$
Information particulière au dossier (préqualifications) : {{Information particulière au dossier (préqualifications)}}
Information manquante pour émission : {{Information manquante pour émission}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Type d'assurance", type: "select", options: ["Choisir","Automobile","VR/Roulotte","Autres"] },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Raison de la demande de soumission", type: "text" },
                    { label: "Nom de l'assureur actuel", type: "text" },
                    {
                        label: "Véhicule(s)",
                        type: "risques",
                        placeholder: "Ex: 2012 Hyundai Elantra",
                        showAddButton: true,
                        addButtonText: "Ajouter un véhicule",
                        extraFields: [
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Tous risques", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Collision et renversement", type: "select", options: ["Aucun", "250", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Tous risques sauf collision et renversement", type: "select", options: ["Aucun", "100", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Risques spécifiés", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "INOV/Lauto Protection/Proplan", type: "checkbox"},
                            { label: "F.A.Q. 33", type: "checkbox"},
                            { label: "F.A.Q. 34", type: "checkbox"},
                            { label: "F.A.Q. 43AE", type: "select", options: ["Non admissible", "Pas interessé", "Oui"]},
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Soumission monté chez", type: "text" },
                    { label: "Numéro de soumission", type: "text" },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Information particulière au dossier (préqualifications)", type: "textarea" },
                    { label: "Information manquante pour émission", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Soumission - Propriétaire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Soumission Habitation
Mise en vigueur le {{Date de Mise en vigueur}}
Raison de la demande de soumission : {{Raison de la demande de soumission}}
Nom de l'assureur actuel : {{Nom de l'assureur actuel}}

Risques sur la police :

{{RISQUES}}
Soumission monté chez : {{Soumission monté chez}}
Numéro de soumission : {{Numéro de soumission}}
Prime annuelle : {{Prime annuelle}}$
Information particulière au dossier (préqualifications) : {{Information particulière au dossier (préqualifications)}}
Information manquante pour émission : {{Information manquante pour émission}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Raison de la demande de soumission", type: "text" },
                    { label: "Nom de l'assureur actuel", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Batiment", type: "text"},
                            { label: "Montant global", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Biens meubles", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Spa/Piscine creusé", type: "checkbox"},
                            { label: "Spa/Piscine hors-terre", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de reconstruire le batiment", type: "checkbox"},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Entrée d'eau", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Soumission monté chez", type: "text" },
                    { label: "Numéro de soumission", type: "text" },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Information particulière au dossier (préqualifications)", type: "textarea" },
                    { label: "Information manquante pour émission", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Soumission - Locataire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Soumission Habitation
Mise en vigueur le {{Date de Mise en vigueur}}
Raison de la demande de soumission : {{Raison de la demande de soumission}}
Nom de l'assureur actuel : {{Nom de l'assureur actuel}}

Risques sur la police :

{{RISQUES}}
Soumission monté chez : {{Soumission monté chez}}
Numéro de soumission : {{Numéro de soumission}}
Prime annuelle : {{Prime annuelle}}$
Information particulière au dossier (préqualifications) : {{Information particulière au dossier (préqualifications)}}
Information manquante pour émission : {{Information manquante pour émission}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Raison de la demande de soumission", type: "text" },
                    { label: "Nom de l'assureur actuel", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Soumission monté chez", type: "text" },
                    { label: "Numéro de soumission", type: "text" },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Information particulière au dossier (préqualifications)", type: "textarea" },
                    { label: "Information manquante pour émission", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Soumission - Copropriétaire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Soumission Habitation
Mise en vigueur le {{Date de Mise en vigueur}}
Raison de la demande de soumission : {{Raison de la demande de soumission}}
Nom de l'assureur actuel : {{Nom de l'assureur actuel}}

Risques sur la police :

{{RISQUES}}
Soumission monté chez : {{Soumission monté chez}}
Numéro de soumission : {{Numéro de soumission}}
Prime annuelle : {{Prime annuelle}}$
Information particulière au dossier (préqualifications) : {{Information particulière au dossier (préqualifications)}}
Information manquante pour émission : {{Information manquante pour émission}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Raison de la demande de soumission", type: "text" },
                    { label: "Nom de l'assureur actuel", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Améliorations locatives", type: "checkbox", hasDetails : true},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Soumission monté chez", type: "text" },
                    { label: "Numéro de soumission", type: "text" },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Information particulière au dossier (préqualifications)", type: "textarea" },
                    { label: "Information manquante pour émission", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Soumission - Copropriétaire loué": {
                template: `{{Type de communication}} {{Nom du client}}
Soumission Habitation
Mise en vigueur le {{Date de Mise en vigueur}}
Raison de la demande de soumission : {{Raison de la demande de soumission}}
Nom de l'assureur actuel : {{Nom de l'assureur actuel}}

Risques sur la police :

{{RISQUES}}
Soumission monté chez : {{Soumission monté chez}}
Numéro de soumission : {{Numéro de soumission}}
Prime annuelle : {{Prime annuelle}}$
Information particulière au dossier (préqualifications) : {{Information particulière au dossier (préqualifications)}}
Information manquante pour émission : {{Information manquante pour émission}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Raison de la demande de soumission", type: "text" },
                    { label: "Nom de l'assureur actuel", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Améliorations locatives", type: "checkbox", hasDetails : true},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Soumission monté chez", type: "text" },
                    { label: "Numéro de soumission", type: "text" },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Information particulière au dossier (préqualifications)", type: "textarea" },
                    { label: "Information manquante pour émission", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Soumission - Propriétaire loué": {
                template: `{{Type de communication}} {{Nom du client}}
Soumission Habitation
Mise en vigueur le {{Date de Mise en vigueur}}
Raison de la demande de soumission : {{Raison de la demande de soumission}}
Nom de l'assureur actuel : {{Nom de l'assureur actuel}}

Risques sur la police :

{{RISQUES}}
Soumission monté chez : {{Soumission monté chez}}
Numéro de soumission : {{Numéro de soumission}}
Prime annuelle : {{Prime annuelle}}$
Information particulière au dossier (préqualifications) : {{Information particulière au dossier (préqualifications)}}
Information manquante pour émission : {{Information manquante pour émission}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Raison de la demande de soumission", type: "text" },
                    { label: "Nom de l'assureur actuel", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Formulaire", type: "text"},
                            { label: "Batiment", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Spa/Piscine creusé", type: "checkbox"},
                            { label: "Spa/Piscine hors-terre", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Entrée d'eau", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Soumission monté chez", type: "text" },
                    { label: "Numéro de soumission", type: "text" },
                    { label: "Prime annuelle", type: "text" },
                    { label: "Information particulière au dossier (préqualifications)", type: "textarea" },
                    { label: "Information manquante pour émission", type: "textarea" },
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
        },
        "Modification automobile": {
            "Ajout de conducteur/assuré": {
                template: `{{Type de communication}} {{Nom du client}}
Ajout de conducteur(s)/assuré(s) en date du {{Date effective de la transaction}}

Conducteur(s)/Assuré(s) ajouté(s) sur la police :

{{RISQUES}}
Transaction {{État}} chez {{Assureur}} {{Méthode}}
{{Surprime/Crédit}} : {{Différence}}$
Honoraires : {{Honoraires}}$
Information complémentaire : {{Information complémentaire}}
Le client a été avisé de la différence de prime : {{Confirmation au client}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date effective de la transaction", type: "date" },

                    {
                        label: "Conducteur(s)/Assuré(s)",
                        type: "risques",
                        showAddButton: true,
                        placeholder: "Nom complet du conducteur/assuré",
                        addButtonText: "Ajouter conducteur/assuré",

                        extraFields: [
                            { label: "Date de naissance", type: "date" },
                            { label: "Emploi", type: "text" },
                            { label: "Employeur", type: "text" },
                            { label: "Lien avec propriétaire immatriculé du véhicule", type: "text" },
                            { label: "Conduira quel véhicule?", type: "text" },
                            { label: "Numéro de permis de conduire", type: "text" },
                            { label: "Type de permis de conduire", type: "select", options: ["Probatoire","Permanent","Apprenti", "Autre"] },
                            { label: "Infractions au code de la route au cours des trois dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Suspension de permis", type: "checkbox", hasDetails: true},
                            { label: "Accident ou réclamation dans les 6 dernière années?", type: "checkbox", hasDetails: true},
                            { label: "Avisé que le fichier central des sinistres automobiles sera consulté afin d'obtenir l'information sur les sinistres antérieurs?", type: "checkbox"},
                            { label: "Divergence entre déclaration et résultat vérification FCSA?", type: "checkbox", hasDetails: true},
                            { label: "Est-ce que le conducteur ou une personne habitant sous votre toit avez un dossier judiciaire?", type: "checkbox", hasDetails: true},
                            { label: "Est-ce que le conducteur a fait faillite ou une proposition de consommateur dans les cinq dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Assurance automobile sans interruption depuis combien d'année?", type: "checkbox", hasDetails: true},
                            { label: "Assureur antérieur", type: "text" },
                            { label: "Numéro de police antérieur", type: "text" },
                            { label: "Avez-vous déjà été annulé ou non-renouvelé par un assureur?", type: "checkbox", hasDetails: true},
                            { label: "Information complémentaire", type: "textarea" },
                        ],
                    },
                    { label: "État", type: "select", options:["émise", "en suspend"] },
                    { label: "Assureur", type: "select", options:["Intact", "L'Unique", "Promutuel", "Aviva", "Leclerc", "Echelon", "Soplex", "Morin Elliott", "Pafco", "Autre"] },
                    { label: "Méthode", type: "select", options:["dans leur portail", "par courriel"] },

                    { label: "Surprime/Crédit", type: "select", options:["Surprime", "Crédit"] },
                    { label: "Différence", type: "text" },
                    { label: "Honoraires", type: "text" },

                    { label: "Information complémentaire", type: "textarea" },

                    { label: "Confirmation au client", type: "select", options : ["Oui", "Non"] },

                ]
            },
            "Ajout de voiture": {
                template: `{{Type de communication}} {{Nom du client}}
Ajout de véhicule(s) en date du {{Date effective de la transaction}}

Risque(s) ajouté(s) sur la police :

{{RISQUES}}
Transaction {{État}} chez {{Assureur}} {{Méthode}}
{{Surprime/Crédit}} : {{Différence}}$
Honoraires : {{Honoraires}}$
Information complémentaire : {{Information complémentaire}}
Le client a été avisé de la différence de prime : {{Confirmation au client}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date effective de la transaction", type: "date" },

                    {
                        label: "Véhicule(s)",
                        type: "risques",
                        placeholder: "Ex: 2012 Hyundai Elantra",
                        showAddButton: true,
                        addButtonText: "Ajouter un véhicule",

                        extraFields: [
                            { label: "Date d'achat du véhicule", type: "date" },
                            { label: "NIV", type: "text" },
                            { label: "État du véhicule", type: "select", options: ["Choisir","Usagé","Neuf","Démo"] },
                            { label: "Prix payé", type: "text" },
                            { label: "Présence d'un système d'alarme", type: "checkbox", hasDetails: true},
                            { label: "Kilométrage annuel", type: "text" },
                            { label: "Kilométrage pour se rendre au travail (1 trajet)", type: "text" },
                            { label: "Véhicule utilisé pour raisons professionnelles, transport de marchandises, personnes, des courses ou des expositions", type: "checkbox", hasDetails: true},
                            { label: "Véhicule modifié, adapté, reconstruit ou gravement accidenté", type: "checkbox", hasDetails: true},
                            { label: "Véhicule utilisé à l'extérieur du Québec pour plus de 3 semaines par année", type: "checkbox", hasDetails: true},
                            { label: "Présence d'un locateur ou créancier", type: "select", options: ["Non","Créancier","Locataire"] },
                            { label: "Si oui, détails", type: "textarea" },
                            { label: "Véhicule immatriculé au nom de l'assuré au dossier", type: "checkbox" },
                            { label: "Si non, détails", type: "text" },
                            { label: "Conducteur principal est l'assuré au dossier", type: "checkbox" },
                            { label: "Si non, détails", type: "text" },
                            { label: "Conducteur occasionnel", type: "textarea" },
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Tous risques", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Collision et renversement", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Tous risques sauf collision et renversement", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Risques spécifiés", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "INOV/Lauto Protection/Proplan", type: "checkbox"},
                            { label: "F.A.Q. 33", type: "checkbox"},
                            { label: "F.A.Q. 34", type: "checkbox"},
                            { label: "F.A.Q. 43AE", type: "select", options: ["Non admissible", "Pas interessé", "Oui"]},
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "État", type: "select", options:["émise", "en suspend"] },
                    { label: "Assureur", type: "select", options:["Intact", "L'Unique", "Promutuel", "Aviva", "Leclerc", "Echelon", "Soplex", "Morin Elliott", "Pafco", "Autre"] },
                    { label: "Méthode", type: "select", options:["dans leur portail", "par courriel"] },

                    { label: "Surprime/Crédit", type: "select", options:["Surprime", "Crédit"] },
                    { label: "Différence", type: "text" },
                    { label: "Honoraires", type: "text" },

                    { label: "Information complémentaire", type: "textarea" },

                    { label: "Confirmation au client", type: "select", options : ["Oui", "Non"] },

                ]
            },
            "Changement d'adresse": {
                template: `{{Type de communication}} {{Nom du client}}
Ajout de véhicule(s) en date du {{Date effective de la transaction}}

Risque(s) ajouté(s) sur la police :

{{RISQUES}}
Transaction {{État}} chez {{Assureur}} {{Méthode}}
{{Surprime/Crédit}} : {{Différence}}$
Honoraires : {{Honoraires}}$
Information complémentaire : {{Information complémentaire}}
Le client a été avisé de la différence de prime : {{Confirmation au client}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date effective de la transaction", type: "date" },

                    {
                        type: "risques",
                        placeholder : "Nouvelle adresse (complète)",
                        showRemoveButton: false,

                        extraFields: [
                            { label: "Mise à jour de l'emploi/employeur", type: "checkbox", hasDetails: true},
                            { label: "Mise à jour adresse courriel", type: "checkbox", hasDetails: true},
                            { label: "Mise à jour numéro de téléphone", type: "checkbox", hasDetails: true},
                            { label: "Mise à jour de l'utilisation du(des) véhicule(s)", type: "checkbox", hasDetails: true},
                            { label: "Mise à jour de l'assignation des conducteurs", type: "checkbox", hasDetails: true},
                            { label: "Information complémentaire", type: "textarea"},
                        ],
                    },
                    { label: "État", type: "select", options:["émise", "en suspend"] },
                    { label: "Assureur", type: "select", options:["Intact", "L'Unique", "Promutuel", "Aviva", "Leclerc", "Echelon", "Soplex", "Morin Elliott", "Pafco", "Autre"] },
                    { label: "Méthode", type: "select", options:["dans leur portail", "par courriel"] },

                    { label: "Surprime/Crédit", type: "select", options:["Surprime", "Crédit"] },
                    { label: "Différence", type: "text" },
                    { label: "Honoraires", type: "text" },

                    { label: "Information complémentaire", type: "textarea" },

                    { label: "Confirmation au client", type: "select", options : ["Oui", "Non"] },

                ]
            },
            "Substitution de voiture": {
                template: `{{Type de communication}} {{Nom du client}}
Substitution de véhicule(s) en date du {{Date effective de la transaction}}

Risque(s) ajouté(s) sur la police :

{{RISQUES}}
Transaction {{État}} chez {{Assureur}} {{Méthode}}
{{Surprime/Crédit}} : {{Différence}}$
Honoraires : {{Honoraires}}$
Information complémentaire : {{Information complémentaire}}
Le client a été avisé de la différence de prime : {{Confirmation au client}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date effective de la transaction", type: "date" },

                    {
                        label: "Véhicule(s)",
                        type: "risques",
                        placeholder: "Ex: 2012 Hyundai Elantra",
                        showAddButton: true,
                        addButtonText: "Ajouter un véhicule",

                        extraFields: [
                            { label: "Véhicule à retirer", type: "text" },
                            { label: "Date d'achat du véhicule", type: "date" },
                            { label: "NIV", type: "text" },
                            { label: "État du véhicule", type: "select", options: ["Choisir","Usagé","Neuf","Démo"] },
                            { label: "Prix payé", type: "text" },
                            { label: "Présence d'un système d'alarme", type: "checkbox", hasDetails: true},
                            { label: "Kilométrage annuel", type: "text" },
                            { label: "Kilométrage pour se rendre au travail (1 trajet)", type: "text" },
                            { label: "Véhicule utilisé pour raisons professionnelles, transport de marchandises, personnes, des courses ou des expositions", type: "checkbox", hasDetails: true},
                            { label: "Véhicule modifié, adapté, reconstruit ou gravement accidenté", type: "checkbox", hasDetails: true},
                            { label: "Véhicule utilisé à l'extérieur du Québec pour plus de 3 semaines par année", type: "checkbox", hasDetails: true},
                            { label: "Présence d'un locateur ou créancier", type: "select", options: ["Non","Créancier","Locataire"], hasDetails: true },
                            { label: "Véhicule immatriculé au nom de l'assuré au dossier", type: "checkbox" },
                            { label: "Si non, détails", type: "text" },
                            { label: "Conducteur principal est l'assuré au dossier", type: "checkbox" },
                            { label: "Si non, détails", type: "text" },
                            { label: "Conducteur occasionnel", type: "textarea" },
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Tous risques", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Collision et renversement", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Tous risques sauf collision et renversement", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Risques spécifiés", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "INOV/Lauto Protection/Proplan", type: "checkbox"},
                            { label: "F.A.Q. 33", type: "checkbox"},
                            { label: "F.A.Q. 34", type: "checkbox"},
                            { label: "F.A.Q. 43AE", type: "select", options: ["Non admissible", "Pas interessé", "Oui"]},
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "État", type: "select", options:["émise", "en suspend"] },
                    { label: "Assureur", type: "select", options:["Intact", "L'Unique", "Promutuel", "Aviva", "Leclerc", "Echelon", "Soplex", "Morin Elliott", "Pafco", "Autre"] },
                    { label: "Méthode", type: "select", options:["dans leur portail", "par courriel"] },

                    { label: "Surprime/Crédit", type: "select", options:["Surprime", "Crédit"] },
                    { label: "Différence", type: "text" },
                    { label: "Honoraires", type: "text" },

                    { label: "Information complémentaire", type: "textarea" },

                    { label: "Confirmation au client", type: "select", options : ["Oui", "Non"] },

                ]
            },
            "Retrait de voiture": {
                template: `{{Type de communication}} {{Nom du client}}
Retrait de véhicule(s) en date du {{Date effective de la transaction}}

Risque(s) retiré(s) sur la police :

{{RISQUES}}
Méthode de confirmation reçu : {{Méthode de confirmation reçu}}
Transaction {{État}} chez {{Assureur}} {{Méthode}}
{{Surprime/Crédit}} : {{Différence}}$
Honoraires : {{Honoraires}}$
Information complémentaire : {{Information complémentaire}}
Le client a été avisé de la différence de prime : {{Confirmation au client}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date effective de la transaction", type: "date" },

                    {
                        label: "Véhicule(s)",
                        type: "risques",
                        placeholder: "Ex: 2012 Hyundai Elantra",
                        showAddButton: true,
                        addButtonText: "Autre véhicule à retirer",

                        extraFields: [
                            { label: "Raison du retrait", type: "textarea" },
                        ],

                    },
                    { label: "Méthode de confirmation reçu", type: "select", options:["Courriel", "Poste", "En attente", "Ne s'applique pas"] },
                    { label: "État", type: "select", options:["émise", "en suspend"] },
                    { label: "Assureur", type: "select", options:["Intact", "L'Unique", "Promutuel", "Aviva", "Leclerc", "Echelon", "Soplex", "Morin Elliott", "Pafco", "Autre"] },
                    { label: "Méthode", type: "select", options:["dans leur portail", "par courriel"] },

                    { label: "Surprime/Crédit", type: "select", options:["Surprime", "Crédit"] },
                    { label: "Différence", type: "text" },
                    { label: "Honoraires", type: "text" },

                    { label: "Information complémentaire", type: "textarea" },

                    { label: "Confirmation au client", type: "select", options : ["Oui", "Non"] },

                ]
            },
            "Autre demande": {
                template: `{{Type de communication}} {{Nom du client}}
Modification à émettre/émise en date du {{Date effective de la transaction}}

{{RISQUES}}
Méthode de confirmation reçu : {{Méthode de confirmation reçu}}
Transaction {{État}} chez {{Assureur}} {{Méthode}}
{{Surprime/Crédit}} : {{Différence}}$
Honoraires : {{Honoraires}}$
Information complémentaire : {{Information complémentaire}}
Le client a été avisé de la différence de prime : {{Confirmation au client}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date effective de la transaction", type: "date" },
                    {
                        type: "risques",
                        placeholder: "Ce qui va changer",
                        showRemoveButton: false,

                        extraFields: [
                            { label: "Information complémentaire", type: "textarea" },
                        ],

                    },
                    { label: "Méthode de confirmation reçu", type: "select", options:["Courriel", "Poste", "En attente", "Ne s'applique pas"] },
                    { label: "État", type: "select", options:["émise", "en suspend"] },
                    { label: "Assureur", type: "select", options:["Intact", "L'Unique", "Promutuel", "Aviva", "Leclerc", "Echelon", "Soplex", "Morin Elliott", "Pafco", "Autre"] },
                    { label: "Méthode", type: "select", options:["dans leur portail", "par courriel"] },

                    { label: "Surprime/Crédit", type: "select", options:["Surprime", "Crédit"] },
                    { label: "Différence", type: "text" },
                    { label: "Honoraires", type: "text" },

                    { label: "Information complémentaire", type: "textarea" },

                    { label: "Confirmation au client", type: "select", options : ["Oui", "Non"] },
                ]
            },
        },
        "Modification habitation": {
            "Ajout d'assuré(s)": {
                template: `{{Type de communication}} {{Nom du client}}
Ajout d'assuré(s) en date du {{Date effective de la transaction}}

Assuré(s) ajouté(s) sur la police :

{{RISQUES}}
Transaction {{État}} chez {{Assureur}} {{Méthode}}
{{Surprime/Crédit}} : {{Différence}}$
Honoraires : {{Honoraires}}$
Information complémentaire : {{Information complémentaire}}
Le client a été avisé de la différence de prime : {{Confirmation au client}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date effective de la transaction", type: "date" },

                    {
                        label: "Conducteur(s)/Assuré(s)",
                        type: "risques",
                        showAddButton: true,
                        addButtonText: "Ajouter assuré",
                        placeholder: "Nom complet de l'assuré",

                        extraFields: [
                            { label: "Date de naissance", type: "date" },
                            { label: "Emploi", type: "text" },
                            { label: "Employeur", type: "text" },
                            { label: "Lien avec propriétaire actuel", type: "text" },
                            { label: "Numéro de téléphone", type: "text" },
                            { label: "Adresse courriel", type: "text" },
                            { label: "Fumeur", type: "checkbox"},
                            { label: "Avec assurance assurance habitation sans interruption depuis", type: "text" },
                            { label: "Assureur précédent", type: "text" },
                            { label: "Numéro de police antérieur", type: "text"},
                            { label: "Annulé ou non-renouvelé par un assureur dans les trois dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Offert un renouvellement avec de conditions restrictives?", type: "checkbox", hasDetails: true},
                            { label: "Sinistres (réclamés ou non) en assurance habitation dans les 5 dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Est-ce que l'assuré ou une personne habitant sous votre toit avez un dossier judiciaire?", type: "checkbox", hasDetails: true},
                            { label: "Est-ce que l'assuré a fait faillite ou une proposition de consommateur dans les cinq dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Autorisation pour la cote de crédit?", type: "checkbox"},
                            { label: "Information complémentaire", type: "textarea" },
                        ],
                    },
                    { label: "État", type: "select", options:["émise", "en suspend"] },
                    { label: "Assureur", type: "select", options:["Intact", "L'Unique", "Promutuel", "Aviva", "Leclerc", "Echelon", "Soplex", "Morin Elliott", "Pafco", "Autre"] },
                    { label: "Méthode", type: "select", options:["dans leur portail", "par courriel"] },

                    { label: "Surprime/Crédit", type: "select", options:["Surprime", "Crédit"] },
                    { label: "Différence", type: "text" },
                    { label: "Honoraires", type: "text" },

                    { label: "Information complémentaire", type: "textarea" },

                    { label: "Confirmation au client", type: "select", options : ["Oui", "Non"] },

                ]
            }
        },
        "Mise à jour": {
            "Mise à jour - Automobile": {
                template: `{{Type de communication}} {{Nom du client}}
Mise à jour police automobile
Adresse au dossier : {{Adresse au dossier}}

Dossier mis à jour pour ces véhicules :

{{RISQUES}}
Un des conducteurs sur la police a-t-il déjà eu une suspension de permis? {{Un des conducteurs sur la police a-t-il déjà eu une suspension de permis?}}
Un des conducteurs sur la police a-t-il eu des infractions au Code de la route au courant des 3 dernières années? {{Un des conducteurs sur la police a-t-il eu des infractions au Code de la route au courant des 3 dernières années?}}
Un des conducteurs sur la police a-t-il eu des accidents non déclarés dans les 6 dernières années? {{Un des conducteurs sur la police a-t-il eu des accidents non déclarés dans les 6 dernières années?}}
Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive? {{Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?}}
Est-ce qu'un conducteur ou une personne habitant sous votre toit avez un dossier judiciaire? {{Est-ce qu'un conducteur ou une personne habitant sous votre toit avez un dossier judiciaire?}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Adresse au dossier", type: "text" },

                    {
                        label: "Véhicule(s)",
                        type: "risques",
                        placeholder: "Ex: 2012 Hyundai Elantra",
                        showAddButton: true,
                        addButtonText: "Ajouter un véhicule",

                        extraFields: [
                            { label: "Présence d'un système d'alarme", type: "checkbox", hasDetails: true},
                            { label: "Kilométrage annuel", type: "text" },
                            { label: "Kilométrage pour se rendre au travail (1 trajet)", type: "text" },
                            { label: "Véhicule utilisé pour raisons professionnelles, transport de marchandises, personnes, des courses ou des expositions", type: "checkbox", hasDetails: true},
                            { label: "Véhicule modifié, adapté, reconstruit ou gravement accidenté", type: "checkbox", hasDetails: true},
                            { label: "Véhicule utilisé à l'extérieur du Québec pour plus de 3 semaines par année", type: "checkbox", hasDetails: true},
                            { label: "Présence d'un locateur ou créancier", type: "select", options: ["Non","Créancier","Locataire"] },
                            { label: "Si oui, détails", type: "textarea" },
                            { label: "Membre FADOQ", type: "checkbox" },
                            { label: "Véhicule immatriculé au nom de l'assuré au dossier", type: "checkbox", hasDetails: true },
                            { label: "Si non, détails", type: "text" },
                            { label: "Conducteur principal est l'assuré au dossier", type: "checkbox" },
                            { label: "Si non, détails", type: "text" },
                            { label: "Conducteur occasionnel", type: "textarea" },
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Tous risques", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Collision et renversement", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Tous risques sauf collision et renversement", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Risques spécifiés", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "INOV/Lauto Protection/Proplan", type: "checkbox"},
                            { label: "F.A.Q. 33", type: "checkbox"},
                            { label: "F.A.Q. 34", type: "checkbox"},
                            { label: "F.A.Q. 43AE", type: "select", options: ["Non admissible", "Pas interessé", "Oui"]},
                            { label: "Autres", type: "textarea"},
                        ],
                    },
                    { label: "Un des conducteurs sur la police a-t-il déjà eu une suspension de permis?", type: "checkbox", hasDetails: true},
                    { label: "Un des conducteurs sur la police a-t-il eu des infractions au Code de la route au courant des 3 dernières années?", type: "checkbox"},
                    { label: "Un des conducteurs sur la police a-t-il eu des accidents non déclarés dans les 6 dernières années?", type: "checkbox"},
                    { label: "Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?", type: "checkbox"},
                    { label: "Est-ce qu'un conducteur ou une personne habitant sous votre toit avez un dossier judiciaire?", type: "checkbox"},
                    { label: "Information complémentaire", type: "textarea" },
                ]
            },
            "Mise à jour - Propriétaire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Mise à jour police habitation

Risques sur la police :

{{RISQUES}}
Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive? {{Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?}}
Est-ce qu'un conducteur ou une personne occupant sous votre toit avez un dossier judiciaire? {{Est-ce qu'une personne habitant sous votre toit a un dossier judiciaire?}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Rénovation effectués dans les dernières années", type: "textarea" },
                            { label: "Système d'alarme", type: "textarea" },
                            { label: "Cout de reconstruction calculé avec le CVA et combien sera mis pour la garantie", type: "textarea" },
                            { label: "Financement (créancier)", type: "textarea" },
                            { label: "Présence d'un commerce dans le batiment ou exercez-vous une profession à domocile", type: "checkbox", hasDetails: true},
                            { label: "Présence d'animaux domestiques", type: "checkbox", hasDetails: true },
                            { label: "Location de logement à autrui/autre personne habiterait dans un des logements vous appartenant", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous des objets de valeur (par exemple vélo, bijoux, collection, tracteur non plaqué ou autre", type: "checkbox", hasDetails: true },
                            { label: "Y a-t-il des travaux prévus sur la maison", type: "checkbox", hasDetails: true },
                            { label: "Quelqu'un qui habite dans le logement est-il un fumeur?", type: "checkbox"},
                            { label: "Avez-vous eu des sinistres non réclamés dans les 10 dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Membre FADOQ", type: "checkbox" },
                            { label: "Formulaire", type: "text"},
                            { label: "Batiment", type: "text"},
                            { label: "Montant global", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Biens meubles", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Spa/Piscine creusé", type: "checkbox"},
                            { label: "Spa/Piscine hors-terre", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de reconstruire le batiment", type: "checkbox"},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Entrée d'eau", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ]
                    },
                    { label: "Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?", type: "checkbox", hasDetails: true},
                    { label: "Est-ce qu'une personne occupant sous votre toit a un dossier judiciaire?", type: "checkbox", hasDetails: true},
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Mise à jour - Locataire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Mise à jour police habitation

Risques sur la police :

{{RISQUES}}
Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive? {{Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?}}
Est-ce qu'un conducteur ou une personne habitant sous votre toit avez un dossier judiciaire? {{Est-ce qu'une personne habitant sous votre toit a un dossier judiciaire?}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Présence d'un commerce dans le batiment ou exercez-vous une profession à domocile", type: "checkbox", hasDetails: true},
                            { label: "Présence d'animaux domestiques", type: "checkbox", hasDetails: true },
                            { label: "Location de logement à autrui/autre personne habiterait dans un des logements vous appartenant", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous des objets de valeur (par exemple vélo, bijoux, collection, tracteur non plaqué ou autre", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous eu des sinistres non réclamés dans les 10 dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Membre FADOQ", type: "checkbox" },
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Autres", type: "textarea"},
                        ]
                    },
                    { label: "Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?", type: "checkbox"},
                    { label: "Est-ce qu'une personne habitant sous votre toit a un dossier judiciaire?", type: "checkbox"},
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Mise à jour - Copropriétaire occupant": {
                template: `{{Type de communication}} {{Nom du client}}
Mise à jour police habitation

Risques sur la police :

{{RISQUES}}
Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive? {{Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?}}
Est-ce qu'un conducteur ou une personne habitant sous votre toit avez un dossier judiciaire? {{Est-ce qu'une personne habitant sous votre toit a un dossier judiciaire?}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Mis en vigueur chez", type: "text" },
                    { label: "Numéro de police", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Rénovation effectués dans les dernières années", type: "textarea" },
                            { label: "Présence d'un commerce dans le batiment ou exercez-vous une profession à domocile", type: "checkbox", hasDetails: true},
                            { label: "Présence d'animaux domestiques", type: "checkbox", hasDetails: true },
                            { label: "Location de logement à autrui/autre personne habiterait dans un des logements vous appartenant", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous des objets de valeur (par exemple vélo, bijoux, collection, tracteur non plaqué ou autre", type: "checkbox", hasDetails: true },
                            { label: "Y a-t-il des travaux prévus sur la maison", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous eu des sinistres non réclamés dans les 10 dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Membre FADOQ", type: "checkbox" },
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Améliorations locatives", type: "checkbox", hasDetails : true},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Vol d'identité", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Indemnisation sans obligation de remplacer les biens meubles", type: "checkbox"},
                            { label: "Assistance juridique", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ]
                    },
                    { label: "Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?", type: "checkbox", hasDetails: true},
                    { label: "Est-ce qu'une personne habitant sous votre toit a un dossier judiciaire?", type: "checkbox", hasDetails: true},
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Mise à jour - Copropriétaire loué": {
                template: `{{Type de communication}} {{Nom du client}}
Mise à jour police habitation

Risques sur la police :

{{RISQUES}}
Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive? {{Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?}}
Est-ce qu'un conducteur ou une personne habitant sous votre toit avez un dossier judiciaire? {{Est-ce qu'une personne habitant sous votre toit a un dossier judiciaire?}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    { label: "Date de Mise en vigueur", type: "date" },
                    { label: "Mis en vigueur chez", type: "text" },
                    { label: "Numéro de police", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Rénovation effectués dans les dernières années", type: "textarea" },
                            { label: "Présence d'un commerce dans le batiment ou exercez-vous une profession à domocile", type: "checkbox", hasDetails: true},
                            { label: "Présence d'animaux domestiques", type: "checkbox", hasDetails: true },
                            { label: "Location de logement à autrui/autre personne habiterait dans un des logements vous appartenant", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous des objets de valeur (par exemple vélo, bijoux, collection, tracteur non plaqué ou autre", type: "checkbox", hasDetails: true },
                            { label: "Y a-t-il des travaux prévus sur la maison", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous eu des sinistres non réclamés dans les 10 dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Membre FADOQ", type: "checkbox" },
                            { label: "Formulaire", type: "text"},
                            { label: "Biens meubles", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Frais de subsistance supplémentaire", type: "checkbox"},
                            { label: "Améliorations locatives", type: "checkbox", hasDetails : true},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ]
                    },
                    { label: "Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?", type: "checkbox", hasDetails: true},
                    { label: "Est-ce qu'une personne habitant sous votre toit a un dossier judiciaire?", type: "checkbox", hasDetails: true},
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
            "Mise à jour - Propriétaire loué": {
                template: `{{Type de communication}} {{Nom du client}}
Mise à jour police habitation

Risques sur la police :

{{RISQUES}}
Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive? {{Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?}}
Est-ce qu'un conducteur ou une personne habitant sous votre toit avez un dossier judiciaire? {{Est-ce qu'une personne occupant sous votre toit a un dossier judiciaire?}}
Information complémentaire : {{Information complémentaire}}
`,
                fields: [
                    { label: "Type de communication", type: "select", options: ["Choisir","Appel reçu de","Appel fait à","Courriel reçu de","Visite au bureau de"] },
                    { label: "Nom du client", type: "text" },
                    {
                        label: "Risques",
                        type: "risques",
                        placeholder: "Adresse (ex. 5080-5025 Boul Lapinière)",
                        showAddButton: true,
                        addButtonText: "Ajouter un risque",
                        extraFields: [
                            { label: "Rénovation effectués dans les dernières années", type: "textarea" },
                            { label: "Système d'alarme", type: "textarea" },
                            { label: "Cout de reconstruction calculé avec le CVA et combien sera mis pour la garantie", type: "textarea" },
                            { label: "Financement (créancier)", type: "textarea" },
                            { label: "Présence d'un commerce/d'activité commerciale dans le batiment", type: "checkbox", hasDetails: true},
                            { label: "Présence d'animaux domestiques", type: "checkbox", hasDetails: true },
                            { label: "Location de logement à autrui/autre personne habiterait dans un des logements vous appartenant", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous des objets de valeur (par exemple vélo, bijoux, collection, tracteur non plaqué ou autre", type: "checkbox", hasDetails: true },
                            { label: "Y a-t-il des travaux prévus sur la maison", type: "checkbox", hasDetails: true },
                            { label: "Avez-vous eu des sinistres non réclamés dans les 10 dernières années?", type: "checkbox", hasDetails: true},
                            { label: "Membre FADOQ", type: "checkbox" },
                            { label: "Formulaire", type: "text"},
                            { label: "Batiment", type: "text"},
                            { label: "Dépendances", type: "checkbox"},
                            { label: "Responsabilité Civile", type: "select", options: ["2 000 000","1 000 000"] },
                            { label: "Franchise", type: "select", options: ["Aucun", "250", "300", "500", "1000", "1500", "2000", "2500", "5000", "10000"] },
                            { label: "Incendie explosion et fumée suite à un tremblement de terre", type: "checkbox"},
                            { label: "Tremblement de terre", type: "checkbox", hasDetails : true},
                            { label: "Spa/Piscine creusé", type: "checkbox"},
                            { label: "Spa/Piscine hors-terre", type: "checkbox"},
                            { label: "Eau au-dessus du sol", type: "checkbox"},
                            { label: "Refoulement d'égouts et eau du sol", type: "checkbox", hasDetails : true},
                            { label: "Débordement de cours d'eau", type: "checkbox", hasDetails : true},
                            { label: "Entrée d'eau", type: "checkbox"},
                            { label: "Valeur locative", type: "checkbox", hasDetails : true },
                            { label: "Autres", type: "textarea"},
                        ]
                    },
                    { label: "Une personne mentionnée sur la police a-t-elle déjà eu une faillite/proposition de consommateur/annulation par un assureur/renouvellement avec des conditions restrictive?", type: "checkbox", hasDetails: true},
                    { label: "Est-ce qu'une personne occupant sous votre toit a un dossier judiciaire?", type: "checkbox", hasDetails: true},
                    { label: "Information complémentaire", type: "textarea" }
                ]
            },
        }
    };

    /* -------------------------
CRÉATION DU MENU
------------------------- */

    function createMenu(container,data){
        Object.keys(data).forEach(function(key){
            const item=document.createElement("div");
            item.textContent=key;
            item.style.padding="10px 16px";
            item.style.cursor="pointer";
            item.addEventListener("mouseenter",function(e){ e.currentTarget.style.background="#eee"; });
            item.addEventListener("mouseleave",function(e){ e.currentTarget.style.background="white"; });
            container.appendChild(item);

            if(typeof data[key]==="object" && !data[key].fields){
                const subMenu=document.createElement("div");
                subMenu.style.position="absolute";
                subMenu.style.right="100%";
                subMenu.style.bottom="0";
                subMenu.style.width="280px";
                subMenu.style.background="white";
                subMenu.style.display="none";
                subMenu.style.border = "none";
                subMenu.style.borderRadius = "4px";
                subMenu.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
                subMenu.style.padding = "6px 0";
                item.appendChild(subMenu);
                item.addEventListener("click",function(e){
                    e.stopPropagation();
                    if(subMenu.children.length===0){ createMenu(subMenu,data[key]); }
                    subMenu.style.display = subMenu.style.display==="none"?"block":"none";
                });
            } else {
                item.addEventListener("click",function(){ menu.style.display="none"; openNote(data[key],key); });
            }
        });
    }

    function styleInput(input){
        input.style.padding = "10px 12px";
        input.style.border = "1px solid #d6dbe6";
        input.style.borderRadius = "4px";
        input.style.fontSize = "13px";
        input.style.background = "#ffffff";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";
        input.style.outline = "none";
        input.style.transition = "all 0.15s ease";

        input.addEventListener("focus", function(){
            input.style.border = "1px solid #2c6bed";
            input.style.boxShadow = "0 0 0 2px rgba(44,107,237,0.15)";
        });

        input.addEventListener("blur", function(){
            input.style.border = "1px solid #d6dbe6";
            input.style.boxShadow = "none";
        });
    }

    /* -------------------------
FENÊTRE NOTE
------------------------- */

    function createWindow(title){
        const win = document.createElement("div");
        win.style.position = "fixed";
        if (!isElectron) {
            win.style.width = "1000px";
        }
        win.style.height = "800px";
        win.style.minWidth = "400px";
        win.style.minHeight = "300px";
        win.style.display = "flex";
        win.style.flexDirection = "column";
        win.style.zIndex = zIndexCounter++;
        win.style.left = "200px";
        win.style.top = "120px";

        win.style.border = "none";
        win.style.borderRadius = "4px";
        win.style.overflow = "hidden";
        win.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25)";
        win.style.background = "white";
        win.style.resize = "both";

        win.innerHTML = `
    <div class="header" style="
        background: linear-gradient(135deg, #2c6bed, #1f4fc1);
        color:white;
        padding:12px 16px;
        cursor:move;
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-weight:600;
        font-size:14px;
    ">
        <span>${title}</span>
        <div style="display:flex; gap:6px;">
            <button class="minBtn" style="
                background:rgba(255,255,255,0.15);
                border:none;
                color:white;
                width:28px;
                height:28px;
                border-radius:6px;
                cursor:pointer;
                font-size:16px;
            ">–</button>
            <button class="closeBtn" style="
                background:rgba(255,255,255,0.15);
                border:none;
                color:white;
                width:28px;
                height:28px;
                border-radius:6px;
                cursor:pointer;
                font-size:16px;
            ">✕</button>
        </div>
    </div>
    <div class="content" style="flex:1; display:flex; overflow:hidden; position:relative"></div>
    `;

        document.body.appendChild(win);

        const header = win.querySelector(".header");
        const minBtn = win.querySelector(".minBtn");

        win.querySelector(".closeBtn").onclick = function(){ win.remove(); };

        // =====================
        // MINIMIZE SYSTEM
        // =====================
        let taskbar = document.getElementById("customTaskbar");

        if(!taskbar){
            taskbar = document.createElement("div");
            taskbar.id = "customTaskbar";
            taskbar.style.position = "fixed";
            taskbar.style.bottom = "0";
            taskbar.style.left = "0";
            taskbar.style.width = "100%";
            taskbar.style.height = "40px";
            taskbar.style.display = "flex";
            taskbar.style.alignItems = "center";
            taskbar.style.padding = "5px";
            taskbar.style.gap = "5px";
            taskbar.style.zIndex = 99999;
            document.body.appendChild(taskbar);
        }

        minBtn.onclick = function(){
            win.style.display = "none";

            const btn = document.createElement("button");

            btn.style.display = "flex";
            btn.style.alignItems = "center";
            btn.style.justifyContent = "space-between";
            btn.style.width = "180px";

            btn.style.background = "#444";
            btn.style.color = "white";
            btn.style.border = "none";
            btn.style.borderRadius = "4px";
            btn.style.cursor = "pointer";
            btn.style.padding = "0";
            btn.style.overflow = "hidden";
            btn.style.justifyContent = "space-between";

            const label = document.createElement("span");
            label.textContent = title;

            label.style.flex = "1";
            label.style.padding = "5px 10px";
            label.style.whiteSpace = "nowrap";
            label.style.overflow = "hidden";
            label.style.textOverflow = "ellipsis";
            label.style.textAlign = "left";

            const closeMini = document.createElement("span");
            closeMini.textContent = "✕";

            closeMini.style.padding = "5px 8px";
            closeMini.style.background = "#444";
            closeMini.style.flexShrink = "0";
            closeMini.style.display = "flex";
            closeMini.style.alignItems = "center";

            closeMini.onclick = function(e){
                e.stopPropagation();
                win.remove();
                btn.remove();
            };

            // =================
            // CLICK RESTORE
            // =================
            btn.onclick = function(){
                win.style.display = "flex";
                win.style.zIndex = zIndexCounter++;
                btn.remove();
            };

            btn.appendChild(label);
            btn.appendChild(closeMini);
            taskbar.appendChild(btn);
        };

        // =====================
        // DRAG SYSTEM
        // =====================
        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        header.addEventListener("mousedown", function(e) {
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            win.style.zIndex = zIndexCounter++;
            document.body.style.userSelect = "none";
        });

        document.addEventListener("mousemove", function(e) {
            if (isDragging) {

                let newLeft = e.clientX - offsetX;
                let newTop = e.clientY - offsetY;

                const headerHeight = header.offsetHeight;

                const minTop = 0;
                const maxTop = window.innerHeight - headerHeight;

                const minLeft = -win.offsetWidth + 100;
                const maxLeft = window.innerWidth - 100;

                newTop = Math.max(minTop, Math.min(newTop, maxTop));
                newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));

                if (!isElectron) {
                    win.style.left = newLeft + "px";
                    win.style.top = newTop + "px";
                }
            }
        });

        document.addEventListener("mouseup", function() {
            isDragging = false;
            document.body.style.userSelect = "";
        });

        return win;
    }

    function openNote(data, title) {
        if (!data || !data.fields) return;

        let win;
let content;

if (isElectron) {
    // 🔥 MODE ELECTRON (plein écran)
    document.body.innerHTML = "";

    win = document.createElement("div");
    win.style.display = "flex";
    win.style.flexDirection = "column";
    win.style.height = "100vh";
    win.style.width = "100vw";
    win.style.background = "white";

    document.body.appendChild(win);

    const header = document.createElement("div");
    header.style.background = "#2c6bed";
    header.style.color = "white";
    header.style.padding = "12px 16px";
    header.style.fontWeight = "600";
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.textContent = title;

    win.appendChild(header);

    content = document.createElement("div");
    content.style.display = "flex";
    content.style.flex = "1";
    content.style.overflow = "hidden";

    win.appendChild(content);

} else {

        win = createWindow(title);
        content = win.querySelector(".content");

        const left = document.createElement("div");
        left.style.padding = "20px";
        left.style.borderRight = "1px solid #eee";
        left.style.overflowY = "auto";
        left.style.display = "flex";
        left.style.flexDirection = "column";
        left.style.flex = "1 1 50%";
        left.style.gap = "16px";
        left.style.background = "#f7f9fc";

        content.appendChild(left);

        const rightContainer = document.createElement("div");
        rightContainer.style.position = "relative";
        rightContainer.style.display = "flex";
        rightContainer.style.flexDirection = "column";
        rightContainer.style.flex = "1 1 50%";

        const right = document.createElement("textarea");
        right.style.flex = "1";
        right.style.padding = "15px";
        right.style.border = "none";
        right.style.resize = "none";
        right.style.overflowY = "auto";
        right.style.lineHeight = "1.5";

        rightContainer.appendChild(right);
        content.appendChild(rightContainer);

        left.style.position = "relative";
        right.style.position = "relative";
        left.style.minWidth = "0";
        rightContainer.style.minWidth = "0";

        let isPreviewVisible = true;

        const toggleBtn = document.createElement("span");
        toggleBtn.style.background = "rgba(255,255,255,0.15)";
        toggleBtn.style.border = "none";
        toggleBtn.style.color = "white";
        toggleBtn.style.width = "28px";
        toggleBtn.style.height = "28px";
        toggleBtn.style.borderRadius = "6px";
        toggleBtn.style.cursor = "pointer";
        toggleBtn.style.fontSize = "16px";
        toggleBtn.style.display = "flex";
        toggleBtn.style.alignItems = "center";
        toggleBtn.style.justifyContent = "center";
        toggleBtn.textContent = "⮜";

        toggleBtn.onclick = function(){
            isPreviewVisible = !isPreviewVisible;
            if(isPreviewVisible){
                win.style.width = "1000px";
                rightContainer.style.display = "flex";
                left.style.flex = "1 1 50%";
                rightContainer.style.flex = "1 1 50%";
                toggleBtn.textContent = "⮜";
                rightContainer.appendChild(copyBtn);
            } else {
                const leftWidth = left.offsetWidth;

                rightContainer.style.display = "none";
                left.style.flex = "1 1 100%";
                toggleBtn.textContent = "⮞";

                content.appendChild(copyBtn);

                const currentLeft = win.offsetLeft;

                if (!isElectron) {
                    win.style.width = leftWidth + "px";
                }

                const maxLeft = window.innerWidth - leftWidth;
                const minLeft = 0;

                const newLeft = Math.max(minLeft, Math.min(currentLeft, maxLeft));

                win.style.left = newLeft + "px";
            }
        };

        win.appendChild(toggleBtn);

        const btnContainer = win.querySelector(".header div");
        btnContainer.prepend(toggleBtn);

        const inputs = {};
        let risquesList;

        data.fields.forEach(function(f) {

            if (f.type === "risques") {
                createRisquesField(f);
                return;
            }

            const container = document.createElement("div");
            const lbl = document.createElement("label");
            lbl.textContent = f.label;
            lbl.style.fontWeight = "600";
            lbl.style.fontSize = "13px";
            lbl.style.color = "#333";
            lbl.style.marginBottom = "4px";
            container.appendChild(lbl);

            let input;

            if (f.type === "text") {
                input = document.createElement("input");
                input.type = "text";
            }

            if (f.type === "textarea") { input = document.createElement("textarea"); }

            if(f.type === "multiselect") {
                input = document.createElement("div");
                f.options.forEach(function(o){
                    const cbContainer = document.createElement("label");
                    cbContainer.style.display = "flex";
                    cbContainer.style.alignItems = "center";
                    cbContainer.style.gap = "4px";

                    const cb = document.createElement("input");
                    cb.type = "checkbox";
                    cb.value = o;
                    cb.style.transform = "scale(1.4)";

                    cb.addEventListener("change", updatePreview);

                    cbContainer.appendChild(cb);
                    cbContainer.appendChild(document.createTextNode(o));
                    input.appendChild(cbContainer);
                });
            }

            if (f.type === "select") {
                input = document.createElement("select");
                f.options.forEach(function(o) {
                    const op = document.createElement("option");
                    op.textContent = o;
                    input.appendChild(op);
                });
            }

            if(f.type === "checkbox") {
                input = document.createElement("input");
                input.type = "checkbox";
                input.style.transform = "scale(1)";

                if(f.hasDetails){
                    input.addEventListener("change", function(){
                        let existing = container.querySelector(".conditionalTextarea");

                        if(input.checked){
                            if(!existing){
                                const textarea = document.createElement("textarea");
                                textarea.classList.add("conditionalTextarea");
                                textarea.rows = 2;
                                textarea.style.width = "100%";
                                textarea.style.marginTop = "5px";
                                textarea.placeholder = "Si oui, détails";

                                textarea.addEventListener("input", updatePreview);

                                container.appendChild(textarea);
                            }
                        } else {
                            if(existing){
                                existing.remove();
                            }
                        }

                        updatePreview();
                    });
                }
            }

            if (f.type === "date") {
                input = document.createElement("input");
                input.type = "date";
            }

            if(input){
                styleInput(input);
            }

            if(input){
                container.appendChild(input);
                input.addEventListener("input", updatePreview);
                input.addEventListener("change", updatePreview);
                inputs[f.id || f.label] = input;
            }

            left.appendChild(container);
        });

        function createRisquesField(config) {
            const container = document.createElement("div");
            container.style.borderTop = "1px solid #ccc";
            container.style.marginTop = "10px";
            container.style.paddingTop = "10px";
            container.style.borderRadius = "4px";
            left.appendChild(container);

            const title = document.createElement("h3");
            title.textContent = config.label;
            container.appendChild(title);

            risquesList = document.createElement("div");
            container.appendChild(risquesList);

            createRisque();

            if (config.showAddButton) {

                const addBtn = document.createElement("button");
                addBtn.textContent = config.addButtonText;

                addBtn.style.background = "#2c6bed";
                addBtn.style.color = "white";
                addBtn.style.border = "none";
                addBtn.style.padding = "6px 10px";
                addBtn.style.borderRadius = "4px";
                addBtn.style.cursor = "pointer";
                addBtn.style.alignSelf = "flex-start";
                addBtn.style.width = "100%";

                container.appendChild(addBtn);

                addBtn.onclick = createRisque;
            }

            function createRisque() {
                const bloc = document.createElement("div");
                bloc.style.border = "1px solid #e3e7ef";
                bloc.style.borderRadius = "4px";
                bloc.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
                bloc.style.padding = "14px";
                bloc.style.marginBottom = "12px";
                bloc.style.display = "flex";
                bloc.style.flexDirection = "column";
                bloc.style.gap = "8px";
                bloc.style.background = "#fff";
                bloc.classList.add("risqueBloc");

                const isNouvelleAffaire = !config.extraFields || config.extraFields.length === 0;

                const vehiculeInput = document.createElement("input");
                vehiculeInput.placeholder = config.placeholder || "Description";
                vehiculeInput.classList.add("vehiculeInput");
                bloc.appendChild(vehiculeInput);

                if (config.extraFields && config.extraFields.length > 0) {
                    const extraContainer = document.createElement("div");
                    extraContainer.classList.add("extraFieldsContainer");
                    extraContainer.style.marginTop = "10px";
                    extraContainer.style.marginBottom = "8px";
                    container.style.borderRadius = "4px";
                    bloc.appendChild(extraContainer);

                    config.extraFields.forEach(function(f){
                        const fContainer = document.createElement("div");
                        fContainer.style.display = "flex";
                        fContainer.style.justifyContent = "space-between";
                        fContainer.style.alignItems = "center";
                        fContainer.style.gap = "10px";
                        fContainer.style.borderRadius = "4px";
                        fContainer.style.marginBottom = "8px";
                        fContainer.style.flexWrap = "nowrap";

                        const lbl = document.createElement("label");
                        lbl.textContent = f.label;
                        lbl.style.width = "200px";
                        lbl.style.flex = "0 0 200px";
                        fContainer.appendChild(lbl);

                        let input;

                        if (f.type === "text" || f.type === "date") {
                            input = document.createElement("input");
                            input.type = f.type === "date" ? "date" : "text";
                        }

                        else if(f.type === "checkbox") {
                            input = document.createElement("input");
                            input.type = "checkbox";

                            const rightSide = document.createElement("div");
                            rightSide.style.display = "flex";
                            rightSide.style.alignItems = "center";
                            rightSide.style.gap = "8px";
                            rightSide.style.flex = "1";
                            rightSide.style.justifyContent = "flex-end";

                            rightSide.appendChild(input);

                            if(f.hasDetails) {
                                const detailsContainer = document.createElement("div");
                                fContainer.appendChild(detailsContainer);

                                input.addEventListener("change", function(){
                                    detailsContainer.innerHTML = "";

                                    if(input.checked){
                                        const textarea = document.createElement("textarea");
                                        textarea.classList.add("conditionalTextarea");
                                        textarea.rows = 2; textarea.style.width = "100%";
                                        textarea.style.marginTop = "5px";
                                        textarea.style.borderRadius = "4px";
                                        textarea.placeholder = "Détails";

                                        textarea.addEventListener("input", updatePreview);
                                        detailsContainer.appendChild(textarea);
                                    }

                                    updatePreview();
                                });
                            }
                        }

                        else if (f.type === "select") {
                            input = document.createElement("select");

                            if (f.options) {
                                f.options.forEach(function(o){
                                    const option = document.createElement("option");
                                    option.value = o;
                                    option.textContent = o;
                                    input.appendChild(option);
                                });
                            }
                        }
                        else if(f.type === "multiselect") {
                            input = document.createElement("div");
                            f.options.forEach(function(o){
                                const cbContainer = document.createElement("label");
                                cbContainer.style.display = "flex";
                                cbContainer.style.alignItems = "center";
                                cbContainer.style.gap = "4px";

                                const cb = document.createElement("input");
                                cb.type = "checkbox";
                                cb.value = o;
                                cb.style.transform = "scale(1.4)";

                                cb.addEventListener("change", updatePreview);

                                cbContainer.appendChild(cb);
                                cbContainer.appendChild(document.createTextNode(o));
                                input.appendChild(cbContainer);
                            });
                        }
                        else if (f.type === "textarea") {
                            input = document.createElement("textarea");
                            input.rows = 3;
                            input.style.width = "100%";
                        }

                        if (input) {
                            styleInput(input);
                            const rightSide = document.createElement("div");
                            rightSide.style.display = "flex";
                            rightSide.style.alignItems = "center";
                            rightSide.style.gap = "8px";
                            rightSide.style.justifyContent = "flex-end";
                            rightSide.style.flex = "1";

                            rightSide.appendChild(input);
                            fContainer.appendChild(rightSide);
                            extraContainer.appendChild(fContainer);

                            input.addEventListener("input", updatePreview);
                            input.addEventListener("change", updatePreview);
                        }
                    });
                }

                if (config.protections) {
                    config.protections.forEach(function(p){
                        const isSimpleYesNo = p.includes("F.A.Q.") || p.includes("INOV/Lauto");
                        const row = document.createElement("div");
                        row.style.display = "inline-flex";
                        row.style.gap = "8px";
                        row.style.alignItems = "center";

                        const label = document.createElement("label");
                        label.textContent = p;
                        label.style.width = "150px";
                        row.appendChild(label);

                        if (isSimpleYesNo) {
                            const cb = document.createElement("input");
                            cb.type = "checkbox";
                            cb.style.transform = "scale(1.4)";
                            cb.addEventListener("change", updatePreview);
                            row.appendChild(cb);
                        } else {
                            const textInput = document.createElement("input");
                            textInput.type = "text";
                            textInput.style.border = "1px solid #d6dbe6";
                            textInput.style.borderRadius = "4px";
                            textInput.style.fontSize = "13px";
                            textInput.style.background = "#ffffff";
                            textInput.style.outline = "none";

                            const refusCheckbox = document.createElement("input");
                            refusCheckbox.type = "checkbox";
                            refusCheckbox.style.transform = "scale(1.4)";

                            const refusLabel = document.createElement("label");
                            refusLabel.textContent = "Refus :";

                            textInput.addEventListener("input", updatePreview);
                            refusCheckbox.addEventListener("change", updatePreview);

                            row.appendChild(textInput);
                            row.appendChild(refusLabel);
                            row.appendChild(refusCheckbox);
                        }

                        row.classList.add("protectionRow");
                        bloc.appendChild(row);
                    });
                }


                if (config.showRemoveButton !== false) {

                    const removeBtn = document.createElement("button");
                    removeBtn.textContent = "Supprimer";

                    removeBtn.style.background = "#d9534f";
                    removeBtn.style.color = "white";
                    removeBtn.style.border = "none";
                    removeBtn.style.padding = "6px 10px";
                    removeBtn.style.cursor = "pointer";
                    removeBtn.style.alignSelf = "flex-end";
                    removeBtn.style.borderRadius = "4px";
                    removeBtn.style.width = "100%";

                    removeBtn.onclick = function() {
                        risquesList.removeChild(bloc);
                        updatePreview();
                    };

                    bloc.appendChild(removeBtn);
                }
                risquesList.appendChild(bloc);
                vehiculeInput.addEventListener("input", updatePreview);

                updatePreview();
            }
        }

        function updatePreview(){
            let finalText = data.template;

            Object.keys(inputs).forEach(function(key){
                const inputElem = inputs[key];
                let val = "";

                if(inputElem.type === "checkbox"){
                    val = inputElem.checked ? "Oui" : "Non";

                    const container = inputElem.parentNode;
                    const textarea = container.querySelector(".conditionalTextarea");

                    if(inputElem.checked && textarea){
                        val += " - " + textarea.value;
                    }

                } else {
                    val = inputElem.value || "";
                }

                const tag = "{{"+key+"}}";
                finalText = finalText.split(tag).join(val);
            });

            if(finalText.indexOf("{{RISQUES}}") !== -1){
                let risquesText = "";

                risquesList.querySelectorAll(".risqueBloc").forEach(function(bloc){
                    const vehicule = bloc.querySelector(".vehiculeInput").value || "Non précisé";
                    risquesText += vehicule + "\n";

                    bloc.querySelectorAll(".protectionRow").forEach(function(row){
                        const label = row.querySelector("label").textContent;
                        const cb = row.querySelector("input[type=checkbox]");
                        const txtInput = row.querySelector("input[type=text]");

                        let val = "Non";
                        if(txtInput){
                            val = txtInput.value || "Oui";
                            if(cb && cb.checked) val = "Refusé";
                        } else if(cb){
                            val = cb.checked ? "Oui" : "Refusé";
                        }

                        risquesText += label + " : " + val + "\n";
                    });

                    const extraContainer = bloc.querySelector(".extraFieldsContainer");
                    if(extraContainer){
                        Array.from(extraContainer.children).forEach(function(fContainer){

                            const label = fContainer.querySelector("label").textContent;

                            const checkbox = fContainer.querySelector("input[type=checkbox]");
                            const textarea = fContainer.querySelector(".conditionalTextarea");
                            const input = fContainer.querySelector("input[type=text], input[type=date], textarea:not(.conditionalTextarea), select");

                            let val = "";

                            // 🔥 MULTISELECT (plusieurs checkbox)
                            const allCheckboxes = fContainer.querySelectorAll("input[type=checkbox]");

                            if (allCheckboxes.length > 1) {

                                let selected = [];

                                allCheckboxes.forEach(function(cb){
                                    if (cb.checked) {
                                        selected.push(cb.value);
                                    }
                                });

                                val = selected.length > 0 ? selected.join(", ") : "";

                            }

                            // 🔹 Checkbox simple
                            else if (allCheckboxes.length === 1) {

                                const checkbox = allCheckboxes[0];
                                val = checkbox.checked ? "Oui" : "Non";

                                if (checkbox.checked) {
                                    const textarea = fContainer.querySelector(".conditionalTextarea");
                                    if (textarea && textarea.value) {
                                        val += " - " + textarea.value;
                                    }
                                }

                            }

                            // 🔹 Autres inputs
                            else {
                                const input = fContainer.querySelector("input[type=text], input[type=date], textarea:not(.conditionalTextarea), select");
                                if (input) {
                                    val = input.value || "";
                                }
                            }

                            risquesText += label + " : " + val + "\n";
                        });
                    }

                    risquesText += "\n";
                });

                finalText = finalText.replace("{{RISQUES}}", risquesText);
            }

            right.value = finalText;
        }

        updatePreview();

        const copyBtn = document.createElement("button");
        copyBtn.textContent = "Copier";
        copyBtn.style.position = "absolute";
        copyBtn.style.bottom = "10px";
        copyBtn.style.right = "20px";
        copyBtn.style.zIndex = "1000";

        copyBtn.style.background = "#2c6bed";
        copyBtn.style.color = "white";
        copyBtn.style.border = "none";
        copyBtn.style.padding = "8px 14px";
        copyBtn.style.borderRadius = "4px";
        copyBtn.style.cursor = "pointer";
        copyBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
        copyBtn.onclick = function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(right.value);
            } else {
                const temp = document.createElement("textarea");
                temp.value = right.value;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand("copy");
                temp.remove();
            }
        };
        rightContainer.appendChild(copyBtn);

        if (isElectron && window.electronAPI) {
            setTimeout(function () {
                window.electronAPI.setSize(1200, 800);
            }, 50);
        }
    }}

    createMenu(menu,notesData);
    mainBtn.onclick=function(e){ e.stopPropagation(); menu.style.display=menu.style.display==="none"?"block":"none"; };
    document.addEventListener("click",function(){ menu.style.display="none"; });

})();