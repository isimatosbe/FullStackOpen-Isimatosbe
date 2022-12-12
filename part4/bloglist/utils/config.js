require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URL = process.env.REACT_APP_MONGO_URL

module.exports = {
  MONGO_URL,
  PORT
}