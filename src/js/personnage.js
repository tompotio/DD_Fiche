import { trouverParNom } from "./utils.js";

const FOR = "Force";
const DEX = "Dextérité";
const CON = "Constitution";
const INT = "Intelligence";
const SAG = "Sagesse";
const CHA = "Charisme";

const ATTRIBUTS = [FOR, DEX, CON, INT, SAG, CHA];

const COMPETENCES = [
  { nom: "Acrobaties", attribut: DEX },
  { nom: "Arcanes", attribut: INT },
  { nom: "Artisanat", attribut: INT },
  { nom: "Athlétisme", attribut: FOR },
  { nom: "Connaissance", attribut: INT },
  { nom: "Diplomatie", attribut: CHA },
  { nom: "Discrétion", attribut: DEX },
  { nom: "Duperie", attribut: CHA },
  { nom: "Intimidation", attribut: CHA },
  { nom: "Larcin", attribut: DEX },
  { nom: "Médecine", attribut: SAG },
  { nom: "Nature", attribut: SAG },
  { nom: "Occultisme", attribut: INT },
  { nom: "Religion", attribut: SAG },
  { nom: "Représentation", attribut: CHA },
  { nom: "Société", attribut: INT },
  { nom: "Survie", attribut: SAG },
];

const CLASSES = [
  {
    nom: "Barde",
    attributsPrincipaux: [CHA],
    competencesLibres: 4,
    competencesFixes: ["Occultisme", "Représentation"],
  },
  {
    nom: "Druide",
    attributsPrincipaux: [SAG],
    competencesLibres: 3,
    competencesFixes: ["Nature"],
  },
  {
    nom: "Guerrier",
    attributsPrincipaux: [DEX, FOR],
    competencesLibres: 2,
    competencesFixes: ["Acrobaties", "Athlétisme"],
  },
  {
    nom: "Magicien",
    attributsPrincipaux: [INT],
    competencesLibres: 2,
    competencesFixes: ["Arcanes"],
  },
  {
    nom: "Prêtre",
    attributsPrincipaux: [SAG],
    competencesLibres: 3,
    competencesFixes: ["Religion"],
  },
  {
    nom: "Rôdeur",
    attributsPrincipaux: [FOR, DEX],
    competencesLibres: 4,
    competencesFixes: ["Nature", "Survie"],
  },
  {
    nom: "Roublard",
    attributsPrincipaux: [DEX],
    competencesLibres: 8,
    competencesFixes: ["Discrétion"],
  },
  {
    nom: "Sorcier",
    attributsPrincipaux: [INT],
    competencesLibres: 4,
    competencesFixes: [],
  },
];

const ATTRIBUTS_A_CHOISIR = 9;
const BONUS_MIN = 0;
const BONUS_MAX = 4;

class Personnage {
  constructor(nom) {
    this.nom = nom;
    this.classe = null;
    this.attributs = {};
    ATTRIBUTS.forEach((attribut) => (this.attributs[attribut] = 0));
    this.competences = [];
  }

  getBonus(competence) {
    const { attribut } = trouverParNom(COMPETENCES, competence);
    const bonusQualification = this.competences.includes(competence) ? 2 : 0;
    return this.attributs[attribut] + bonusQualification;
  }

  getAttributsChoisis() {
    return Object.values(this.attributs).reduce((sum, val) => sum + val, 0);
  }

  getCompetencesAChoisir() {
    if (!this.classe) {
      return 0;
    }
    const { competencesLibres, competencesFixes } = trouverParNom(
      CLASSES,
      this.classe
    );
    return competencesLibres + competencesFixes.length;
  }

  ajouterCompetence(competence) {
    if (!this.competences.includes(competence)) {
      this.competences.push(competence);
    }
  }

  retirerCompetence(competence) {
    const index = this.competences.indexOf(competence);
    if (index >= 0) {
      this.competences.splice(index, 1);
    }
  }

  getCompetencesChoisies() {
    return this.competences.length;
  }
}

export default Personnage;
export {
  ATTRIBUTS,
  COMPETENCES,
  CLASSES,
  ATTRIBUTS_A_CHOISIR,
  BONUS_MIN,
  BONUS_MAX,
};
