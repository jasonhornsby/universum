import React from 'react';
import { Story } from '@storybook/react';
import { DnDLayout, IElement } from './dndLayout.component';

export default {
  title: 'Layout/dndLayout',
  component: DnDLayout,
}

let test = (args: any) => <h1>{ args.h1 }</h1>

const elements: IElement[] = [
  {
    name: 'Hi my name is Jack',
    component: test,
    args: { h1: 'string1' }
  },
  {
    name: 'Hi my name is Peter',
    component: test,
    args: { h1: 'string2' }
  }
];

const Template: Story<any> = (args) => <DnDLayout items={elements} />

export const Basic = Template.bind({});
