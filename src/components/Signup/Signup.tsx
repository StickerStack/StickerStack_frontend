import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { ButtonSubmit } from "../UI/ButtonSubmit";
import { InputForm } from "../UI/InputForm";
import { TitleForm } from "../UI/TitleForm";
import { Signin } from "../Signin";

import styles from "./Signup.module.scss";
import { switchForm } from "../../store/formSlice";

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


  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <form className={styles.signup}>
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
          maxLenght={50}
          maxLenghtError="Длина поля не менее 7 и не более 32 символов"
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
