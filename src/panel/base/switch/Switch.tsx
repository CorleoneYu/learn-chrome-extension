import React from 'react';

export interface ISwitchProps {
    title: string;
    value: boolean;
}

const Switch = (props: ISwitchProps) => {
    const { title, value } = props;

    return  <div className="switch-title">{title}: {value ? '是' : '否'}</div>
}

export default Switch;
