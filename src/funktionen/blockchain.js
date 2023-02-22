//Can Yakut
import elliptic from 'elliptic'
import SHA256 from 'crypto-js/sha256'

const EC = elliptic.ec


//const SHA256 = require ('crypto-js/sha256');
//const EC = require ('elliptic').ec;
const ec = new EC('secp256k1');  //elleptische Kurve zur Kryptographischen Verschlüsselung

class Transaktionen
{
    constructor(fromAdress, toAdress, amount)
    {
        this.fromAdress = fromAdress;
        this.toAdress = toAdress;
        this.amount = amount;
    }
   
    calculateHash()
    {
        return SHA256(this.fromAdress + this.toAdress + this.amount).toString();
    }

    signTransaction(signingKey)
    {
        if(signingKey.getPublic('hex') != this.fromAdress)
        {
            throw new Error("Du kannst nicht Transaktionen für andere Wallets unterzeichnen")
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid()
    {
        if(this.fromAdress == null) return true;

        if(!this.signature || this.signature.length == 0)
        {
            throw new Error('Keine Signatur in dieser Transaktion');
        }

        const publicKey = ec.keyFromPublic(this.fromAdress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block
{
    constructor (timestamp, transaktionen, prevoiusHash = '')
    {
        this.timestamp = timestamp;
        this.transaktionen = transaktionen;
        this.prevoiusHash = prevoiusHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
       
    }

    calculateHash()
    {
        return SHA256(this.index + this.prevoiusHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(diffculty) //schwierigkeit um einen Block zu besätigen/krieren
    {
        while(this.hash.substring(0, diffculty) != Array(diffculty + 1).join("0")) //sodass hash  mit nullen anfängt
        {
            this.nonce ++;
            this.hash = this.calculateHash();
        }

        console.log("Block wird gemind:" + this.hash);
    }

    hasValidTransaktion()
    {   /////////////////////////////////////////////
        for(const tx of this.transaktionen)
        {
            if(!tx.isValid())
            {
                return false;
            }
        }
        return true;
    }
}

class Blockchain
    {
        constructor()
        { /////////////////////////////////////////////
            this.chain = [this.createGenesisBlock()];
            this.diffculty = 3; //soviele Nullen am anfang hat der Hash dann
            this.pendingTransactions = [];
            this.miningReward = 1000;
        }

        createGenesisBlock ()//erste Block
        { /////////////////////////////////////////////
            return new Block("01/01/2023", [], "0");
        }
        
        getLatestBlock() //letzter BLock 
        { /////////////////////////////////////////////
            return this.chain[this.chain.length - 1];
        }

        minePendingTransaktionen(miningRewardAdress) //miner belohnen
        { /////////////////////////////////////////////
            const rewardTx = new Transaktionen(null, miningRewardAdress, this.miningReward);
            this.pendingTransactions.push(rewardTx);


            let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
            block.mineBlock(this.diffculty);

            console.log("Block erfolgreich mined");
            this.chain.push(block);

            this.pendingTransactions = [];
        }

        addTransaktion(transaktion)
        { /////////////////////////////////////////////
            if(!transaktion.fromAdress || !transaktion.toAdress)
            {
                throw new Error("Error");
            }
           
            if(!transaktion.isValid())
            {
                throw new Error("Kann nicht unehrliche Transaktionen zur Chain hinzufuegen");
            }
            this.pendingTransactions.push(transaktion);

        }


        getBalanceofAdress(adress)
        { /////////////////////////////////////////////
            let balance = 0;
            for(const block of this.chain)
            {
                for(const trans of block.transaktionen)
                {
                    if(trans.fromAdress == adress)
                    {
                        balance-= trans.amount;
                    }

                    if(trans.toAdress == adress)
                    {
                        balance +=trans.amount;
                    }
                }
            }
            return balance;
            
        }
        isChainValid()
        { /////////////////////////////////////////////
            for(let i = 1; i < this.chain.length; i ++)
            {
                const currentBlock = this.chain[i];
                const prevoiusBlock = this.chain [i-1];


                if(!currentBlock.hasValidTransaktion())
                {
                    return false;
                }

                if(currentBlock.hash !== currentBlock.calculateHash())
                {
                    return false;
                }

                if(currentBlock.prevoiusHash !== prevoiusBlock.calculateHash())
                {
                    return false;
                }
            
            }
            return true;
        }
    }

    export { Blockchain, Transaktionen };