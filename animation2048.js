function showNumber(i,j,num){
	var numberCell=$("#number-cell-"+i+"-"+j);
	numberCell.css({
		"background-color":getNumberBackgroundColor(num),
		"color":getNumberColor(num)
	});
	numberCell.text(num);

	numberCell.animate({
		width:cellWidth,
		height:cellWidth,
		top:getTop(i,j),
		left:getLeft(i,j)
	},300);
}

function showMove(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getTop(tox,toy),
		left:getLeft(tox,toy)
	},200);
}