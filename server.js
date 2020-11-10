//require express
const express = require('express');
const PORT = process.env.PORT || 3001;
//assign to app variable so that you can chain methods to the express server later
const app = express()
//create variable to require data from animals
const { animals } = require('./data/animals.json');


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //save the animals array as filteredresults
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //save personality traits as a dedicated array 
        //personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        ///loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            )
        });
    }

    if (query.diet) {
        filteredResults  
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }

    return filteredResults;

}

//create a route for the front end to request data fromn 
//get requires two arguments- a string that describes the client fetch route. and a callback
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});

//chain the listen method to the server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})
