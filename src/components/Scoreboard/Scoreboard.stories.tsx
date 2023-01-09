import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Scoreboard, ScoreboardProps } from './Scoreboard';

export default {
    title: "Scoreboard/Scoreboard",
    component: Scoreboard
} as Meta;

const Template: Story<ScoreboardProps> = (args) => <Scoreboard {...args} />;

export const ScoreboardExample = Template.bind({});
ScoreboardExample.args = {
    timer: "000",
    levels: ['beginner', 'intermediat', 'expert'],
    defaultValue: 'beginner',
    bombs: "010",
}