window.onload = function(){
	//画水印
	var chess = document.getElementById('chess');
	var context = chess.getContext('2d');
	var logo = new Image();
	logo.src = 'img/42a3cc3eb9f15bba5dd210337ca7a914_副本.jpg';
	logo.onload = function(){//图片加载完成后再画，否则水印不会显示
		context.drawImage(logo,0,0,450,450);
		drawChessBorad();  //调用画棋盘函数。（先画水印再画棋盘，否则水印会挡住棋盘线）
	}
	//当点击棋盘时，绑定事件
	chess.onclick = function(e){
		if(over){
			return;
		}
		if(!me){
			return;
		}
		var x = e.offsetX;//定义x为当前落子点的x坐标
		var y = e.offsetY;//定义y为当前落子点的y坐标
		var i = Math.floor(x/30);//默认点击以当前落子点为圆心周围30px半径都为在该点落子（除以30得出水平方向第几个落子点）
		var j = Math.floor(y/30);//默认点击以当前落子点为圆心周围30px半径都为在该点落子（除以30得出竖直方向第几个落子点）
		//当数组为零，表示没有落子，此时调用函数画出棋子（防止落过子后再次点击造成落子颜色变化）
		if(chessborad[i][j] == 0){
			//调用画棋子的oneStep()函数，表示在该点落子
			oneStep(i,j,me);
			//落黑子，令数组为1
//			if(me){
				chessborad[i][j] = 1;
//			}
			//落白子，令数组为2
//			else{
//				chessborad[i][j] = 2;
//			}
//			//让me取反
//		 	me = !me;
			for(var k=0; k<count; k++){
//				if(me == false){
					if(wins[i][j][k]){
						myWin[k]++;
						computerWin[k] = 6;
						if(myWin[k] == 5){
							alert('你赢啦!');
							over = true;
							return;//防止多次弹出“你赢啦！”
						}
					}	
//				}
//				else{
//					if(wins[i][j][k]){
//						computerWin[k]++;
//						if(computerWin[k] == 5){
//							alert('你赢啦!');
//							over = true;
//							return;//防止多次弹出“你赢啦！”
//						}
//					}
//				}
			}
			if(!over){
				me = !me;
				computerAI();
			}
		}
	}
}

//定义一个布尔值变量，当值为true时落黑子，false时落白子
var me = true;
var over = false;
//定义一个二维数组，用来存放棋盘上落子点的落子情况
var chessborad = [];
//数组初始化都为零（表示棋盘上落子点都没有落子）
for(var i=0; i<15; i++){
	chessborad[i] = [];
	for(var j=0; j<15; j++){
		chessborad[i][j] = 0;
	}
}

//赢法数组
var wins = [];
//初始化数组为三维数组
for(var i=0; i<15; i++){
	wins[i] = [];
	for(var j=0; j<15; j++){
		wins[i][j] = [];
	}
}
//定义赢法种数
var count = 0;//初始化为0

//所有横线赢法
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//所有竖线赢法
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//所有斜线赢法
for(var i=0; i<11; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//所有反斜线赢法
for(var i=0; i<11; i++){
	for(var j=14; j>3; j--){
		for(var k=0; k<5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

//赢法统计数组
var myWin = [];
var computerWin = [];
//初始化
for(var i=0; i<count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}

//console.log(count);//打印除所有赢法（种数）
//画棋盘
var drawChessBorad = function(){
	var chess = document.getElementById('chess');
	var context = chess.getContext('2d');
	//定义画笔颜色
	context.strokeStyle = '#BFBFBF';
	for(var i=0; i<15; i++){
		//画横线
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();// 调用stroke（）画线方法
		//画竖线
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();
	}
}
//画棋子
var oneStep = function(i,j,me){
	var chess = document.getElementById('chess');
	var context = chess.getContext('2d');

	//画圆（棋子）
	context.beginPath();
	context.arc(15+i*30, 15+j*30, 13, 0, 2*Math.PI)
	context.closePath();
	//定义圆形渐变
	var grd = context.createRadialGradient(15+i*30+2, 15+j*30-2,13,15+i*30+2, 15+j*30-2,0);
	//如果落黑子，填充黑子渐变效果
	if(me){
		grd.addColorStop(0,'#0A0A0A');//黑色
		grd.addColorStop(1,'#636766');//灰色
	}
	//如果落白子，填充白子渐变效果
	else{
		grd.addColorStop(0,'#D1D1D1');//白灰色
		grd.addColorStop(1,'#F9F9F9');//白色
	}
	context.fillStyle = grd;
	context.fill();
}




var computerAI = function() {
	var max = 0;
	var u = 0; v = 0;
	var myScore = [];
	var computerScore = [];
	//初始化
	for(var i=0; i<15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for(var j=0; j<15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(var i=0; i<15; i++) {
		for(var j=0; j<15; j++) {
			if(chessborad[i][j] == 0) {
				for(var k=0; k<count; k++) {
					if(wins[i][j][k]) {
						if(myWin[k] == 1) {
							myScore[i][j] += 200;
						}
						else if(myWin[k] == 2) {
							myScore[i][j] += 400;
						}
						else if(myWin[k] == 3) {
							myScore[i][j] += 2000;
						}
						else if(myWin[k] == 4) {
							myScore[i][j] += 10000;
						}
						if(computerWin[k] == 1) {
							computerScore[i][j] += 220;
						}
						else if(computerWin[k] == 2) {
							computerScore[i][j] += 420;
						}
						else if(computerWin[k] == 3) {
							computerScore[i][j] += 2100;
						}
						else if(computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				}
				else if(myScore[i][j] == max) {
					if(computerScore[i][j] > computerScore[u][v]) {
						u = i;
					    v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	chessborad[u][v] = 2;
	for(var k=0; k<count; k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k] == 5){
				alert('你输啦!');
				over = true;
				return;//防止多次弹出“你赢啦！”
			}
		}	
	}
	if(!over){
		me = !me;
	}
}
