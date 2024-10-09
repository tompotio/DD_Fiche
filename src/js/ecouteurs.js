import { controleur } from "./controleur.js";

function nameListener(event) {
    controleur.setNom(event.target.value);
}

function classeListener(event) {
    controleur.setClasse(event.target.value);
}

function attributListener(event) {
    controleur.setAttribut(event.target.id, event.target.value);
}

function competencesListener(event) {
    if (event.target.type === "checkbox" && event.target.nodeName === "INPUT") {
        let competenceNom = event.target.id;

        if (competenceNom.endsWith('_checkbox')) {
            competenceNom = competenceNom.slice(0, -9);
        }

        if (event.target.checked) {
            controleur.addCompetence(competenceNom);
        } else {
            controleur.removeCompetence(competenceNom);
        }
    }
}

function ajouterEcouteurs() {
    const nom = document.querySelector("#nom");
    const classe = document.querySelector("#classe");
    const inputAttributs = document.querySelectorAll("#attributs input");
    const competences = document.querySelector("#competences");
    
    nom.addEventListener("input", nameListener);

    classe.addEventListener("change", classeListener);

    inputAttributs.forEach(input => {
        input.addEventListener("input", attributListener);
    });

    competences.addEventListener("click", competencesListener);
    controleur.load();
}

export { ajouterEcouteurs };
