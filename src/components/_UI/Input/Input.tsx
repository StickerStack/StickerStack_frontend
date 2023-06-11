import { FC } from 'react';

import { InputForm } from '../InputForm/InputForm';

import { IInput } from '../../../interfaces/IInput';

interface IProps extends IInput {
  typeInput: 'form';
}

const Input: FC<IProps> = (props) => {
  if(props.typeInput) {
    return <InputForm {...props} />
  }

  return null;
};

export { Input };