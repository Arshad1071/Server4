require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5002;
// const User = require('./model/User');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(cors()); // Enable CORS for all routes and origins

app.use(
  bodyParser.urlencoded(
    { extended: false }
  )
)

app.use(bodyParser.json())

// const userRoute = require('./router/user');



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// app.use('/api/user',userRoute)


mongoose.connect(process.env.MONGODB_URL)

app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));