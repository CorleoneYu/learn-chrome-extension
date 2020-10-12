import React, { useMemo } from 'react';
import Switch from '../base/switch';
import useBoolean from './useBoolean';

const useSwitch = (title: string, originValue: boolean = true) => {
    const { value, toggle } = useBoolean(originValue);
    const SwitchCom = useMemo(() => {
        return (
            <div className="switch" onClick={toggle}>
                <Switch title={title} value={value} />
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
