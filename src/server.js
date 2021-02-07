const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// TBD: Postgres / kv store
let typeaheadResults = [
  'polyurethane',
  'lacquer nitrocellulose',
  'lacquer acrylic',
  'C neck',
  'C chunky neck',
  'D neck',
  'V neck',
  'U neck',
  'baseball bat neck',
  'Mint',
  'Excellent Condition',
  'Very Good Condition',
  'Good Condition',
  'Fair Condition',
  'Poor Condition'
];

const addFrequencyCount = (arr) => {
  return arr.reduce((acc, curr) => {
    curr = curr.toLowerCase()
    if (acc[curr]) {
      acc[curr] += 1
    } else {
      acc[curr] = 1 
    }
    return acc;
  }, []);
}

const sortItems = (items) => items.sort( ([key, value], [key2, value2]) => value2 - value)

const searchTermsKeys = (keyValuePairs) => {
  const sortedKeys = []
  keyValuePairs.forEach(keyValPair => {
  const [key, value] = keyValPair
  sortedKeys.push(key)
  })
  return sortedKeys
}

const getSortedFreshData = (typeaheadResults) => {
   // could have used a hash table to count frequency occurrences instead of reduce
   if (typeaheadResults) {
    const resultsWithCount = addFrequencyCount(typeaheadResults)
    const keyValuePairs = Object.entries(resultsWithCount)
    const sortedEntries = sortItems(keyValuePairs)
    return searchTermsKeys(sortedEntries)
   }
   return []
}

app.get('/typeahead', (req, res) => {
  res.status(200)
  const updatedSearchTerms = getSortedFreshData(typeaheadResults)
  res.send(updatedSearchTerms)
});

app.post('/add', (req, res) => {
  // Maybe not just 201 (resource created + location). 200? 202/accepted?
  res.status(201)
  const obj = req.body
  Object.values(obj).forEach(value => typeaheadResults.push(value))
  const updatedSearchTerms = getSortedFreshData(typeaheadResults)
  res.send(updatedSearchTerms)
})

module.exports = app
