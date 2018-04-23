function startMove(obj,json,fn){
	var flag = true;
	//1.先清除所有定时器
	clearInterval(obj.timer);
	//2.定义定时器
	obj.timer = setInterval(function(){
		for(var attr in json){
		//定义一个变量，初始化为0，代替当前属性值（因为没有obj.offaetOpacity这个值，所以得将当前属性值赋值给一个变量）
			var icur = 0;
		//（2）判断属性值attr是否为透明度
			if(attr == 'opacity'){
				icur = parseFloat(getStyle(obj,attr))*100;//parseFloat:取小数
				//没有obj.offaetOpacity这个值，所以只能用getStyle（）函数获取当前的元素透明度属性值
			}
				
			else{
				var icur = parseInt(getStyle(obj,attr));//parseInt:取整数
				//getStyle(obj,attr)表示当前对象的attr属性值，在这个地方相当于obj.offsetWidth值，这个值是不断变化的
			}
		//（3）定义速度		
			var speed = (json[attr] - icur)/10;
		//（4）对速度进行判断取整（Math.ceil:向上取整；Math.floor:向下取整 涉及到运动问题中的数字问题，都要对其进行判断取整）
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
		//（5）如果当前值没有都达到目标值，令flag=false
			if (icur != json[attr]) {
			    flag = false;
			}else {
			    flag = true;
			}
		//（6）接着执行赋值操作	
			//再次判断属性attr是否为透明度
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:'+(icur+speed)+')'; //滤镜透明度值用整数，不用化为小数值
				obj.style.opacity = (icur+speed)/100;//计算完后将透明度值化为小数
			}
			//如果不是			
			else{
				obj.style[attr] = icur + speed +'px';
			}
		//（7）如果当前值都达到了目标值（flag=true），则执行清除定时器和回调函数
			if(flag){
				clearInterval(obj.timer);
				//如果清除定时器时传来了fn，则执行回调函数fn(),即再次执行它本身			
				if(fn){
					fn();
				}
			}
		}
	},30)
}
//3.库函数，获取元素属性值
function getStyle(obj,attr){
	if(obj.currentStyle){        //currentStyle 针对IE浏览器
		return obj.currentStyle[attr];
	}
	else{                        //getComputerStyle 针对firefox浏览器
		return getComputedStyle(obj,false)[attr];
	}
}

