

const sha256 = require('crypto-js/sha256');
class Block{
	constructor(data,previousHash){
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.getHash();
		this.noce = 1;// 随机数
	}
	getHash(){
		return sha256(this.data + this.previousHash + this.noce).toString();// noce改变加密后的结果
	}
	// 计算复合难度区块的hash
	compositeHash(difficulty){
		while(true){
			this.hash = this.getHash();
			if(this.hash.substring(0,difficulty) !== this.getDifficultyHash(difficulty) ){
				this.noce++;
				this.hash = this.getHash();
			}else{
				break;
			}
		}
		console.log('挖矿结束' + this.hash);
	}
	// 获取复合难度hash
	getDifficultyHash(difficulty){
		let num = '';
		// 难度为多少,开头就有几个0 , 3 "000****"
		for(let i = 0;i<difficulty;i++){
			num += '0';
		}
		return num;
	}
}
class Chain{
	constructor() {
	    this.chain = [this.setParentsBlock()];
		this.difficulty = 5;// 难度
	}
	// 设置祖先区块
	setParentsBlock(){
		const parentsBlock = new Block('祖先区块','');
		return parentsBlock;
	}
	// 获取最新的区块
	getLatestBlcok(){
		return this.chain[this.chain.length - 1];
	}
	// 添加区块
	addBlock(newBlock){
		// 找到最新的hash 添加为新区块的previoushash
		const LatestBlockHash = this.getLatestBlcok().hash;
		newBlock.previousHash = LatestBlockHash;
		// newBlock.hash = newBlock.getHash();
		newBlock.compositeHash(this.difficulty);
		this.chain.push(newBlock);
	}
	// 验证链
	validateChain(){
		if(this.chain.length === 1){
			if(this.chain[0].hash !== this.chain[0].getHash()){
				return false;
			}
			return true;
		}
		// 从第二个开始
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
// console.log(gChain.validateChain());