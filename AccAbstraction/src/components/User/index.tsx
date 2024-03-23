"use client"
import styles from "./styles.module.scss"
import { signOut } from "next-auth/react"

interface userComponentProps {
  wallet: string,
  alchemyWalllet: string,
  email: string
  handleSubmit: () => void,
  balanceWallet1: string | null,
  balanceWallet2: string | null,
  handleTransfer: () => void,
}

export function UserComponent(
  {
    wallet,
    alchemyWalllet,
    email,
    handleSubmit,
    balanceWallet1,
    balanceWallet2,
    handleTransfer
  }: userComponentProps) {

  return (
    <main className={styles.main}>

      <h2>Hello {email}</h2>
      <p>Your Biconomy Wallet:</p>
      <span>{wallet}</span>
      <p>Balance: {balanceWallet1}</p>
      {alchemyWalllet !== '' && (
        <form action={handleTransfer}>
          < button id={styles.alchemy} type="submit">Transfer Tokens</button>
        </form>
      )}

      <p style={{marginTop: '4rem'}}>Your Alchemy Wallet:</p>
      {alchemyWalllet === '' ?
        <form action={handleSubmit}>
          <button id={styles.alchemy} type="submit">Create Alchemy Wallet</button>
        </form>
      :
        <>
          <span>{alchemyWalllet}</span>
          <p>Balance: {balanceWallet2}</p>
        </>
      }
        
      <button id={styles.open} onClick={() => signOut()}>
        Logout
      </button>
    </main>
  )
}