const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const winnerRef = db.collection('matches');
        const snapshot = await winnerRef.where('winnerId', '==', `${id}`).get();
            if(snapshot.empty){
                res.sendStatus(404);
                return;
            }
        matchWinners = [];
        snapshot.forEach(doc =>{
            const data = doc.data();
            matchWinners.push(data);
        })
        res.send(matchWinners);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;




// const getDatabase = require('../database.js')
// const db = getDatabase()


// const express = require('express');
// const router = express.Router();

// router.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     const matchRef= db.collection('matches');
//     const snapshot = await matchRef.where('winnerId', '==', `${id}`).get();
    

//     if(snapshot.empty){
//         res.sendStatus(404);
//         return;
//     }
//     let item = [];
//     snapshot.forEach((doc)=>{
//         const data = doc.data();
//         // data.id = doc.id;
//         item.push(data);
//     });
//     res.status(200).send(item);
// });

// module.exports = router;