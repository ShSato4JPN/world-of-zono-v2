"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import styles from "./style.module.scss";
import axios from "axios";

interface IFormInput {
  name: string;
  email: string;
  subject: string;
  text: string;
}

function AboutTop(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    toast.promise(
      axios.post(`${process.env.NEXT_PUBLIC_URL}/api/mail`, {
        slug: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          text: data.text,
        },
      }),
      {
        loading: "送信中...",
        success: "送信しました 📩",
        error: "送信に失敗しました 😰",
      },
    );
  };

  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form__item"]}>
            <label
              htmlFor="name"
              className={`${styles["form__item__label"]} ${
                errors.name && styles["isError"]
              }`}
            >
              お名前 *
            </label>
            <input
              className={styles["form__item__input__text"]}
              {...register("name", {
                required: {
                  value: true,
                  message: "お名前を入力してください 🥺",
                },
              })}
            />
            {errors.name && <div>{errors.name.message}</div>}
          </div>
          <div className={styles["form__item"]}>
            <label
              htmlFor="email"
              className={`${styles["form__item__label"]} ${
                errors.email && styles["isError"]
              }`}
            >
              メールアドレス *
            </label>
            <input
              className={styles["form__item__input__text"]}
              {...register("email", {
                required: {
                  value: true,
                  message: "メールアドレスを入力してください 🥺",
                },
                pattern: {
                  value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                  message: "入力形式がメールアドレスではありません。",
                },
              })}
            />
            {errors.email && <div>{errors.email.message}</div>}
          </div>
          <div className={styles["form__item"]}>
            <label htmlFor="subject" className={styles["form__item__label"]}>
              題名
            </label>
            <input
              className={styles["form__item__input__text"]}
              {...register("subject")}
            />
          </div>
          <div className={styles["form__item"]}>
            <label
              htmlFor="text"
              className={`${styles["form__item__label"]} ${
                errors.text && styles["isError"]
              }`}
            >
              本文 *
            </label>
            <textarea
              className={styles["form__item__input__textarea"]}
              {...register("text", {
                required: { value: true, message: "本文を入力してください 🥺" },
                minLength: {
                  value: 10,
                  message: "10文字以上入力してください 🥺",
                },
              })}
              rows={9}
            />
          </div>
          {errors.text && <div>{errors.text.message}</div>}
          <input className={styles["form__item__submit"]} type="submit" />
        </form>
        <Toaster position="bottom-center" reverseOrder={false} />
      </main>
    </div>
  );
}

export default AboutTop;
