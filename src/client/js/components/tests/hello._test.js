// eslint-ignore-file
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Hello from './../hello'

describe('<Hello />', () => {
  it('Shows message if data is not loaded ', () => {
    const HelloWrapper = shallow(<Hello isLoading />)
    expect(HelloWrapper.text()).to.contain('Data Loading...')
  })

  it('Shows message if data is loaded ', () => {
    const HelloWrapper = shallow(<Hello isLoading />)
    expect(HelloWrapper.text()).to.contain('Data Loaded!')
  })
})
