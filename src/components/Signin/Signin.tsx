import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FieldValues } from "react-hook-form";

import { ButtonSubmit } from "../UI/ButtonSubmit";
import { CheckBoxForm } from "../UI/CheckBoxForm";
import { InputForm } from "../UI/InputForm";
import { TitleForm } from "../UI/TitleForm";
import { Signup } from "../Signup";

import styles from "./Signin.module.scss";
import { switchForm } from "../../store/formSlice";
import { ResetPassword } from "../ResetPassword";
import { REG_EMAIL } from "../../utils/constants";

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <form className={styles.signin} onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Войти в личный кабинет</TitleForm>
      <div className={styles.inputs}>
        <InputForm
          placeholder="vashapochta@gmail.com"
          name="email"
          label="Email"
          type="text"
          register={register}
          required={true}
          requiredError="Введите E-mail"
          patternReg={REG_EMAIL}
          patternError="E-mail введен некорректно, Пример: example@domain.ru"
          maxLenght={50}
          maxLenghtError="Длина поля не менее 5 и не более 50 символов"
          error={errors?.email?.message ? `${errors?.email?.message}` : ''}
        />
        <InputForm
          placeholder="впишите пароль"
          name="password"
          label="Пароль"
          type={passwordShown ? "text" : "password"}
          register={register}
          required={true}
          requiredError="Введите пароль"
          maxLenght={50}
          maxLenghtError="Длина поля не менее 7 и не более 32 символов"
          error={errors?.password?.message ? `${errors?.password?.message}` : ''}
          optionalButton={{
            text: "Забыли пароль?",
            onClick: () => {
              dispatch(switchForm(ResetPassword));
            },
          }}
          optionalEyeButton={{
            shown: passwordShown,
            onClick: () => togglePassword(),
          }}
        />
        <CheckBoxForm label="Запомнить меня" />
      </div>
      <ButtonSubmit>Войти</ButtonSubmit>
      <span className={styles.link}>
        Нет аккаунта?{" "}
        <button
          onClick={() => dispatch(switchForm(Signup))}
          type="button"
          className={styles.button}
        >
          Зарегистрироваться
        </button>
      </span>
    </form>
  );
};

export { Signin };
