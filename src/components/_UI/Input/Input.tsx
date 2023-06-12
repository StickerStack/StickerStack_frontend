import { FC } from 'react';

import { InputForm } from '../InputForm/InputForm';
import { InputProfile } from '../InputProfile/InputProfile';

import { IInput } from '../../../interfaces/IInput';


interface IProps extends IInput {
  typeInput: 'form' | 'profile';
}

const Input: FC<IProps> = (props) => {
  if(props.typeInput === 'form') {
    return <InputForm {...props} />
  }

  if(props.typeInput === 'profile') {
    return <InputProfile {...props} />
  }

  return null;
};

export { Input };