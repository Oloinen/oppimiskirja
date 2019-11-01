const Pool = require("pg").Pool;
const conopts = {
  user: "sammakko",
  password: "sammakko1",
  host: "localhost",
  database: "topickanta"
};
const pool = new Pool(conopts);

function getTopics(callback) {
  pool.connect((err, client) => {
    client.query("SELECT * FROM topic", (err, data) => {
      client.release();
      callback(data.rows);
    });
  });
}

function getTopicById(req, callback) {
  pool.connect((err, client) => {
    client.query(
      "SELECT * FROM topic where id = $1",
      [req.params.id],
      (err, data) => {
        client.release();
        callback(data.rows);
      }
    );
  });
}

function createTopic(req, callback) {
  const { title, description, timetomaster, timespent, source, startlearningdate, inprogress } = req.body;
  console.log(req.body);
  pool.connect((err, client) => {
    client.query(
      "INSERT INTO topic (title, description, timetomaster, timespent, source, startlearningdate, inprogress) values ($1, $2, $3, $4, $5, $6, $7)",
      [title, description, timetomaster, timespent, source, startlearningdate, inprogress],
      (err, data) => {
        client.release();
        callback("Topicit lisätty");
      }
    );
  });
}

function deleteTopic(req, callback) {
  pool.connect((err, client) => {
    client.query(
      "DELETE FROM topic WHERE id = $1",
      [req.params.id],
      (err, data) => {
        client.release();
        callback("Entry likvidoitu!");
      }
    );
  });
}
function updateTopic(req, callback) {
  const { title, description, timetomaster, timespent, source, startlearningdate, inprogress } = req.body;
  const id = parseInt(req.params.id);
  if (!req.body.kaupunki) {
    pool.connect((err, client) => {
      client.query(
        "UPDATE users set nimi = $1, sposti = $2 where id = $3",
        [nimi, sposti, id],
        (err, data) => {
          client.release();
          callback("Käyttäjää möyhitty!");
        }
      );
    });
  } else {
    pool.connect((err, client) => {
      client.query(
        "UPDATE users set nimi = $1, sposti = $2, kaupunki = $3 where id = $4",
        [nimi, sposti, kaupunki, id],
        (err, data) => {
          client.release();
          callback("Käyttäjää möyhitty kunnolla!");
        }
      );
    });
  }
}

module.exports = { getTopics, getTopicById, createTopic, updateTopic, deleteTopic };
