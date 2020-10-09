import { useState, useCallback } from 'react';

const useBoolean = (originValue: boolean = true) => {
    const [value, setValue] = useState<boolean>(originValue);
    const toggle = useCallback(() => {
        setValue((value) => !value);
    }, [setValue]);

    return { value, toggle, setValue };
};

export default useBoolean;
