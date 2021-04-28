const getDatabase = require('../database.js')
const db = getDatabase()


const express = require('express');
const router = express.Router();


//GET /matches/

router.get('/', async (req, res) => {

    const matchRef = db.collection('matches');
    const snapshot = await matchRef.get();
    if (snapshot.empty) {
        res.send([]);
        return;
    }
    let match = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        data.id = doc.id
        match.push(data);
    });
    res.send(match);
})

//GET /matches/:id


router.get('/:id', async (req, res) => {
    
        const id = req.params.id;
        const matchRef = await db.collection('matches').doc(id).get();

        if (!matchRef.exists) {
            res.sendStatus(404)
            return;
        }

        const data = matchRef.data();
        // data.id = matchRef.id;
        res.send(data);
    
});

//POST /matches/

router.post('/', async (req, res) => {
	const object = req.body;
	if (!object.winnerId && !object.loserId) {
		console.log(object);
		res.sendStatus(400);
		return;
	}
	const matchRef = await db.collection('matches').add(object);
	res.status(200).send({ id: matchRef.id });
	return;
});

//DELETE /matches

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const matchRef = await db.collection('matches').doc(id).get();

	
		if (!matchRef.exists) {
			res.sendStatus(404);
			return;
		} else if (!id) {
			res.sendStatus(400);
			return;
		}

		await db.collection('matches').doc(id).delete();
		res.sendStatus(200);
	
});

module.exports = router;