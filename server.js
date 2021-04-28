const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters')
const matches = require('./routes/matches')
const matchWinner = require('./matchWinner')

const PORT = process.env.PORT || 1755
const staticFolder = path.join(__dirname, 'static')




app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.params);
	next()
})

app.use( express.json() )
app.use( cors() )
app.use( express.static(staticFolder) )




// Routes

// REST API

app.use('/hamsters', hamsters);
app.use('/matches',matches);
app.use('/matchWinner', matchWinner);






app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})
