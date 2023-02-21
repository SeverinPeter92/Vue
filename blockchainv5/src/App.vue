<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import {Blockchain, Transaktionen} from "./funktionen/blockchain.js"
import elliptic from 'elliptic'

try{
    //const{Blockchain,Transaktionen} = require('./blockchain');
    const EC = elliptic.ec
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

  }catch (e) {
console.log(e)
}


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
