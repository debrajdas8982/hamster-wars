const getDatabase = require('../database.js')
const db = getDatabase()


const express = require('express');
const router = express.Router();


//GET 

router.get('/', async (req, res) => {
    const hamstersRef = db.collection('hamsters');
    const snapshot = await hamstersRef.get();
    if(snapshot.empty){
        res.send([]);
        return;
    }
    let hamsters = [];
    snapshot.forEach(document => {
        const data = document.data();
        data.id = document.id
        hamsters.push(data);
    });
    res.send(hamsters);
})

//GET:id

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = await db.collection('hamsters').doc(id).get();

	if (!docRef.exists) {
		res.status(404).send('Sorry, Specific hamster does not exist!');
		return;
	}

	const data = docRef.data();
	res.send(data);
});

//POST 

router.post('/', async (req, res) =>{
    const object = req.body;

    if(isHamsterObject(object)){
        res.sendStatus(400);
        return;
    }
    const docRef = await db.collection('hamsters').add(object);
    res.send({id: docRef.id});
})


//PUT
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const object = req.body;

	let docRef = await db.collection('hamsters').doc(id).get();

	if (isHamsterObject(object) || !Object.keys(object).length) {
		res.sendStatus(400);
		return;
	} else if (!docRef.exists) {
		res.sendStatus(404);
		return;
	}
	await db.collection('hamsters').doc(id).set(object, {
		merge: true
	});
	res.sendStatus(200);
});

//DELETE /hamsters/:id

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = await db.collection('hamsters').doc(id).get();

	if (!docRef.exists) {
		res.sendStatus(404);
		return;
	}

	if (!id) {
		res.sendStatus(400);
		return;
	}

	await db.collection('hamsters').doc(id).delete();
	res.sendStatus(200);
});


//RANDOM /hamsters

router.get('/random', async (req, res) => {
    const hamstersRef = db.collection('hamsters');
    const snapshot = await hamstersRef.get();
    if(snapshot.empty){
        res.send([]);
        return;
    } 
    let hamsters = [];
    snapshot.forEach(document => {
        const data = document.data();
        data.id = document.id
        hamsters.push(data);
    });
    let random = Math.floor(Math.random() * hamsters.length);
    res.send(hamsters[random]); 
})


function isHamsterObject(hamster){
    if(!hamster){
        return false;
    }else if(!hamster.name || !hamster.age || !hamster.favFoods || !hamster.loves || !hamster.imgName || !hamster.wins || !hamster.defeats || !hamster.games){
        return false;
    }else {
        return true;
    }
}





module.exports = router;