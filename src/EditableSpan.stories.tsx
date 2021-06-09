import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'ToDoList/EditableSpan',
    component: EditableSpan,
} as Meta;

const onChange = action("Title was changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"Base Example"} onChange={onChange} />
}