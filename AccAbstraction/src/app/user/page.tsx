import { getServerSession } from "next-auth"
import styles from "./styles.module.scss"
import { authOptions } from "@/utils/auth"
import initializeFirebaseClient from "@/utils/firebaseConnection"
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import { UserComponent } from "@/components/User"
import { redirect } from "next/navigation"
import api from "@/utils/api"
import { ethers } from "ethers"
import ERC20 from '@/utils/ERC20.json'
import { formatUnits } from "ethers/lib/utils"
import { createSmartAccountClient, PaymasterMode } from "@biconomy/account";

export default async function User(){
  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/login')
  }

  let wallet = ''
  let alchemyWallet = ''
  let indexUsers = 0
  let idWallet = 0
  const { db } = initializeFirebaseClient()
  const userBase = doc(db, "users", `${session?.user.email}`)
  const data = await getDoc(userBase)

  if(data.exists()){
    wallet = data.data()?.wallet
    alchemyWallet = data.data()?.alchemyWallet
    idWallet = data.data()?.idWallet
    const usersRef = collection(db, "users")
    const queryIndex = query(usersRef)
    const index = (await getDocs(queryIndex)).size
    indexUsers = index
  }

  async function handleSubmit(){
    "use server"
    try{
      const response = await api.post("/api/createAlchemy",{
        data: {
          wallet: wallet,
          email: session?.user.email,
          index: indexUsers
        }
      })
    }catch(error){
      console.log(error)
    }
    redirect("/")
  }

  async function handleGetBalance(add: string){
    "use server"
    try{
      let provider = new ethers.providers.JsonRpcProvider(
        {
          skipFetchSetup: true,
          url: process.env.RPC_URL as string
        }
      )
      const contract = new ethers.Contract(`${process.env.NEXT_PUBLIC_CONTRACTERC20}`, ERC20, provider)
      const balance = formatUnits(await contract.balanceOf(add))     
      return balance

    }catch(error){
      console.log(error)
    }
  }
  
  async function handleTransfer(){
    "use server"
    try{
      let provider = new ethers.providers.JsonRpcProvider(
        {
          skipFetchSetup: true,
          url: process.env.RPC_URL as string
        }
      )
      let signer = new ethers.Wallet(`${process.env.WALLET_PRIVATE_KEY}`, provider)
      
      const biconomySmartAccountConfig = {
        signer: signer,
        bundlerUrl: process.env.BUNDLER_URL as string,
        biconomyPaymasterApiKey: process.env.PAYMASTER_API_KEY,
      }
      
      const smartAccount = await createSmartAccountClient(biconomySmartAccountConfig);      
      const smartWallet = await smartAccount.getAccountAddress({index: idWallet})

      var amount: any = ethers.utils.parseUnits('100', 18)
      const contract = new ethers.Contract(`${process.env.NEXT_PUBLIC_CONTRACTERC20}`, ERC20, provider)
      const mintTx = await contract.populateTransaction.transfer(alchemyWallet, amount.toString())

      const tx ={
        to: `${process.env.NEXT_PUBLIC_CONTRACTERC20}`,
        data: mintTx.data!
      }

      const userOpResponse = await smartAccount.sendTransaction(tx, {
        paymasterServiceData: {mode: PaymasterMode.SPONSORED},
      });

      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);

      const userOpReceipt  = await userOpResponse.wait();

      console.log("userOpReceipt", userOpReceipt);

      if(userOpReceipt.success == 'true') { 
        console.log("Transaction receipt", userOpReceipt.receipt)
      }
    }catch(error){
      console.log(error)
    }
    redirect("/")
  }

  const balanceWallet1 = (await handleGetBalance(wallet))!.toString()
  const balanceWallet2 = alchemyWallet !== "" ? (await handleGetBalance(alchemyWallet))!.toString() : '0.00'

  return (
    <main className={styles.main}>
      <UserComponent
        wallet={wallet}
        alchemyWalllet={alchemyWallet}
        email={session.user.email as string}
        handleSubmit={handleSubmit}
        balanceWallet1={balanceWallet1}
        balanceWallet2={balanceWallet2}
        handleTransfer={handleTransfer}
      />
    </main>
  )
}