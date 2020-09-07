import React, { useState, useCallback } from 'react';

const useInput = () => {
  const [value, setValue] = useState<string>('');
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValue(value);
    },
    []
  );

  const InputCom = <input value={value} onChange={handleChange} />;

  return [
    value,
    InputCom,
    setValue,
  ];
};

export default useInput;
