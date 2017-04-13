CIRC = {};
CIRC.drawing = false;
CIRC.needToReset = false;
CIRC.pointsArray = [];
CIRC.pointRadius = 4;

$(document).ready(function(){
	CIRC.draw = SVG('grid').size($(document).width()-20 , $(document).height()-50).style("background-color","#effafa");
	
	var xOffset =$('#grid').position().left;
	var yOffset = $('#grid').position().top;
	
	CIRC.draw.mousedown(function(e) {
		start_draw(e);
	});
	CIRC.draw.touchstart(function(e) {
		start_draw(e);
	});
	
	function start_draw(e){
		e.preventDefault();
		if (e.changedTouches != undefined) {
			e=e.changedTouches[0];
		}
		if (CIRC.needToReset) {
			CIRC.needToReset = false;
			reset();
		}
		
		CIRC.drawing = true;
		CIRC.xOffset =$('#grid').position().left;
		CIRC.yOffset = $('#grid').position().top;
		
		CIRC.draw.circle(CIRC.pointRadius).move(e.clientX-CIRC.xOffset-CIRC.pointRadius/2 ,e.clientY-CIRC.yOffset-CIRC.pointRadius/2).fill('#7B92ED');
		CIRC.pointsArray.push([e.clientX,e.clientY]);
	}
	

	CIRC.draw.mouseup(function(e) {
		e.preventDefault();
		CIRC.drawing = false;
	});
	
	CIRC.draw.touchend (function(e) {
		e.preventDefault();
		//CIRC.drawing = false;
	});
	
	
	CIRC.draw.mousemove(function(e) {
		draw_points(e);
	});
	CIRC.draw.touchmove(function(e) {
		draw_points(e);
	});
	
	function draw_points(e){
	  if (CIRC.drawing) {
		if (e.changedTouches != undefined) {
			e=e.changedTouches[0];
		}
		CIRC.draw.circle(CIRC.pointRadius).move(e.clientX-CIRC.xOffset-CIRC.pointRadius/2 ,e.clientY-CIRC.yOffset-CIRC.pointRadius/2).fill('#7B92ED');
		CIRC.pointsArray.push([e.clientX,e.clientY]);
		//alert (e.clientX);
	  }
	}
	
	$('#btn_compare').click(function() {
		if (!CIRC.needToReset) {
			CIRC.needToReset = true;
			compareToPerfectCircle();
		}
	});
	
	$('#btn_reset').click(function() {
		reset();
	});
}); 


function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function reset() {
	CIRC.pointsArray = [];
	CIRC.draw.clear();
	
}

function compareToPerfectCircle(){
	if(CIRC.pointsArray.length > 2) {
		//-----least squares circle regression
		//-----math taken from http://www.had2know.com/academics/best-fit-circle-least-squares.html
		
		//-----matrix components
		var sum_x = (sum(0));
		
		var sum_y = (sum(1));
		var sum_x2 = (square(0));
		var sum_y2 = (square(1));
		var sum_xy = xy();
		var n = CIRC.pointsArray.length;
		var sum_eq1 = eq_1();
		var sum_eq2 = eq_2();
		var sum_eq3 = eq_3();		
		
		//-----matrix setup
		var LHS = $M([
		  [sum_x2,sum_xy,sum_x],
		  [sum_xy,sum_y2,sum_y],
		  [sum_x,sum_y,n]
		]);
		
		var RHS = $M([
		  [sum_eq1],
		  [sum_eq2],
		   [sum_eq3]
		]);
		
		//-------matrix calculation
		var LHS_inv = LHS.inv();
		if (LHS_inv != null) {
			var ABC = LHS_inv.multiply(RHS);
			
			//-----get estimates for circle x, y, and r
			var circle_r = Math.sqrt(4*ABC.elements[2][0]+ABC.elements[0][0]*ABC.elements[0][0] + ABC.elements[1][0]*ABC.elements[1][0]);
			var circle_x = ABC.elements[0][0]/2;
			var circle_y = ABC.elements[1][0]/2;
			
			//----draw the estimate circle
			CIRC.draw.circle(circle_r).move(circle_x-circle_r/2-CIRC.xOffset,circle_y-circle_r/2-CIRC.yOffset).attr({ 'fill-opacity': 0, stroke: '#000' ,'stroke-width': 1});

			//-----get sum of errors
			var sumErrors = getSumOfErrors(circle_x,  circle_y,  circle_r);

			//-----statistics
			var completeness_x = Math.pow(sum(0) / n - circle_x,2);
			var completeness_y = Math.pow(sum(1) / n - circle_y,2);
			var completeness_total = completeness_x+completeness_y;
			var errorPerPoint = Math.round(100*sumErrors /n)/100 ;
			var totalScore = (Math.pow(Math.min(n,3000),1.3)*Math.pow(circle_r/2,2)) / (Math.pow(Math.max(errorPerPoint,1),1.3) * Math.max(completeness_total,1));
			
			var text = CIRC.draw.text(function(add) {
			add.tspan('Points drawn (higher=better): '+ths(n) ).newLine()
			add.tspan('Radius (higher=better): ' +ths(Math.round(circle_r))).newLine()
			add.tspan('Sum of errors (lower=better): ' +ths(Math.round(sumErrors))).newLine()
			add.tspan('Error / point (lower=better): ' +errorPerPoint).newLine()
			add.tspan('Disbalance (lower=better): ' +ths(Math.round(10*completeness_total)/10)).newLine()
			add.tspan('============================').newLine()
			add.tspan('Total score (higher=better): ' +ths(Math.round(totalScore))).newLine()
			}).move(10, 10).font({ size: 12 }).fill({ color: '#000' });
		} else {
			
			alert('the points you provided are not circular, please try again');
		}
			
	} else {
		alert('you need to draw at least 3 points');
	}
	
}

function square(i){
	return CIRC.pointsArray.reduce(function(previousValue, currentValue){
		return +previousValue+currentValue[i]*currentValue[i];
	},0);
}

function sum(i){
	return CIRC.pointsArray.reduce(function(previousValue, currentValue){
		return +previousValue+currentValue[i];
	},0);
}

function xy(){
	return CIRC.pointsArray.reduce(function(previousValue, currentValue){
		return +previousValue+currentValue[0]*currentValue[1];
	},0);
}

function eq_1(){
	return CIRC.pointsArray.reduce(function(previousValue, currentValue){
		return +previousValue+currentValue[0]*(currentValue[0]*currentValue[0] + currentValue[1]*currentValue[1]);
	},0);
}

function eq_2(){
	return CIRC.pointsArray.reduce(function(previousValue, currentValue){
		return +previousValue+currentValue[1]*(currentValue[0]*currentValue[0] + currentValue[1]*currentValue[1]);
	},0);
}

function eq_3(){
	return CIRC.pointsArray.reduce(function(previousValue, currentValue){
		return +previousValue+(currentValue[0]*currentValue[0] + currentValue[1]*currentValue[1]);
	},0);
}

function getSumOfErrors(x,y,r){
	return CIRC.pointsArray.reduce(function(previousValue, c){
		return +previousValue+Math.abs(Math.sqrt((c[0]-x)*(c[0]-x) + (c[1]-y)*(c[1]-y)) - r/2);
	},0);
	
}

function ths(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}