const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestionvehicular",
});

// const db = mysql.createConnection({
//     host: 'srv4',
//     database: 'gestion_vehicular',
//     user: 'gestion_vehicular',
//     password: 'gestion_vehicular'
// });

const upload = multer({ store: multer.memoryStorage() });

db.connect(function (err) {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos establecida");
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE usuario = ? AND clave = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json("Error");
    if (result.length > 0) {
      res.json("Ingreso Correcto");
    } else {
      res.status(400).json("Usuario o contraseña incorrectos");
    }
  });
});

/*--------------------LOGIN-------------------*/
app.post("/login/", (req, res) => {
  const sql = "SELECT * FROM login WHERE correo = ? AND clave = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json("Error");
    if (result.length > 0) {
      const userId = result[0].id;
      res.json({ message: "Ingreso Correcto", userId });
    } else {
      res.status(400).json("Usuario o contraseña incorrectos");
    }
  });
});
/*--------------------FIN LOGIN-------------------*/

app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const consulta = `SELECT nombre, apellido FROM login    WHERE id = ${id}`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

/*--------------------VEHICULOS-------------------*/
app.get("/vehiculos", (req, res) => {
  const consulta = "SELECT * FROM vehiculo";
  db.query(consulta, (err, rows) => {
    if (err) {
      console.log("error en la consulta de vehiculos por placa");
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.get("/vehiculos/:placa", (req, res) => {
  const placa = req.params.placa;
  const consulta = `SELECT * FROM vehiculo WHERE placa = '${placa}'`;
  db.query(consulta, (err, rows) => {
    if (err) {
      console.log("error en la consulta de vehiculos por placa");
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.get("/mantenimientosProceso/:placa", (req, res) => {
  const placa = req.params.placa;
  const consulta = `SELECT vm.fechaInicio, vm.fechaFin, vm.costo, m.nombreMantenimiento, m.tipoMantenimiento
    FROM vehiculo as v
    JOIN vehiculo_mantenimiento as vm
    ON v.IDVehiculo =vm.IDVehiculo 
    JOIN mantenimiento m 
    ON m.IDMantenimiento =vm.IDMantenimiento 
    WHERE v.placa = '${placa}' and vm.fechaFin is null`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.get("/mantenimientosHistorial/:placa", (req, res) => {
  const placa = req.params.placa;
  const consulta = `SELECT vm.fechaInicio, vm.fechaFin, vm.costo, m.nombreMantenimiento, m.tipoMantenimiento
    FROM vehiculo as v
    JOIN vehiculo_mantenimiento as vm
    ON v.IDVehiculo =vm.IDVehiculo 
    JOIN mantenimiento m 
    ON m.IDMantenimiento =vm.IDMantenimiento 
    WHERE v.placa = '${placa}' and vm.fechaFin is not null`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.get("/recorridosProceso/:placa", (req, res) => {
  const placa = req.params.placa;
  const consulta = `SELECT re.fechaInicio, re.fechaFin, re.horaInicio, re.horaFin, re.KMInicio, re.KMFin, r.ubiInicio, r.ubiFin
    FROM vehiculo as v
    JOIN recorre re
    ON re.IDVehiculo = v.IDVehiculo 
    JOIN ruta r 
    ON r.IDRuta = re.IDRuta 
    WHERE v.placa = '${placa}' and re.fechaFin is null`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.get("/recorridosProceso/:placa", (req, res) => {
  const placa = req.params.placa;
  const consulta = `SELECT re.fechaInicio, re.fechaFin, re.horaInicio, re.horaFin, re.KMInicio, re.KMFin, r.ubiInicio, r.ubiFin
    FROM vehiculo as v
    JOIN recorre re
    ON re.IDVehiculo = v.IDVehiculo 
    JOIN ruta r 
    ON r.IDRuta = re.IDRuta
    WHERE v.placa = '${placa}' and re.fechaFin is not null`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.post("/vehiculos", (req, res) => {
  const {
    placa,
    modelo,
    anio,
    estado,
    tipoCombustible,
    foto,
    peso,
    kilometraje,
    observacionEstado,
    fechaBaja,
  } = req.body;
  const consulta = `INSERT INTO vehiculo (placa, modelo, anio, estado, tipoCombustible, foto, peso, kilometraje, observacionEstado, fechaBaja) VALUES ('${placa}', '${modelo}', ${anio}, '${estado}', '${tipoCombustible}', ${foto}, ${peso}, ${kilometraje}, '${observacionEstado}', '${fechaBaja})`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send("Vehiculo ingresado correctamente");
    }
  });
});

app.post("/vehiculos", upload.single("fotoVehiculo"), (req, res) => {
  const {
    placa,
    modelo,
    anio,
    estado,
    tipoCombustible,
    foto,
    peso,
    kilometraje,
    observacionEstado,
    fechaBaja,
  } = req.body;
  const consulta = `INSERT INTO vehiculo (placa, modelo, anio, estado, tipoCombustible, foto, peso, kilometraje, observacionEstado, fechaBaja) VALUES ('${placa}', '${modelo}', '${anio}', '${estado}', '${tipoCombustible}', '${foto}', '${peso}', '${kilometraje}', '${observacionEstado}', '${fechaBaja}')`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send("Vehiculo ingresado correctamente");
    }
  });
});

app.delete("/vehiculos/:placa", (req, res) => {
  const placa = req.params.placa;
  const consulta = `DELETE FROM vehiculo WHERE placa = '${placa}'`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send("Vehiculo eliminado correctamente");
    }
  });
});

app.get("/mantenimiento", (req, res) => {
  const consulta = `SELECT * FROM mantenimiento`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.post("/mantenimiento", (req, res) => {
  const { idMantenimiento, idvehiculo, costo, fechaInicio } = req.body;

  const consulta = `INSERT INTO vehiculo_mantenimiento (idMantenimiento, idvehiculo, costo, fechaInicio, fechaFin, exitoso)  VALUES (${idMantenimiento}, ${idvehiculo}, ${costo}, '${fechaInicio}', null, FALSE)`;

  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send("Mantenimiento ingresado correctamente");
    }
  });
});

app.post("/chofer", upload.single("fotoChofer"), (req, res) => {
  const {
    nombre,
    apellido,
    telefono,
    edad,
    cedula,
    sexo,
    sangre,
    licencia,
    correo,
    foto,
  } = req.body;
  console.log(req.body);
  const consulta = `INSERT INTO chofer (nombreChofer, apellidoChofer, numTelefono, edad, CI,sexo, tipoSangre, licencia, correo,foto) VALUES ('${nombre}', '${apellido}', ${telefono}, '${edad}', '${cedula}', '${sexo}', '${sangre}', '${licencia}', '${correo}', '${foto}')`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send("Chofer ingresado correctamente");
    }
  });
});

app.get("/choferes/:cedula", (req, res) => {
  const consulta = `SELECT * FROM chofer WHERE CI = '${req.params.cedula}'`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.get("/choferes", (req, res) => {
  const consulta = "SELECT * FROM chofer;";
  db.query(consulta, (err, data) => {
    err ? res.json(err) : res.json({ choferes: data });
  });
});

app.delete("/choferes/:IDChofer", (req, res) => {
  const consulta = `DELETE FROM chofer WHERE IDChofer = '${req.params.IDChofer}'`;
  db.query(consulta, (err, data) => {
    err ? res.json(err) : res.json({ choferes: data });
  });
});

app.put("/chofer/:id", upload.single("fotoChofer"), (req, res) => {
  const idChofer = req.params.id;
  const {
    nombre,
    apellido,
    telefono,
    edad,
    cedula,
    sexo,
    sangre,
    licencia,
    correo,
    foto,
  } = req.body;
  console.log(req.body);
  const consulta = `
    UPDATE chofer 
    SET 
      nombreChofer = '${nombre}',
      apellidoChofer = '${apellido}',
      numTelefono = ${telefono},
      edad = '${edad}',
      CI = '${cedula}',
      sexo = '${sexo}',
      tipoSangre = '${sangre}',
      licencia = '${licencia}',
      correo = '${correo}'
      ${foto ? `, foto = '${foto}'` : ""}
    WHERE idChofer = ${idChofer}`;
  db.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send("Chofer actualizado correctamente");
    }
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
  console.log("http://localhost:8000");
});
