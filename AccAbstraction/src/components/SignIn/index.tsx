"use client"
import { useState } from "react"
import styles from "./styles.module.scss"
import { signIn } from "next-auth/react"
import Link from "next/link"

export function SignInComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className={styles.main}>
      <div className={styles.login}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />

        <button id={styles.login} onClick={ () => signIn('credentials', {redirect: true, email: email, password: password}) }>
          Login
        </button>
      </div>

      <Link href='/'>
        Don't have an account?
      </Link>
    </main>
  )
}