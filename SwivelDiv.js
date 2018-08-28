// Ex. initSwivelDiv("#divGuy",15,10)
// Note: Single Selectors only None of this -> initSwivelDiv("#thing.class #Guy")
function initSwivelDiv(divName, maxSwivel, maxShadow){
	// Find Div
	if (divName.indexOf("#")==0){
		var divElement = document.getElementById(divName.replace(/^#/,""));
		divElement.onmousemove=function(e){touchTilt(e,maxSwivel,maxShadow)}
		divElement.onmouseout=touchTiltReset;
	}else if (divName.indexOf(".")==0){
		var divElement = document.getElementByClassName(divName.replace(/^\./,""));
		for (i=0;i<divElement.length;i++){
			divElement[i].onmousemove=function(e){touchTilt(e,maxSwivel,maxShadow)}
			divElement[i].onmouseout=touchTiltReset;
		}
	}
}
function removeSwivelDiv(divName){
	// Find Div
	if (divName.indexOf("#")==0){
		var divElement = document.getElementById(divName.replace(/^#/,""));
		divElement.onmousemove=null;
		divElement.onmouseleave=null;
		divElement.onmouseout=null;
	}else if (divName.indexOf(".")==0){
		var divElement = document.getElementByClassName(divName.replace(/^\./,""));
		for (i=0;i<divElement.length;i++){
			divElement[i].onmousemove=null;
			divElement[i].onmouseleave=null;
			divElement[i].onmouseout=null;
		}
	}
}

function touchTilt(e,tiltAmt,shadowMax){
	var tiltAmt = tiltAmt||12;
	var shadowMax = shadowMax||10;
	var windowScroll = window.pageYOffset;
	var sizeX = e.target.offsetWidth;
	var sizeY = e.target.offsetHeight;
	var posX = e.pageX - (e.target.getBoundingClientRect().x+(sizeX/2));
	var posY = e.pageY - (e.target.getBoundingClientRect().y+(sizeY/2)+windowScroll);
	e.target.style.transition = ".1s all";
	e.target.style.transform = "rotateX("+((posY/100)*tiltAmt)+"deg) rotateY("+((posX/-100)*tiltAmt)+"deg)";
	e.target.style.boxShadow = ((posX/-100)*shadowMax)+"px "+((posY/-100)*shadowMax)+"px 5px #333";
	setTimeout(function(){e.target.style.transition = ".5s all";},100);
}
 function touchTiltReset(e){
	e.target.style.transform = "rotateY(0deg) rotateX(0deg)";
	e.target.style.boxShadow = "3px 3px 3px #333";
}


