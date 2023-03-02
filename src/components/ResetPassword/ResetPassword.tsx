import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { ButtonSubmit } from "../UI/ButtonSubmit";
import { InputForm } from "../UI/InputForm";
import { TitleForm } from "../UI/TitleForm";
import { Signin } from "../Signin";

import styles from "./ResetPassword.module.scss";
import { switchForm } from "../../store/formSlice";
import { Button } from "../UI/Button";
import { TextForm } from "../UI/TextForm";
import { REG_EMAIL } from "../../utils/constants";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  // FIXME: Кнопка НАЗАД является кастомной! Убрать когда дизайнер сделает ее!
  return (
    <form className={styles.resetpassword}>
      <TitleForm>Восстановление пароля</TitleForm>
      <InputForm
        label="E-mail Вашего аккаунта"
        name="email"
        placeholder="vashapochta@gmail.com"
        register={register}
        required={true}
        requiredError="Введите E-mail"
        patternReg={REG_EMAIL}
        patternError="E-mail введен некорректно, Пример: example@domain.ru"
        maxLenght={50}
        maxLenghtError="Длина поля не менее 5 и не более 50 символов"
        error={errors?.email?.message ? `${errors?.email?.message}` : ""}
      />
      <TextForm>
        Мы направим ссылку на Вашу почту для восстановления пароля
      </TextForm>
      <ButtonSubmit>Восстановить пароль</ButtonSubmit>
      <Button onClick={() => dispatch(switchForm(Signin))}>Назад</Button>
    </form>
  );
};

export { ResetPassword };
