<template>
  <div id="app">
      <b-navbar variant="primary">
          <b-navbar-nav>
              <b-nav-item @click="router.push({ name: 'Main' })">
                  <b-button>
                      Home
                  </b-button>
              </b-nav-item>

              <b-nav-item @click="router.push({ name: 'Settings' })">
                  <b-button>
                      Settings
                  </b-button>
              </b-nav-item>

              <b-nav-item @click="router.push({ name: 'Transaction' })">
                  <b-button>
                      Erstelle Transaktion
                  </b-button>
              </b-nav-item>
          </b-navbar-nav>
      </b-navbar>

      <router-view/>
  </div>
</template>

<script setup>
import {Blockchain, Transaktionen} from "./funktionen/blockchain.js"
import elliptic from 'elliptic'
import router from "@/router";

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

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
