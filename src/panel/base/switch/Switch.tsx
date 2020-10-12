import React from 'react';

export interface ISwitchProps {
    title: string;
    value: boolean;
}

const Switch = (props: ISwitchProps) => {
    const { title, value } = props;

    return  <button className="switch-btn">{title}: {value ? '是' : '否'}</button>
}

export default Switch;
