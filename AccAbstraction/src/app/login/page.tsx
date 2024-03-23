import { SignInComponent } from "@/components/SignIn"
import styles from "./styles.module.scss"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation"

export default async function Login() {
  const session = await getServerSession(authOptions)

  if(session){
    redirect('/user')
  }

  return (
    <main className={styles.main}>
      <SignInComponent/>
    </main>
  )
}