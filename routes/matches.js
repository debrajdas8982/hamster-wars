const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const matchesRef = db.collection('matches');
        const snapshot = await matchesRef.get();
        if(snapshot.empty){
        res.send([]);
        return;
        }
        let matches = [];
        snapshot.forEach(document => {
            const data = document.data();
            data.id = document.id
            matches.push(data);
    });
    res.send(matches); 
    } catch (error) {
        res.status(500).send(error.message);  
    }
})

router.get('/:id', async (req, res) =>{
    try {
        const id = req.params.id;
        const docRef = await db.collection('matches').doc(id).get();
            if(!docRef.exists){
                res.sendStatus(404);
                return;
            }
        const data = docRef.data();
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send(error.message); 
    } 
})

router.post('/', async (req, res) =>{
    try {
        const object = req.body;
        if(!isMatchesObject(object)){
            res.sendStatus(400);
            return;
        }
        const docRef = await db.collection('matches').add(object);
        matchId = {
            id: docRef.id
        }
        res.status(200).send(matchId);   
    } catch (error) {
        res.status(500).send(error.message); 
    } 
})

router.put('/:id', async (req, res) => {
    try {
        const object = req.body;
        const id = req.params.id;
            if(!isMatchesObject(object)){
                res.sendStatus(400);
                return;
        } else if(!id){
                res.sendStatus(404);
                return;
        }
        const docRef = db.collection('matches').doc(id)
        await docRef.set(object, {merge: true})
        res.sendStatus(200);   
    } catch (error) {
        res.status(500).send(error.message); 
    }  
})

router.delete('/:id', async (req, res) =>{
    try {
        const id = req.params.id;
        const docRef = await db.collection('matches').doc(id).get();
    
        if(!docRef.exists){
            res.sendStatus(404);
            return;
        } 
        await db.collection('matches').doc(id).delete();
        res.sendStatus(200);  
    } catch (error) {
        res.status(500).send(error.message);
    }
})

function isMatchesObject(match){
    if(!match){
        return false;
    }else if(!match.winnerId || !match.loserId){
        return false;
    }else {
        return true;
    }
}

module.exports = router;




// const getDatabase = require('../database.js')
// const db = getDatabase()


// const express = require('express');
// const router = express.Router();


// //GET /matches/

// router.get('/', async (req, res) => {

//     const matchRef = db.collection('matches');
//     const snapshot = await matchRef.get();
//     if (snapshot.empty) {
//         res.send([]);
//         return;
//     }
//     let match = [];
//     snapshot.forEach(doc => {
//         const data = doc.data();
//         data.id = doc.id
//         match.push(data);
//     });
//     res.send(match);
// })

// //GET /matches/:id


// router.get('/:id', async (req, res) => {
    
//         const id = req.params.id;
//         const matchRef = await db.collection('matches').doc(id).get();

//         if (!matchRef.exists) {
//             res.sendStatus(404)
//             return;
//         }

//         const data = matchRef.data();
//         data.id = matchRef.id;
//         res.send(data);
    
// });

// //POST /matches/

// router.post('/', async (req, res) => {
// 	const object = req.body;
// 	if (!object || !object.winnerId || !object.loserId) {
// 		console.log(object);
// 		res.sendStatus(400);
// 		return;
// 	}
// 	const matchRef = await db.collection('matches').add(object);
// 	res.status(200).send({ id: matchRef.id });
// 	return;
// });

// //DELETE /matches

// router.delete('/:id', async (req, res) => {
// 	const id = req.params.id;
// 	const matchRef = await db.collection('matches').doc(id).get();

	
// 		if (!matchRef.exists) {
// 			res.sendStatus(404);
// 			return;
// 		} else if (!id) {
// 			res.sendStatus(400);
// 			return;
// 		}

// 		await db.collection('matches').doc(id).delete();
// 		res.sendStatus(200);
	
// });

// module.exports = router;