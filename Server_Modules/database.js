var router = express.Router();


router.get("/plages", async function(req, res) {

});










router.get("/database", async function(req, res) {
    var Key = req.query.Key;
    if (!Key){res.status(200).json({"Statue": "Error", Message: "No valid key"}); return;}
    
    var Base = db.GetDocFromCollection("test", Key);
    var D = await Base.Load();
    var ToSend;
    if (D.IsData){
      ToSend = {"Statue": "Success", Data: D.Data};
    }else{
      ToSend = {"Statue": "Error", Message: "No data"};
    }
    
    res.status(200).json(ToSend);
});
  
router.post("/database", async function(req, res) {
    var Key = req.query.Key;
    var MoreInfo = req.query.MoreInfo;
    var Merge = !ParseToBool(req.query.Overwrite);
    var Body = req.body;
    if (!Key){res.status(200).json({"Statue": "Error", Message: "No valid key"}); return;}
    if (!Body){res.status(200).json({"Statue": "Error", Message: "No valid body"}); return;}
    if (Merge == "Error"){res.status(200).json({"Statue": "Error", Message: "No Merge value must be a boolean"}); return;}
    
    var Base = db.GetDocFromCollection("UserSettings", Key);
    var BefDb,AfDb;
    if(MoreInfo){
      BefDb = await Base.Load();
    }
    var Final = await Base.Save(Body, Merge);
    var ToSend;
    if (Final.Statue){
      if(MoreInfo){
        AfDb = await Base.Load();
        ToSend = {"Statue": "Success", Before: BefDb.Data, After: AfDb.Data};
      }else{
        ToSend = {"Statue": "Success"};
      }
    }else{
      ToSend = {"Statue": "Error", "Message": Final.Error};
    }
    
    res.status(200).json(ToSend);
});

module.exports = router;