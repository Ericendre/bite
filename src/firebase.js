/* 
  ••• DOCUMENTATION •••
  
  Cette documentation est dans l'ordre, la variable "c" est une variable imaginaire qui est egale a la fonction appeler avant
  
  Firebase.login() // Permet de ce login a la base de donnée est avoir la base de donnée
  > c.GetDocFromCollection(string Collection, string Document) // Selectionner un document dans une collection par leur noms
  >> c.Save(Table, Merge) // Sauvegarder la nouvelle table du document (merge permet de fusionner la table existante et la nouvelle table)
  >> c.Load().then(function) // Permet de recuperer le data du document (utiliser la fonction Data() pour récuperer la table)
  >>> c.IsData // Permet de savoir si la table existe ou non
  >>> c.Data // Permet de recupérer la table du document
*/

const admin = require("firebase-admin");

module.exports = function(cred, dbUrl){
  admin.initializeApp({credential: admin.credential.cert(cred),
                    databaseURL: dbUrl});

  const db = admin.firestore();
  const settings = {timestampsInSnapshots: true};

  db.settings(settings);
  
  return {
    GetDocFromCollection : function(Collection, Doc){
      let k = db.collection(Collection).doc(Doc)
      return {
        Save : function(Tbl, Merge){
          let m = Merge || false
          return k.set(Tbl, {merge: Merge}).then(function(){
            return {"Statue":true};
          }).catch(function(error){
            return {"Statue":false, "Error":error};
          });
        },
        Load : function(){
          return k.get().then(function(data){
            return {
              IsData : data.exists,
              Data: data.data()
            }
          });
        }
      };
    }
  };
};

