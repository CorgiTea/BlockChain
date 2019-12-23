// let a;
// 如果解构已经声明过的变量,需要加括号;
// ({a} = {a:"jza"});
// const ['a','b','c'] = 'a';
// console.log(a);

// let name = '你好';
// let str = `工程师${name}吃饭了吗?`;
// document.write(str.startsWith('师'));
// let str = '1,2,3';
// let sstr = Array.of(str);
// console.log(sstr);



// let json = {
// 	a:'halo',
// 	b:'nihao'
// };
// function get({a,b='web'}){
// 	console.log(a,b)
// }
// get(json);

// let arr = ['吃饭','睡觉','打豆豆'];
// let echo = (a,b,c) => console.log(a,b,c);
// // function echo(a,b,c){
// // 	console.log(a,b,c)
// // }
// echo(...arr);

// 判断数组内是否有值
// let arr = [,,'a'];
// console.log(2 in arr); // true

// let arr =['a','b','c'];
// arr.forEach(fn=(val,index)=> console.log(index,val));
// arr.some(val=>console.log(val))
// arr.filter(val=>console.log(val));
// console.log(arr.map(val=>'web'))
// console.log(arr.join('='));
// console.log(arr.toString());


// let name = '名字';
// let val = '托尼';
// let obj = {name,val};
// console.log(obj)

// let key = 'name';
// let obj = {
// 	[key]:'托尼'
// };
// console.log(obj);

// let obj ={
// 	fn:function(a,b){
// 		return a+b;
// 	}
// };
// console.log(obj.fn(1,2));

// console.log(+0 === -0);
// console.log(NaN === NaN);
// console.log(Object.is(+0,-0));
// console.log(Object.is(NaN,NaN));

// let a = {name:'名字'};
// let b = {age:'15'};
// let c = Object.assign(a,b);
// console.log(c)/

let arr = new Set(['a','b','v']);
arr.forEach((val)=>console.log(val))

// let obj = {a:'ha',b:'hi'};
// // let obj1 = {a:'ha',b:'hi'}; 
// let obj1 = obj;// 如果使用同一个内存,就会覆盖
// let webakobj = new WeakSet();
// webakobj.add(obj);
// webakobj.add(obj1);
// console.log(webakobj)