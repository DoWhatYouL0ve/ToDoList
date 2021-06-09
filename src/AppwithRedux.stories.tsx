import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import AppWithRedux from "./AppWithRedux";
import {ReactStoreProviderDecorator} from "./stories/ReactStoreProviderDecorator";


export default {
    title: 'ToDoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReactStoreProviderDecorator]
} as Meta;

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux />
}