const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

//create a route for the front end to request data fromn 
//get requires two arguments- a string that describes the client fetch route. and a callback
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/animals', (req, res) => {
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    //req body is where our incoming content will be

    //if any data in req.body is incorrect, send 400 error bacl
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        //add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals)
        res.json(animal);
    }
});


module.exports = router;