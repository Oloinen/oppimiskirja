var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const uuid = require('uuidv4').default;
let app = express();
app.use(bodyParser.json());
let parser = bodyParser.urlencoded({ extended: true});

let materials = [];

fs.readFile('materials.json', function(err, data) {
  console.log('Materiaalit luettu');
  materials = JSON.parse(data);
  console.dir(materials);
})

/* GET users listing. */
router
.get('/', function(req, res, next) {
  console.log("Rest-get toimii");
  fs.readFile('materials.json', function(err, data) {
    console.log('Materiaalit luettu');
    materials = JSON.parse(data);
    console.dir(materials);
    res.json(materials);
  })
})

router.post('/', (req, res) => {
  console.dir(req.body)
  let uusiTopic = req.body;
  uusiTopic.id = uuid();
  materials.push(uusiTopic);
  saveMaterials();
  console.log('Luodaan uutta topicia...')
  res.status(201);
  res.json(uusiTopic);
  res.end();
  //return res.send('Received a POST HTTP method');
})

router.route('/topics/:id')
.delete((req, res) => {
    console.log("Delete: " + req.params.id);
    for (let i=0;i<materials.length;i++) {
        if (materials[i].id == req.params.id) {
            materials.splice(i,1);
            res.json({msg:"deleted: "+req.params.id})
            saveMaterials();
            return;
        }
    }
    res.json({ msg: "Ei löydy" });
})
.put((req, res) => {

})

function saveMaterials() {
    fs.writeFile('materials.json', JSON.stringify(materials), () => {console.log('Topicit tallennettu')});
}


/*let server = app.listen(3000, function () {
    let host = server.address().address;
    fs.readFile('materials.json', function(err, data) {
        console.log('Materiaalit luettu');
        materials = JSON.parse(data);
        console.dir(materials);
    })
    let port = server.address().port
    console.log('Another one bites the dust! http://%s:%s', host, port)
})*/

module.exports = router;
