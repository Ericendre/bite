
express = require("express");
app = express();
path = require('path');
appDir = path.dirname(require.main.filename);
db = require("./src/firebase.js")(
    require(appDir +"/SuperSecretAuth.json"),
    "https://projet-surfer-russe-default-rtdb.europe-west1.firebasedatabase.app"
);




app.use(express.static('public'));
app.enable('trust proxy')

app.get("/", (req, res) => {
  res.sendFile(appDir + '/public/index.html')
});
app.get("/login", (req, res) => {
  res.sendFile(appDir + '/public/login.html')
});
app.get("/register", (req, res) => {
  res.sendFile(appDir + '/public/register.html')
});
app.get("/stats/:id", (req, res) => {
  res.sendFile(appDir + '/public/stats.html')
});


const listener = app.listen(20000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.use("/bdd", require("./src/routes.js"))