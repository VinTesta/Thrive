import { NextResponse, NextRequest } from "next/server"
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy"
import { LocalAccountSigner, polygonMumbai, type Address } from "@alchemy/aa-core"
import { doc, updateDoc } from "firebase/firestore";
import initializeFirebaseClient from "@/utils/firebaseConnection";

export async function POST(request: NextRequest){
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.AAETHSAMBA_API_KEY}`) {
    return NextResponse.json({message: 'Unauthorized'}, {status: 401});
  }

  const { data } = await request.json()

  try{
    
    let hexString: any = process.env.WALLET_PRIVATE_KEY

    if (!hexString?.startsWith("0x")) {
      hexString = "0x" + hexString;
    }

    const chain = polygonMumbai
    const signer = LocalAccountSigner.privateKeyToAccountSigner(hexString)
    const mySalt = BigInt(data.index); 

    const client = await createModularAccountAlchemyClient({
      apiKey: process.env.ALCHEMY_API_KEY,
      chain,
      signer,
      gasManagerConfig: {
        policyId: process.env.POLICY_ID as string
      },
      salt: mySalt
    })

    const smartWallet = client.getAddress()
    console.log("Smart Account Address: ", smartWallet)

    const biconomyAddress = data.wallet as Address

    const { hash: uoHash } = await client.sendUserOperation({
      uo: {
        target: biconomyAddress,
        data: "0x",
      },
    });
  
    console.log("UserOperation Hash: ", uoHash); 
  
    const txHash = await client.waitForUserOperationTransaction({
      hash: uoHash,
    });
  
    console.log("Transaction Hash: ", txHash);

    const { db } = initializeFirebaseClient()
    const userBase = doc(db, "users", data.email);

    await updateDoc(userBase,{
      alchemyWallet: smartWallet
    })

    return NextResponse.json({wallet: smartWallet}, {status: 200});
  }catch(error){
    console.log(error)
    return NextResponse.json({message: "Failed create a Alchemy Wallet"}, {status: 400})
  }
}
 
