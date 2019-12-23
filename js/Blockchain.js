

const sha256 = require('crypto-js/sha256');
class Block{
	constructor(data,previousHash){
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.getHash();
	}
	getHash(){
		return sha256(this.data+this.previousHash).toString();
	}
	
}
class Chain{
	constructor() {
	    this.chain = [this.setParentsBlock()];
	}
	setParentsBlock(){
		const parentsBlock = new Block('祖先区块','');
		return parentsBlock;
	}
	
	getLatestBlcok(){
		return this.chain[this.chain.length - 1];
	}
	
	addBlock(newBlock){
		// 找到最新的hash 添加为新区块的previoushash
		const LatestBlockHash = this.getLatestBlcok().hash;
		newBlock.previousHash = LatestBlockHash;
		newBlock.hash = newBlock.getHash();
		this.chain.push(newBlock);
	}
	validateChain(){
		if(this.chain.length === 1){
			if(this.chain[0].hash !== this.chain[0].getHash()){
				return false;
			}
			return true;
		}
		for(let i = 1;i<=this.chain.length - 1;i++){
			const block = this.chain[i];
			if(this.chain[i].hash !== this.chain[i].getHash()){
				console.log('数据篡改');
				return false;
			}
			const previousBlock = this.chain[i-1];
			if(this.chain[i].previousHash !== previousBlock.hash){
				console.log('区块链出现断链');
				return false;
			}
		}
		return true;
	}
	// observe(obj){
	// 	Object.keys(obj).forEach((key)=>{
	// 		let val = obj[key];  
	// 		Object.defineProperty(obj,key,{
	// 			enumerable: true,
	// 			configurable: true,
	// 			get: function () {
	// 				console.log(val)
	// 				console.log(`${key}，被访问。`)
	// 				return val;
	// 			},
	// 			set: function (newV) {
	// 				console.log(`${key}，属性值发生变化。`)
	// 				console.log(`新的值为：${JSON.stringify(newV)}。`)
	// 				if (Observer.isObject(newV)) {
	// 					new Observer(newV);
	// 				}
	// 				val = newV;
	// 			}
	// 		})  
	// 	},this)
	// }
}


const block = new Block('转账10元');


const gChain = new Chain();
const block2 = new Block('转账20元');
gChain.addBlock(block2);
const block3 = new Block('转账30元');
gChain.addBlock(block3);
// gChain.chain[1].data = '转账100元';
// gChain.chain[1].hash = gChain.chain[1].getHash();
console.log(gChain.validateChain());