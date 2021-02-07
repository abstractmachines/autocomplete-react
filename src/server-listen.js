// This port being opened is isolated to its own file such that API tests run
// independently on their own port.
const app = require('./server')
const port = 3001;

app.listen(port, () => console.log(`Typeahead server listening on port ${port}!`))
