const SHA256 = require('crypto-js/sha256');

class BlockCrypto{
    constructor(index,current_time,info, nextHash=" "){
        this.index = index;
        this.current_time = current_time;
        this.info = info;
        this.nextHash = nextHash;
        this.hash = this.computeHash();
    }

    computeHash(){
        return SHA256(this.info + this.nextHash + this.current_time + JSON.stringify(this.info)).toString();
    }

}

class Blockchain{
    constructor(){
        this.block1chain =[this.initGenesisBlock()];
    }
    initGenesisBlock(){
        return new BlockCrypto(0, "10/11/2021", "Initial Block in the Chain", "0");
    }
    latestBlock(){
        return this.block1chain[this.block1chain.length -1];
    }
    addNewBlock(newBlock){
        newBlock.nextHash = this.latestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.block1chain.push(newBlock);
    }
    checkValidity(){
        for(let i = 1; i < this.block1chain.length; i++){
            const curBlock = this.block1chain[i];
            const nextBlock = this.block1chain[i-1];

            if(curBlock.hash !== curBlock.computeHash()){
                return false;
            }

            if(curBlock.nextHash !== nextBlock.hash){
                return false;
            }

        }
        return true;
    }
}

let pcoin = new Blockchain();

pcoin.addNewBlock(new BlockCrypto(1, "06/04/2021", {sender: "Preetham Mukkara", recipient: "Mom", quantity: 50}));

pcoin.addNewBlock(new BlockCrypto(2, "06/04/2021", {sender: "Preetham Mukkara", recipient: "Dad", quantity: 100}));

console.log(JSON.stringify(pcoin, null, 4));