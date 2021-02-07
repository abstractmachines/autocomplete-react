import React from 'react';
import TypeaheadAddTags from './typeaheadAddTags';
import { shallow } from 'enzyme'

const wrap = shallow(
  <TypeaheadAddTags />
)

// TODO simulate onChange for forms w Enzyme, add Jest snapshots.
// React hooks with mount; react-testing-library.
describe('<TypeaheadAddTags /> shallow rendering', () => {
  it('Renders a button that searches and adds tags', () => {
    expect(wrap.find('button').text()).toEqual('Add tags')
  })

  it('Has a container CSS class / selector', () => {
    expect(wrap.find('.addTags').exists()).toEqual(true);
  })

  it('Returns falsey for expected falsey values for CSS classes and selectors', () => {
    expect(wrap.find('.other-class').exists()).toEqual(false);
  })
})
