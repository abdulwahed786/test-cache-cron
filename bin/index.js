"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_KEYPAIR = exports.USER_PRIVATE_KEY = exports.WALLET_PRIVATE_KEY = exports.SYSTEM_PROGRAM_ID = exports.MY_WALLET_ADDRESS = exports.PROGRAM_ID = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
exports.PROGRAM_ID = "D4PwstuNhUhvJLVyNXv5PHFfk4snC2rMMRsGcFca2X23";
exports.MY_WALLET_ADDRESS = "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T";
exports.SYSTEM_PROGRAM_ID = new web3_js_1.PublicKey("11111111111111111111111111111111");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("mainnet-beta"), "confirmed");
exports.WALLET_PRIVATE_KEY = "privatttttteeeeeee"; //process.env.WALLET_PRIVATE_KEY!;
exports.USER_PRIVATE_KEY = bs58_1.default.decode(exports.WALLET_PRIVATE_KEY);
exports.USER_KEYPAIR = web3_js_1.Keypair.fromSecretKey(exports.USER_PRIVATE_KEY);
const programId = new web3_js_1.PublicKey(exports.PROGRAM_ID);
const testTrxHelper = () => __awaiter(void 0, void 0, void 0, function* () {
    let keypair = web3_js_1.Keypair.generate();
    let keypair2 = web3_js_1.Keypair.generate();
    console.log("pubkey 1 :", keypair.publicKey.toBase58());
    console.log("pubkey 2 :", keypair2.publicKey.toBase58());
    const airdropSignature = yield connection.requestAirdrop(keypair.publicKey, web3_js_1.LAMPORTS_PER_SOL);
    yield connection.confirmTransaction(airdropSignature);
    let balance1 = yield connection.getBalance(keypair.publicKey, "confirmed");
    let balance2 = yield connection.getBalance(keypair2.publicKey, "confirmed");
    console.log("balancees ::", balance1, balance1);
    const sign = 'sfsdfs';
    console.log("signature tx url:: ", `https://solscan.io/tx/${sign}?cluster=devnet`);
    balance1 = yield connection.getBalance(keypair.publicKey, "confirmed");
    balance2 = yield connection.getBalance(keypair2.publicKey, "confirmed");
    console.log("balancees ::", balance1, balance1);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testTrxHelper();
}))();
