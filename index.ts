
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";


 import bs58 from "bs58";
import { programId, XenonTraderClient, XENON_DATA_LAYOUT } from "x-test-sdk";
import 'dotenv/config';

// export const PROGRAM_ID = "D4PwstuNhUhvJLVyNXv5PHFfk4snC2rMMRsGcFca2X23";
// export const MY_WALLET_ADDRESS = "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T";
// export const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");
export const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY!;
// console.log("WALLET_PRIVATE_KEY::",process.env.WALLET_PRIVATE_KEY)
export const USER_PRIVATE_KEY = bs58.decode(WALLET_PRIVATE_KEY);
export const USER_KEYPAIR = Keypair.fromSecretKey(USER_PRIVATE_KEY);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const client = new XenonTraderClient(connection, USER_KEYPAIR.publicKey);

console.log("USER_KEYPAIR.publicKey::",USER_KEYPAIR.publicKey.toBase58())


const testTrxHelper = async () => {

  const transaction = new Transaction();        
  const signers = await client.updateGlobalPrices(transaction);

  transaction.feePayer = USER_KEYPAIR.publicKey;
  let hash = await connection.getLatestBlockhash();
  transaction.recentBlockhash = hash.blockhash;
  console.log('transaction :>> ');

  const sign = await sendAndConfirmTransaction(connection, transaction, [ USER_KEYPAIR ], {skipPreflight : true});
  console.log(
    "signature tx url:: ",
    `https://solscan.io/tx/${sign}?cluster=devnet`
  );

};

(async () => {
  console.log("programId::",programId.toBase58())

 await client.load()
 console.log('XENON_DATA_LAYOUT ::: ', XENON_DATA_LAYOUT.span)

 let balance = await connection.getBalance(USER_KEYPAIR.publicKey, "confirmed");
 console.log("balancees ::", balance );

//  const xenonPDA = await PublicKey.findProgramAddress([Buffer.from("xenon_v1")], programId);
//  console.log("xenonPDA::",xenonPDA[0].toBase58())
 
//  const res = await connection.getAccountInfo(xenonPDA[0], 'processed');
//  const xenonData = XENON_DATA_LAYOUT.decode(res?.data);
 
 await testTrxHelper();
 setInterval(async () => { 
  console.log("hi calling testTrxHelper ...")
   await testTrxHelper();
  console.log("done..")
},30000)

})();



