

class TLGBD {
  constructor(dbName, tableName, successCallback, errorCallback) {
    this.dbName = dbName;
    this.tableName = tableName;
    this.db = null;

    // Ouvrir la base de données lors de l'instanciation
    this.ouvrirBaseDeDonnees(successCallback, errorCallback);
  }

  ouvrirBaseDeDonnees(successCallback, errorCallback) {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(this.tableName, { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = (event) => {
      this.db = event.target.result;
      console.log("Base de données ouverte avec succès !");
      successCallback();
    };

    request.onerror = (event) => {
      console.error("Erreur lors de l'ouverture de la base de données", event.target.errorCode);
      errorCallback();
    };
  }

  ajouterUtilisateur(nom, prenom, username, session, successCallback, errorCallback) {
    const transaction = this.db.transaction(this.tableName, "readwrite");
    const objectStore = transaction.objectStore(this.tableName);

    const nouvelUtilisateur = { nom, prenom, username, session };
    const ajout = objectStore.add(nouvelUtilisateur);

    ajout.onsuccess = () => {
      console.log("Utilisateur ajouté avec succès !");
      successCallback();
    };

    ajout.onerror = () => {
      console.error("Erreur lors de l'ajout de l'utilisateur");
      errorCallback();
    };
  }

  lireUtilisateurParId(userId, callback) {
    const transaction = this.db.transaction(this.tableName, "readonly");
    const objectStore = transaction.objectStore(this.tableName);

    const demande = objectStore.get(userId);

    demande.onsuccess = (event) => {
      const utilisateur = event.target.result;
      callback(utilisateur);
    };

    demande.onerror = () => {
      console.error("Erreur lors de la lecture de l'utilisateur");
      callback(null);
    };
  }

  mettreAJourUtilisateur(userId, updatedData, successCallback, errorCallback) {
    const transaction = this.db.transaction(this.tableName, "readwrite");
    const objectStore = transaction.objectStore(this.tableName);

    const miseAJour = objectStore.put(updatedData, userId);

    miseAJour.onsuccess = () => {
      console.log("Utilisateur mis à jour avec succès !");
      successCallback();
    };

    miseAJour.onerror = () => {
      console.error("Erreur lors de la mise à jour de l'utilisateur");
      errorCallback();
    };
  }

  supprimerUtilisateur(userId, successCallback, errorCallback) {
    const transaction = this.db.transaction(this.tableName, "readwrite");
    const objectStore = transaction.objectStore(this.tableName);

    const suppression = objectStore.delete(userId);

    suppression.onsuccess = () => {
      console.log("Utilisateur supprimé avec succès !");
      successCallback();
    };

    suppression.onerror = () => {
      console.error("Erreur lors de la suppression de l'utilisateur");
      errorCallback();
    };
  }

  lireTousLesUtilisateurs(callback) {
    const transaction = this.db.transaction(this.tableName, "readonly");
    const objectStore = transaction.objectStore(this.tableName);

    const utilisateurs = [];
    const requete = objectStore.openCursor();

    requete.onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        utilisateurs.push(cursor.value);
        cursor.continue();
      } else {
        callback(utilisateurs);
      }
    };
  }
}

// Exemple d'utilisation
const successCallback = () => {
  console.log("Opération réussie !");
};

const errorCallback = () => {
  console.error("Opération échouée !");
};

const gestionnaireDB = new TLGBD("TECusers", "users", successCallback, errorCallback);

// Ajouter un utilisateur
gestionnaireDB.ajouterUtilisateur("Doe", "John", "john.doe", "123456", ()=>{
  console.log("utilisateurs ajouté")
}, errorCallback);

// Lire tous les utilisateurs
gestionnaireDB.lireTousLesUtilisateurs((utilisateurs) => {
  console.log("Liste des utilisateurs :", utilisateurs);
});

// Lire un utilisateur spécifique
gestionnaireDB.lireUtilisateurParId(1, (utilisateur) => {
  if (utilisateur) {
    console.log("Utilisateur trouvé :", utilisateur);
  } else {
    console.log("Utilisateur non trouvé");
  }
});

// Mettre à jour un utilisateur
const updatedData = { nom: "Doe", prenom: "Jane", username: "jane.doe", session: "654321" };
gestionnaireDB.mettreAJourUtilisateur(1, updatedData, successCallback, errorCallback);

// Supprimer un utilisateur
gestionnaireDB.supprimerUtilisateur(1, successCallback, errorCallback);
