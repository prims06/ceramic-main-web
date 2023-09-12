const express = require("express");
const mysql = require("mysql");
var crypto = require("crypto");
const app = express();
const cors = require("cors");
const req = require("express/lib/request");
const { json } = require("body-parser");
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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
    "SELECT U.idUser, nom, telephone, COUNT(S.idScan) AS scan, (COUNT(S.idScan)*300) AS merite FROM utilisateurs U, scan S, qr_codes Q WHERE S.idCode = Q.idCode AND S.idUser = U.idUser AND S.valider = 2 GROUP BY S.idUser ORDER BY COUNT(S.idScan) DESC";
  pool.query(query, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results);
    }
  });
});

app.get("/paiements", async (req, res) => {
  const query =
  "SELECT U.telephone, COUNT(S.idScan)*300 as merite FROM scan S, utilisateurs U WHERE S.valider = 3 AND S.idUser = U.idUser GROUP BY S.date_valid ORDER BY S.date_valid DESC LIMIT 10";
  pool.query(query, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results);
    }
  });
});

app.get("/findcode/:code", async (req, res) => {
  const code = req.params.code
  const query = "SELECT Q.qrCode, U.idUser, U.nom, U.telephone, S.valider FROM utilisateurs U, scan S, qr_codes Q WHERE U.idUser = S.idUser AND Q.idCode = S.idCode AND Q.qrCode = ?";
  pool.query(query,code, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results);
    }
  });
});



app.get("/scan-detail/:idUser", async (req, res) => {
  const idUser = req.params.idUser
  const query = "SELECT  idScan, qrCode, date_scan, valider FROM scan S, qr_codes Q WHERE S.idCode = Q.idCode AND S.idUser = ? ORDER BY S.idScan DESC"
  pool.query(query, idUser, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results);
    }
  });
});


app.get("/stats", async (req, res) => {
  const query =
  "SELECT (SELECT COUNT(*) FROM utilisateurs)AS users, (SELECT COUNT(*) FROM scan WHERE valider=2) AS awaiting";
  pool.query(query, (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" });
    } else {
      res.json(results[0]);
    }
  });
});



app.put("/validate", async (req, res) => {
  const data = {
    idUser: req.body.idUser,
  };
  const query = "UPDATE scan SET valider = 3 WHERE idUser = CAST(? AS INT)";
  pool.query(query, data.idUser, (error) => {
    if (error) {
      res.json({ status: "failure", raison: error.code });
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

app.post("/login",  (req, res) => {
  var mdp = req.body.pwd||'';
  
  const query = "SELECT password FROM `utilisateurs` WHERE nom = 'ceramic'";
  pool.query(query, (error, results) => {
    if (!results) {
      res.json({ status: "Not Found!" });
    } else {
      const nouveauHachage = crypto
        .createHash("sha1")
        .update(mdp)
        .digest("hex");

      if (nouveauHachage === results[0].password) {
        console.log("Le mot de passe est valide.");
        res.json({status:200});
      } else {
        console.log("Le mot de passe est invalide.");
        res.json({status:401});
      }
      
    }
  });
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



// SELECT (COUNT(idScan)*300) as price FROM `scan` WHERE valider = 0 AND idUser = ?
// SELECT COUNT(idScan) as nonValider FROM `scan` WHERE valider = 0 AND idUser = ?
// SELECT (SELECT COUNT(*) FROM utilisateurs)AS users, (SELECT COUNT(*) FROM scan WHERE valider=0) AS awaiting
