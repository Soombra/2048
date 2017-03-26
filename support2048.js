var documentWidth=window.screen.availWidth,
	containerWidth=0.92*documentWidth,
	cellWidth=0.18*documentWidth,
	cellSpace=0.04*documentWidth;
function getTop(i,j){
	return cellSpace+i*(cellSpace+cellWidth);
}
function getLeft(i,j){
	return cellSpace+j*(cellSpace+cellWidth);
}

function getNumberBackgroundColor(num){
	switch(num){
		case 2:return "#eee4da";break; 
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "black";
}

function getNumberColor(num){
	if(num<=4){
		return "#776e65";
	}
	return "white";
}

function nospace(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

function canMoveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]==0){
				return true;
			}else{
				if(board[i][j-1]==0||board[i][j]==board[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveRight(){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(board[i][j]==0){
				return true;
			}else{
				if(board[i][j+1]==0||board[i][j]==board[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveUp(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return true;
			}else{
				if(board[i-1][j]==0||board[i][j]==board[i-1][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown(){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return true;
			}else{
				if(board[i+1][j]==0||board[i][j]==board[i+1][j]){
					return true;
				}
			}
		}
	}
	return false;
}


function noBlockX(row,col1,col2){
	for(var i=col2+1;i<col1;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}

function noBlockY(row1,row2,col){
	for(var i=row2+1;i<row1;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}

function noMove(){
	if(canMoveDown()||canMoveUp()||canMoveLeft()||canMoveRight()){
		return false;
	}
	return true;
}

function updateScore(){
	$("#score").text(score);
}