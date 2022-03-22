const App = require('./app')
require('dotenv').config()

App.app.listen(process.env.PORT || 5000, () => {
    console.log('App rodando porta', process.env.PORT)
})