import React, { useState, useCallback } from 'react';

export interface IOption {
    label: string;
    value: string;
}

export interface IRadioGroupProps {
    title: string;
    onChange: (value: string) => void;
    options: IOption[];
    defaultIndex?: number;
}

const RadioGroup = (props: IRadioGroupProps) => {
    const { onChange, options, title, defaultIndex = 0 } = props;
    const defaultValue = options[defaultIndex].value;
    const [currentValue, setValue] = useState<string>(defaultValue);

    const handleChange = useCallback(
        (index: number) => {
            const target = options[index];
            setValue(target.value);
            onChange(target.value);
        },
        [setValue, onChange, options],
    );

    return (
        <div className="radio-group">
            <div className="title">
                {title}: {currentValue}
            </div>
            <div className="radio-list">
                {options.map((option: IOption, index: number) => {
                    return (
                        <div className="radio" key={option.value}>
                            <input
                                type="radio"
                                name={title}
                                value={option.value}
                                onChange={() => handleChange(index)}
                                checked={option.value === currentValue}
                            />
                            <label>{option.label}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioGroup;
