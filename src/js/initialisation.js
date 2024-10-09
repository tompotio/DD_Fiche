import { ATTRIBUTS, COMPETENCES, CLASSES } from './personnage.js';

function initialiserAttributs() {
    const ul = document.getElementById("attributs");

    ATTRIBUTS.forEach(attr => {
        let li = document.createElement("li");
        li.innerHTML = `
            <label for="${attr}">${attr}:</label>
            <input type="number" id="${attr}" value="0" class="champ" />
        `;
          
        ul.appendChild(li);
  });
}

function initialiserCompetences() {
    const ul = document.getElementById("competences");

    COMPETENCES.forEach(competence => {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" id="${competence.nom}_checkbox" />
            <label for="${competence.nom}_checkbox">${competence.nom}:</label>
            <input id="${competence.nom}" value="0" class="champ" readonly />
        `;

        ul.appendChild(li);
    });
}

function initialiserClasses() {
    const select = document.getElementById("classe");

    CLASSES.forEach(classe => {
        let option = document.createElement("option");
        option.value = classe.nom;
        option.text = classe.nom;

        select.appendChild(option);
    });
}

function initialiser() {
    initialiserAttributs();
    initialiserCompetences();
    initialiserClasses();
}

export { initialiser };