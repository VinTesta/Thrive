import { NextResponse, NextRequest } from "next/server"
import initializeFirebaseClient from "@/utils/firebaseConnection"
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ethers } from "ethers"
import { createSmartAccountClient} from "@biconomy/account"
import ERC20 from '@/utils/ERC20.json'

export async function POST(request: NextRequest){
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.AAETHSAMBA_API_KEY}`) {
    return NextResponse.json({message: 'Unauthorized'}, {status: 401});
  }

  const { data } = await request.json()

  try{
    const { auth, db } = initializeFirebaseClient()
    const userBase = doc(db, "users", data.email)
    const usersRef = collection(db, "users")
    const queryIndex = query(usersRef)
    const index = (await getDocs(queryIndex)).size || 0

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
    const smartWallet = await smartAccount.getAccountAddress({index: index})
    
    await createUserWithEmailAndPassword(auth, data.email, data.senha)
    .then(async (userCredential) => {

      const user = userCredential.user
      const uid = user.uid
              
      await setDoc(userBase,{
        uid: uid,
        email: data.email,
        wallet: smartWallet,
        alchemyWallet: '',
        idWallet: index
      })

      var amount: any = ethers.utils.parseUnits('100', 18)
      const contract = new ethers.Contract(`${process.env.NEXT_PUBLIC_CONTRACTERC20}`, ERC20, signer)      
      const tx = await contract.transfer(smartWallet, amount.toString())
      const receipt = await tx.wait()
      console.log('receipt:',receipt)
  
    }).catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;

      if(error.code === "auth/weak-password"){
        return NextResponse.json({ message: 'Weak password'}, {status: 400})

      } else if(error.code ==='auth/email-already-in-use'){
        return NextResponse.json({ message: 'Email already in use' }, {status: 409})

      } else if(error.code ==='auth/invalid-email'){
        return  NextResponse.json({ message: 'Invalid email' }, {status: 400})
      } 
    })     

    return NextResponse.json({message: "User created"}, {status: 200});
  }catch(error){
    console.log(error)
    return NextResponse.json({message: "Failed to create a user"}, {status: 400})
  }
}
 
