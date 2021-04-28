const getDatabase = require('./database.js')
const db = getDatabase()


const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    const id = req.params.id;
    const matchRef= db.collection('matches');
    const snapshot = await matchRef.where('winnerId', '==', `${id}`).get();
    // console.log('hello', snapshot);

    if(snapshot.empty){
        res.sendStatus(404);
        return;
    }
    let item = [];
    snapshot.forEach((doc)=>{
        const data = doc.data();
        data.id = doc.id;
        item.push(data);
    });
    res.status(200).send(item);
});



module.exports = router;