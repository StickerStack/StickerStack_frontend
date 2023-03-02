import { useState } from "react";
import { useDispatch } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import { ButtonSubmit } from "../UI/ButtonSubmit";
import { InputForm } from "../UI/InputForm";
import { TitleForm } from "../UI/TitleForm";
import { Signin } from "../Signin";

import styles from "./Signup.module.scss";
import { switchForm } from "../../store/formSlice";
import { REG_EMAIL } from "../../utils/constants";

const Signup: React.FC = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signup}>
      <TitleForm>Регистрация</TitleForm>
      <div className={styles.inputs}>
        <InputForm
          placeholder="vashapochta@gmail.com"
          name="email"
          label="Email"
          type="email"
          register={register}
          required={true}
          requiredError="Введите E-mail"
          patternReg={REG_EMAIL}
          patternError="E-mail введен некорректно, Пример: example@domain.ru"
          minLength={5}
          minLengthError="Длина поля не менее 5 символов"
          maxLength={50}
          maxLengthError="Длина поля не более 50 символов"
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
          minLength={7}
          minLengthError="Длина поля не менее 7 символов"
          maxLength={32}
          maxLengthError="Длина поля не более 32 символов"
          error={errors?.password?.message ? `${errors?.password?.message}` : ''}
          optionalEyeButton={{
            shown: passwordShown,
            onClick: () => togglePassword(),
          }}
        />
        <InputForm
          placeholder="еще раз пароль"
          name="passwordCheck"
          label="Подтвердите пароль"
          type={passwordShown ? "text" : "password"}
          register={register}
          required={true}
          requiredError="Введите подтверждение пароля"
          minLength={7}
          minLengthError="Длина поля не менее 7 символов"
          maxLength={32}
          maxLengthError="Длина поля не более 32 символов"
          validateFunc={(val: string) => {
            if (watch("password") !== val) {
              return "Пароли не совпадают";
            }
            return '';
          }}
          error={errors?.passwordCheck?.message ? `${errors?.passwordCheck?.message}` : ''}
          optionalEyeButton={{
            shown: passwordShown,
            onClick: () => togglePassword(),
          }}
        />
      </div>
      <ButtonSubmit>Зарегистрироваться</ButtonSubmit>
      <span className={styles.link}>
        Уже есть аккаунт?{" "}
        <button
          type="button"
          onClick={() => dispatch(switchForm(Signin))}
          className={styles.button}
        >
          Войти
        </button>
      </span>
    </form>
  );
};

export { Signup };
