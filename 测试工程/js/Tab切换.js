function $(id){
	return typeof id==='string'?document.getElementById(id):id;
}
window.onload=function(){
	//获取鼠标滑过或点击的标签和要切换内容的元素
	var titles=$('notice-tit').getElementsByTagName('li'),
	    divs=$('notice-con').getElementsByTagName('div');
	if(titles.length!=divs.length)
	return;
	//便利titles下所有的li
	for(var i=0;i<titles.length;i++){
		titles[i].id=i;
		//鼠标划过切换用onmouseover,点击切换用onclick
		titles[i].onclick=function(){
			//清除所有li上的class
			for(var j=0;j<titles.length;j++){
				titles[j].className=' ';
				divs[j].style.display='none';
			}
			//设置当前为高亮显示
			this.className='select';
			divs[this.id].style.display='block';
		}
	}
}
