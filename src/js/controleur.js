import { afficher } from "./affichage.js";
import Personnage, { CLASSES } from "./personnage.js";

class Controleur {
  constructor() {
    this.personnage = new Personnage();
  }

  save() {
    localStorage.setItem("personnage", JSON.stringify(this.personnage));
  }

  load() {
    if (localStorage.getItem('personnage') !== null) {    
      const personnage = localStorage.getItem("personnage");
      const jsonPersonnage = JSON.parse(personnage);

      this.personnage.nom = jsonPersonnage.nom;
      this.personnage.classe = jsonPersonnage.classe;
      this.personnage.attributs = jsonPersonnage.attributs;
      this.personnage.competences = jsonPersonnage.competences;
      
      console.log("Load successful...");

      afficher(this.personnage);
    }
  }

  setNom(nom) {
    this.personnage.nom = nom;
    afficher(this.personnage);
    this.save();
  }

  setAttribut(attr, val) {
    if (!(typeof attr === "string" && typeof val === "string")) {
      console.error("passed values are not of the correct type.");
      return;
    }

    // Aucun attribut doit être inférieur à 0 et dépasser 4.
    if (val < 0 || val > 4) {
      this.save();
      afficher(this.personnage);
      return;
    }

    if (val.length === 0) {
      this.personnage.attributs[attr] = 0;
      this.save();
      afficher(this.personnage);
      return;
    }

    const lastValue = this.personnage.attributs[attr];
    this.personnage.attributs[attr] = parseInt(val);

    // L'utilisateur ne doit pas avoir plus de 9 points d'attributs.
    if (this.personnage.getAttributsChoisis() > 9) {
      this.personnage.attributs[attr] = lastValue;
    }

    this.save();
    afficher(this.personnage);
  }

  setClasse(classe) {
    this.personnage.classe = classe
    this.personnage.competences.forEach(competence => {
          this.personnage.retirerCompetence(competence)
    });
    
    CLASSES.find((el) => el.nom === classe).competencesFixes.forEach(competence => {
      this.personnage.ajouterCompetence(competence);
    }) 

    this.save();
    afficher(this.personnage);
  }


  addCompetence(competence) {
    // Interdiction de sélectionner une compétence sans avoir de classe.
    if (this.personnage.classe === null) {
      this.save();
      afficher(this.personnage);
      return;
    }

    // L'utilisateur ne peut pas sélectionner plus de compétences que sa classe ne l'autorise.
    if (this.personnage.getCompetencesChoisies() < this.personnage.getCompetencesAChoisir()) {
      this.personnage.ajouterCompetence(competence);
    }

    this.save();
    afficher(this.personnage);
  }

  removeCompetence(competence) {
    const classe = CLASSES.find((el) => el.nom === this.personnage.classe);
    const estCompetenceFixe = classe.competencesFixes.some((el) => el === competence);

    // L'utilisateur ne peut pas déselectionner une compétence fixe.
    if (estCompetenceFixe) {
      this.save();
      afficher(this.personnage);
      return;
    }

    this.personnage.retirerCompetence(competence);
    this.save();
    afficher(this.personnage);
  }
}

const controleur = new Controleur();

export { controleur };
