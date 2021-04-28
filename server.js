const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters')

const PORT = process.env.PORT || 1339
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






app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})
