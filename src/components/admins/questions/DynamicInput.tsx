"use client"

import React, { useState, ChangeEvent } from "react";

interface DynamicInputProps {}

interface DynamicInputState {
  inputElements: string[];
}

const DynamicInput: React.FC<DynamicInputProps> = () => {
  const [state, setState] = useState<DynamicInputState>({
    inputElements: [],
  });

  const addInput = () => {
    setState((prevState) => ({
      inputElements: [...prevState.inputElements, ""],
    }));
  };

  const handleInputChange = (index: number, value: string) => {
    setState((prevState) => {
      const newInputElements = [...prevState.inputElements];
      newInputElements[index] = value;
      return { ...prevState, inputElements: newInputElements };
    });
  };

  return (
    <div>
      <button onClick={addInput}>Add Input</button>

      {state.inputElements.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(index, e.target.value)
          }
        />
      ))}
    </div>
  );
};

export default DynamicInput;
