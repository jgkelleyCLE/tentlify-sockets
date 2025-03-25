import React, { useState } from 'react';
import { CalcBox, CalcButton, NumInput } from './Calulator.styles';
import { FlexColumn, FlexRow } from '../UI';
import { Button, useToast } from '@chakra-ui/react';

const Calculator = () => {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [cross, setCross] = useState(0);
  const [tentDim, setTentDim] = useState(0);

  const toast = useToast();

  const calculateHandler = (e) => {
    e.preventDefault();

    if (width === '' || length === '') {
      toast({
        title: 'Error',
        description: 'Please enter both width and length!',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
      return;
    } else {
      setCross(Math.sqrt(width * width + length * length));

      setTentDim(Number(width) + Number(length));
    }
  };

  const resetHandler = () => {
    setWidth('');
    setLength('');
    setCross(0);
    setTentDim(0);
  };

  return (
    <CalcBox>
      <h1 className="text-xl">Tent Cross Calculator</h1>
      <FlexRow className="w-full gap-2 my-1">
        <NumInput
          required
          type="number"
          placeholder="Tent Width"
          className="w-1/2 p-2"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <p className="font-bold">X</p>
        <NumInput
          required
          type="number"
          placeholder="Tent Length"
          className="w-1/2 p-2"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </FlexRow>
      <CalcButton onClick={calculateHandler}>Calculate</CalcButton>

      {cross == 0 ? null : (
        <FlexColumn>
          <h3 className="text-xl font-bold">Cross: {Math.round(cross * 100) / 100}</h3>
          <h3 className="text-xl font-bold">Tape Length: {Math.round((tentDim + cross) * 100) / 100}</h3>
          <h3 className="text-gray-400 italic font-bold">(width + length + cross)</h3>
          <CalcButton className="bg-[#3182CE] hover:bg-[#2A6CB0] transition duration-300" onClick={resetHandler}>
            Reset
          </CalcButton>
        </FlexColumn>
      )}
    </CalcBox>
  );
};

export default Calculator;
