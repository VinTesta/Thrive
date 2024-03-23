
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import styles from "./page.module.scss"
import { redirect } from "next/navigation"
import api from "@/utils/api"
import { SignUpComponent } from "@/components/SignUp"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if(session){
    redirect('/user')
  }
  
  async function handleSubmit(e: FormData){
    "use server"
    try{
      const response = await api.post("/api/createUser",{
        data: {
          email: e.get('email'),
          senha: e.get('senha')
        }
      })
    }catch(error){
      console.log(error)
    }
    redirect("/user")
  }

  return (
    <main className={styles.main}>
      <SignUpComponent handleSubmit={handleSubmit}/>
    </main>
  )
}
