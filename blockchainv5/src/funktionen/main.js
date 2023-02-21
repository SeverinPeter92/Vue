    
    import elliptic from 'elliptic'
    import {Blockchain, Transaktionen} from "./blockchain.js"
    const EC = elliptic.ec
    //const{Blockchain,Transaktionen} = require('./blockchain');
   //const EC = require ('elliptic').ec;
    const ec = new EC('secp256k1');  //elleptische Kurve zur Kryptographischen Verschlüsselung
    const myKey = ec.keyFromPrivate('10124196ffb1333c0d6892332b7dcbc6b33b740640e84e7d7777491e563dcf7f');
    const myWalletAdress = myKey.getPublic('hex');


    let YakutCoin = new Blockchain();

    const tx1 = new Transaktionen(myWalletAdress, 'public key goes here', 8);
    
    tx1.signTransaction(myKey);
    YakutCoin.addTransaktion(tx1);

    console.log("Start mining");
    YakutCoin.minePendingTransaktionen(myWalletAdress);
    console.log("Balance of Xaviers is", YakutCoin.getBalanceofAdress(myWalletAdress));

    console.log("Is chain valid?", YakutCoin.isChainValid());


    YakutCoin.chain[1].transaktionen[0].amount = 1; //2 Blocker die erste Transaktion auf 0 ändern--> müsste jtzt false sein weil hashwerte nicht mehr passen!
    console.log("Is chain valid?", YakutCoin.isChainValid());


   

