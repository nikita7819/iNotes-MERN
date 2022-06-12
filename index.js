const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

connectToMongo()
app.use(express.json())
app.use(cors())

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.use(express.static(path.join(__dirname,"/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build","index.html"));
});
 

app.listen(process.env.PORT || 5000, () => {
  console.log("app is listening")
})

