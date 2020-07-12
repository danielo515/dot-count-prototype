//@flow
import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'

import Button from './Button'

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
  parameters: {
    options: { showPanel: true },
  },
};

/**
* Use the default export to provide interactivity using knobs.
* It will give a better overview of what the component is capable.
*/
export const Default = () => { 
  const name = text('Name', 'James')
  const items = number('Items', 4)
  const render = boolean('Render?', true)
  return (
    <Button onClick={action('clicked')} name={name}>
      { render && Array(items).fill(name).join(' ') }
    </Button>
    )
};

export const ExampleOne = () => <Button onClick={action('clicked')}>Hello Component</Button>;
