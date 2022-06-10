const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors');
const app = express()

connectToMongo()
app.use(express.json())
app.use(cors())

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
 }

app.listen(5000, () => {
  console.log("app is listening")
})

