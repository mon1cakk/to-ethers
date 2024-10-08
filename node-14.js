import { ethers } from 'ethers';

// 生成随机助记词
const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
// 创建HD基钱包
// 基路径："m / purpose' / coin_type' / account' / change"
const basePath = "44'/60'/0'/0";
const baseWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, basePath);
console.log(baseWallet.privateKey);

const numWallet = 20;
// 派生路径：基路径 + "/ address_index"
// 我们只需要提供最后一位address_index的字符串格式，就可以从baseWallet派生出新钱包。V6中不需要重复提供基路径！
let wallets = [];
for (let i = 0; i < numWallet; i++) {
  let baseWalletNew = baseWallet.derivePath(i.toString());
  console.log(`第${i + 1}个钱包地址： ${baseWalletNew.address}`);
  wallets.push(baseWalletNew);
}

const wallet = ethers.Wallet.fromPhrase(mnemonic);
console.log('通过助记词创建钱包：');
console.log(wallet);
// 加密json用的密码，可以更改成别的
const pwd = 'password';
const json = await wallet.encrypt(pwd);
console.log('钱包的加密json：');
console.log(json);

const wallet2 = await ethers.Wallet.fromEncryptedJson(json, pwd);
console.log('\n4. 从加密json读取钱包：');
console.log(wallet2);
