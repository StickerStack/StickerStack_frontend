import cn from 'classnames';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { registerSize } from '../../../utils/registersRHF';
import { Input } from '../Input/Input';

import styles from './SizeInput.module.scss';
import { Error } from '../Error/Error';

interface IProps {
  nameWidth: string;
  nameHeight: string;
  valueWidth: number | undefined;
  valueHeight: number | undefined;
  setWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
  setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  option?: RegisterOptions;
  errorWidth?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  errorHeight?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const SizeInput: React.FC<IProps> = ({
  nameWidth,
  nameHeight,
  valueWidth,
  valueHeight,
  setWidth,
  setHeight,
  register,
  errorWidth,
  errorHeight,
}: IProps) => {
  return (
    <>
      <div className={styles.inputs}>
        <Input
          className={styles.input}
          name={nameWidth}
          value={valueWidth}
          placeholder='ширина'
          type='tel'
          option={registerSize}
          register={register}
          error={errorWidth}
          onChange={(e: { target: { value: unknown } }) => setWidth(Number(e.target.value))}
        />{' '}
        x{' '}
        <Input
          className={styles.input}
          name={nameHeight}
          value={valueHeight}
          placeholder='высота'
          type='tel'
          option={registerSize}
          register={register}
          error={errorHeight}
          onChange={(e: { target: { value: unknown } }) => setHeight(Number(e.target.value))}
        />
        <span> см</span>
      </div>
      <Error>
        {(errorWidth || errorHeight) && `${errorWidth?.message || errorHeight?.message}`}
      </Error>
    </>
  );
};

export { SizeInput };
