import { CLASSES } from "./personnage.js";

function setCompetence(competence, value, checked) {
    let input = document.getElementById(competence);
    if (input) {
        input.value = value;
    }

    let checkbox = document.getElementById(competence + "_checkbox");
    if (checkbox) {
        checkbox.checked = checked;
    }
}

function afficherValeursCompetences(personnage) {
    const competences = personnage.competences;
    const competencesPage = document.querySelectorAll("#competences li");
    const competenceSet = new Set(competences);

    competencesPage.forEach(competencePage => {
        const checkbox = competencePage.querySelector('input[type="checkbox"]');
        const competence = checkbox.id.replace('_checkbox', '');
        const competenceBonus = personnage.getBonus(competence);

        if (competenceSet.has(competence)) {
            setCompetence(competence, competenceBonus, true);
        } else {
            setCompetence(competence, 0, false);
        }
    });
}

function afficherValeursAttributs(personnage) {
    let attributs = personnage.attributs;

    Object.entries(attributs).forEach(([attr, val]) => {
        let input = document.getElementById(attr);
        input.value = val;
    });
}

function afficherValeursClasse(personnage) {
    const classe = document.querySelector("#classe").children;

    if (personnage.classe === null) {
        classe[0].selected = true;
    } else {
        const optionToSelect = document.querySelector(`select[name="classe"] option[value="${personnage.classe}"]`);
        if (optionToSelect) {
            optionToSelect.selected = true;
        }
    }
}

function afficherValeurNom(personnage) {
    const nom = document.querySelector("#nom");
    nom.value = personnage.nom;
}

function afficherEntetes(personnage) {
    const enteteAttributs = document.getElementById('enteteAttributs');
    const enteteCompetences = document.getElementById('enteteCompetences');
    
    enteteAttributs.textContent = `Attributs (${personnage.getAttributsChoisis()}/9)`;
    enteteCompetences.textContent = `Compétences (${personnage.getCompetencesChoisies()}/${personnage.getCompetencesAChoisir()})`;
}

function afficher(personnage) {
    afficherValeursAttributs(personnage);
    afficherValeursCompetences(personnage);
    afficherValeursClasse(personnage);
    afficherValeurNom(personnage);
    afficherEntetes(personnage); 
}

export { afficher };
