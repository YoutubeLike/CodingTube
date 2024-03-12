const express = require('express');
const app = express();
const cors = require('cors');
const mariadb = require('./src/database');

app.use(cors())

console.log(app)

app.listen(5000, () => {
      console.log('server listening on port 5000')
})

app.get('/', (req, res) => {
    mariadb.pool.query("SELECT * FROM user").then((value) => {
        res.send(value[0]["username"])
    })
})

