import React, { useEffect, useState } from 'react';
import './typeaheadAddTags.css';
import { addSearchTerms, getSearchTerms } from './api'

const TypeaheadAddTags = () => {
   // useReduce to encapsulate useState's?
  const [typeaheadTag, setTypeaheadTag] = useState([])
  const [tagsFromApi, setTagsFromApi] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [tagsAdded, setTagsAdded] = useState(null)

  useEffect(() => {
    getSearchTerms().then(res => setTagsFromApi(res))
  }, [])

  const handleSearchInput = event => {
    setInputValue(event.target.value)
    setTypeaheadTag(tagsFromApi)
  }

  const buttonPress = event => {
    // Needs debounce maybe
    if (inputValue.length > 0) {
      addSearchTerms(inputValue).then(res => setTagsFromApi(res)) // could do optimistic updates instead
      setTagsAdded(`Tag ${inputValue} was added to your item.`)
    }
  }

  return (
    <main className="addTags">
      <h2>Add tags</h2>
      <p className="tagsMetaText">Autocompletion, sorted</p>
      <input
        className="inputTagsText"
        list="dataList"
        id="inputSearch"
        name="option"
        onChange={handleSearchInput}
        onSubmit={buttonPress}
        placeholder='Search for tags'
        type="search"
      />
      <datalist className="typeaheadTagList" id="dataList" value={inputValue}>
        {typeaheadTag.map((cur, idx) => {
          return (
            <>
              <option key={idx} value={cur}>
                {cur}
              </option>
            </>         
          )
        })}
      </datalist>
      <button type="submit" value="submit" onClick={buttonPress}>Add tags</button>
      <p className="tagsMetaText">{tagsAdded}</p>
    </main>
  );
};

export default TypeaheadAddTags;
