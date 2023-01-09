import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Top, TopProps } from './Top';

export default {
    title: "Top/Top",
    component: Top
} as Meta;

const Template: Story<TopProps> = (args) => <Top {...args} />;

export const GameTop = Template.bind({});
GameTop.args = {
    children: 'minesweeper',
    feature: 'Flag',
    firstAction: 'ctrl',
    secondAction: 'click',
}