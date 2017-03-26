var board=new Array();
var score=0;
var hasConflicted=[];

//移动端事件
var startX=0,
	startY=0,
	endX=0,
	endY=0;
$(document).ready(function(){
	mobileStyle();
	newgame();
});

function mobileStyle(){
	if(documentWidth>500){
		containerWidth=500;
		cellSpace=20;
		cellWidth=100;
	}
	$("#container").css({
		"width":containerWidth-2*cellSpace,
		"height":containerWidth-2*cellSpace,
		"padding":cellSpace,
		"border-radius":0.02*containerWidth
	});
	$(".cell").css({
		"width":cellWidth,
		"height":cellWidth,
		"border-radius":"6px"
	});
}

function newgame(){
	init();
	generateNumber();
	generateNumber();
}

function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$("#cell-"+i+"-"+j);
			gridCell.css("top",getTop(i,j));
			gridCell.css("left",getLeft(i,j));
		}
	}

	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}
	score=0;
	updateBoardView();
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			if(board[i][j]==0){
				theNumberCell.css({
					"width":"0px",
					"height":"0px",
					"top":getTop(i,j)+cellWidth/2,
					"left":getLeft(i,j)+cellWidth/2
				});
			}else{
				theNumberCell.css({
					"width":cellWidth,
					"height":cellWidth,
					"top":getTop(i,j),
					"left":getLeft(i,j),
					"background-color":getNumberBackgroundColor(board[i][j]),
					"color":getNumberColor(board[i][j]),
					// "line-height":cellWidth+"px",
					// "font-size":0.6*cellWidth
				});
				theNumberCell.text(board[i][j]);
				if(theNumberCell.text()>=1024){
					theNumberCell.css("font-size","40px");
				}
			}
			hasConflicted[i][j]=false;
		}
	}
	$(".number-cell").css({//不明白  以后思考
		"line-height":cellWidth+"px",
		"font-size":0.6*cellWidth
	});
}

function generateNumber(){
	if(nospace()){
		return false;
	}
	var randX,randY;
	// while(true){
	// 	randX=parseInt(Math.floor(Math.random()*4));
	// 	randY=parseInt(Math.floor(Math.random()*4));
	// 	if(board[randX][randY]==0){
	// 		break;
	// 	}
	// }
	var randArray=[];
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				randArray.push([i,j]);
			}
		}
	}
	var randCoordinate=randArray[Math.floor(Math.random()*randArray.length)];
	randX=randCoordinate[0];
	randY=randCoordinate[1];
	var randNumber=Math.random()<0.5?2:4;
	board[randX][randY]=randNumber;
	showNumber(randX,randY,randNumber);

	//return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if(moveLeft()){
				generateNumber();
				isgameover();
			}
			break;
		case 38://up
			if(moveUp()){
				generateNumber();
				isgameover();
			}
			break;
		case 39://right
			if(moveRight()){
				generateNumber();
				isgameover();
			}
			break;
		case 40://down
			if(moveDown()){
				generateNumber();
				isgameover();
			}
			break;
	}
});

document.addEventListener("touchstart",function(e){
	startX=e.touches[0].pageX;
	startY=e.touches[0].pageY;
});
document.addEventListener("touchmove",function(e){
	e.preventDefault();
});
document.addEventListener("touchend",function(e){
	endX=e.changedTouches[0].pageX;
	endY=e.changedTouches[0].pageY;
	var changeX=endX-startX;
	var changeY=endY-startY;
	if(Math.abs(changeX)>=Math.abs(changeY)){
		if(changeX>40){
			if(moveRight()){
				generateNumber();
				isgameover();
			} 
		}else if(changeX<-40){
			if(moveLeft()){
				generateNumber();
				isgameover();
			} 
		}
	}else{
		if(changeY>40){
			if(moveDown()){
				generateNumber();
				isgameover();
			}
		}else if(changeY<-40){
			if(moveUp()){
				generateNumber();
				isgameover();
			}
		}
	}
});


function isgameover(){
	if(nospace()&&noMove()){
		setTimeout(function(){
			alert("Game Over!");
		},300);
	}
}

function moveLeft(){
	if(!canMoveLeft()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockX(i,j,k)){
						showMove(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
					}else if(board[i][k]==board[i][j]&&noBlockX(i,j,k)&&!hasConflicted[i][k]){
						showMove(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						hasConflicted[i][k]=true;
					}
				}	
			}
			
		}
	}
	updateScore();
	setTimeout(updateBoardView,200);
	return true;
}
function moveRight(){
	if(!canMoveRight()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>-1;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockX(i,k,j)){
						showMove(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
					}else if(board[i][k]==board[i][j]&&noBlockX(i,k,j)&&!hasConflicted[i][k]){
						showMove(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						hasConflicted[i][k]=true;
					}
				}	
			}
			
		}
	}
	updateScore();
	setTimeout(updateBoardView,200);
	return true;
}
function moveUp(){
	if(!canMoveUp()){
		return false;
	}
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockY(i,k,j)){
						showMove(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
					}else if(board[k][j]==board[i][j]&&noBlockY(i,k,j)&&!hasConflicted[k][j]){
						showMove(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						hasConflicted[k][j]=true;
					}
				}	
			}
			
		}
	}
	updateScore();
	setTimeout(updateBoardView,200);
	return true;
}
function moveDown(){
	if(!canMoveDown()){
		return false;
	}
	for(var i=2;i>-1;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockY(k,i,j)){
						showMove(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
					}else if(board[k][j]==board[i][j]&&noBlockY(k,i,j)&&!hasConflicted[k][j]){
						showMove(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						hasConflicted[k][j]=true;
					}
				}	
			}
			
		}
	}
	updateScore();
	setTimeout(updateBoardView,200);
	return true;
}
