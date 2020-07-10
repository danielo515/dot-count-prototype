//@flow
import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

function getWrapper(props) {
  return shallow(<Button {...props} />)
}

describe('<Button/>', () => {

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
