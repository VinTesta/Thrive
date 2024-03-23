"use client"
import Link from "next/link";
import styles from "./styles.module.scss"

interface SignUpComponentProps {
  handleSubmit: (e: FormData) => Promise<void>;
}

export function SignUpComponent({ handleSubmit }: SignUpComponentProps) {

  return (
    <main className={styles.main}>
      <form className={styles.login} action={handleSubmit}>
        <input
          type="text"
          name='email'
          placeholder="Your email"
        />
        <input
          type="password"
          name='senha'
          placeholder="Your password"
        />
        <button id={styles.login} type="submit">
          Register your Account
        </button>
      </form>

      <Link href="/login">
        Login
      </Link>
    </main>
  )
}