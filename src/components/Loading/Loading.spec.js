//@flow
import React from 'react'
import { shallow } from 'enzyme'
import Loading from './Loading'

function getWrapper(props) {
  return shallow(<Loading {...props} />)
}

describe('<Loading/>', () => {

  it('renders', () => {
    const wrapper = getWrapper({ children: 'Hello!' })

    expect(wrapper.html()).toBeThruthy()
  })

  it('on change', () => {
    const onChange = jest.fn()
    const wrapper = getWrapper({ onChange })

    wrapper.simulate('click')

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
