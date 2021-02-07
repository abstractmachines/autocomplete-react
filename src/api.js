const handleErrors = (response) => {
  const isOk = response.status >= 200 && response.status <= 299
  if (!isOk) {
    throw Error(response.statusText)
  }
  return response
}

const getSearchTerms =  async () => {
  let json
  try {
    await fetch('/typeahead/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(handleErrors)
    .then(async (res) => {
      json = await res.json()
    })
  } catch (e) {
    console.error('error in GET. Returning empty data to handle gracefully', e)
    json = []
  }
  return json
}

const addSearchTerms = async (text) => {  
  let json
  try {
    await fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text})
    }).then(handleErrors)
    .then(async (res) => {
      json = await res.json()
      return res.status
    })
  }
  catch (e) {
    console.error('error in POST. Returning empty data to handle gracefully', e)
   return e
  }
  return json
}

export { addSearchTerms, getSearchTerms }
