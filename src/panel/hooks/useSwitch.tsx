import React, { useMemo } from 'react';
import Switch from '../base/switch';
import useBoolean from './useBoolean';

const useSwitch = (title: string, originValue: boolean = true) => {
    const { value, toggle } = useBoolean(originValue);
    const SwitchCom = useMemo(() => {
        return (
            <div className="switch">
                <Switch title={title} value={value} />
                <button className="switch-button" onClick={toggle}>
                    toggle
                </button>
            </div>
        );
    }, [title, toggle, value]);

    return {
        value,
        toggle,
        SwitchCom,
    };
};

export default useSwitch;
