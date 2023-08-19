const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const req = require("express/lib/request");
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ceramic",
});

var corsOptions = {
  // origin: "http://localhost:4200"
  origin: "http://localhost:9500",
  // origin: "http://localhost:8500"
  // origin: "http://localhost:6400"
};
app.use(cors(corsOptions));
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("L'API est accessible via le port " + port);
});

app.get("/", async (req, res) => {
  res.json({ status: "Pret a y aller" });
});

app.get("/qr_codes", async (req, res) => {
  const query = "SELECT idCode FROM qr_codes ORDER BY idCode DESC LIMIT 1";
  pool.query(query, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results[0].idCode);
    }
  });
});

app.get("/utilisateurs", async (req, res) => {
  const query = "SELECT * FROM utilisateurs";
  pool.query(query, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results);
    }
  });
});

app.get("/lastuser", async (req, res) => {
  const query =
    "SELECT idUser,nom, telephone,date_inscription FROM `utilisateurs` ORDER BY idUser DESC LIMIT 10";
  pool.query(query, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results);
    }
  });
});

app.get("/scan", async (req, res) => {
  const query =
    "SELECT U.idUser, nom, telephone, COUNT(S.idScan) AS scan, (COUNT(S.idScan)*300) AS merite FROM utilisateurs U, scan S, qr_codes Q WHERE S.idCode = Q.idCode AND S.idUser = U.idUser AND S.valider = 0 GROUP BY S.idUser ORDER BY COUNT(S.idScan) DESC";
  pool.query(query, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results);
    }
  });
});
// const idCode = req.param(idCode = 3);
app.put("/validate", async (req, res) => {
  const data = {
    idUser: req.body.idUser,
  };
  const query = "UPDATE scan SET valider = 1 WHERE idUser = CAST(? AS INT)";
  pool.query(query, data.idUser, (error) => {
    if (error) {
      res.json({ status: "failure", raison: error.code });
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

// var form = {
//   username: 'ceramic',
//   password: 'ceramic'
// }
//  var formData = querystring(form);
//  var contentLength = formData.length

app.get("/ceramicauth", async (req, res) => {
  var mdp = "";
  const data = {
    // nom: req.body.nom,
    password: req.body.password,
  };
  const query = "SELECT password FROM `utilisateurs` WHERE nom = 'ceramic'";
  pool.query(query, (error, results) => {
    if (!results) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results[0].password);
      // mdp = results[0].password;
      //       console.log(mdp);
      // if(data.password != mdp){
      //   console.log("mot de passe incorrect");
      // } else{
      //   console.log("Connection......");
      // }
    }
  });

  // app.get("/ceramicauth", async (req, res)=> {
  //   var mdp = ""
  //   const data = {
  //     // nom: req.body.nom,
  //     password: req.body.password
  //   }
  //   const query = "SELECT password FROM `utilisateurs` WHERE nom = 'ceramic'";
  //   pool.query(query, (error, results) => {
  //     if(!results){
  //       res.json({status: "Not Found!"});
  //     }else{
  //       res.json(results);
  //       mdp = results[0].password;
  //       console.log(mdp);
  // if(data.password != mdp){
  //   console.log("mot de passe incorrect");
  // } else{
  //   console.log("Connection......");
  // }

  //     }
  //   });

  // const querys = "SELECT nom, password FROM `utilisateurs` WHERE nom = ? AND password = ?";
  // pool.query(querys,Object.values(data), (error, results) => {
  //   if(results[0].nom != "ceramic" || results[0].password != ""){
  //     res.json({status: "Not Found!"});
  //   }else{
  //     res.json(results);
  //   }
  // });
});

app.post("/addcode", async (req, res) => {
  const data = {
    qrCode: req.body.qrCode,
  };
  const query = "INSERT INTO qr_codes(qrCode) VALUES (?)";
  pool.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", raison: error.code });
    } else {
      res.json({ status: "success" });
    }
  });
});
