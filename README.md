# Typeahead monorepo w frequency occurrence sort autocomplete for React

- [Demo / Screenshots](#demo-screenshots)
- [Runbook](#runbook)

> A typeahead React component to add tags to a server/database/collection.

- Autocomplete dropdown list sorted by frequency occurrences of tags
- "Add a new tag" to items to search for them later

- Note: The data transformations could happen on the front end (wrt sorting 
et al) in [`server.js`](./src/server.js). Maybe could be in Sagas or helpers.


## Demo screenshots

> Searching - either add a new tag, or use search function by typing

![Add tags with form](./demo/add-tags-1.png "Add tags")

> Autocomplete tags sorted by frequency occurrence and returned to user

- User can enter any term they like to add as a tag

![Add tags filter for search](./demo/add-tags-2-filter.png "Add tags filter")

![Add tags filter for search](./demo/add-tags-3-filter.png "Add tags filer")

> Confirmation message upon tag receipt

- focus styles
- transitions, animations

![Add tags confirmation](./demo/added-tag.png "Added tags confirmation")

## Runbook

- git clone
- `npm install`
- `npm start`
- `npm test` // UI and API testing w Supertest
