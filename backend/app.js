//Backend
const express = require("express");
const app = express();
const todopath = "/homeappliancelists";
const helmet = require("helmet");
const mysql = require("mysql2");
const cors = require("cors");
const port = 3000;

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "P@ssw0rd",
  database: "db_homeappliancelist",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("接続が成功しました！");
});

// データを表示
app.get(todopath, (req, res) => {
  const selectQuery = `SELECT * FROM homeappliancelist`;
  connection.query(selectQuery, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

// 新しい家電をデータベースに追加
app.post(todopath, (req, res) => {
  const {
    homeappliance_name,
    purchase_date,
    warranty_data,
    warranty_file_name,
  } = req.body;

  const insertQuery = `
    INSERT INTO homeappliancelist (homeappliance_name, purchase_date, warranty_data, warranty_file_name)
    VALUES (?, ?, NULL, ?)
  `;

  connection.query(
    insertQuery,
    [homeappliance_name, purchase_date, warranty_data, warranty_file_name],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("データの挿入中にエラーが発生しました。");
      } else {
        res.end();
      }
    }
  );
});

app.delete(`${todopath}/:id`, (req, res) => {
  const requestId = Number(req.params.id);
  const deleteQuery = `
    DELETE
    FROM   homeappliancelist
    WHERE  id=${requestId}
  `;
  connection.query(deleteQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
