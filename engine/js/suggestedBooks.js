//  ------------------------------------------------------------------
//  
PBS.KIDS.storybook.suggestedBooks = function (GLOBAL, PBS, options) {
	
	"use strict";
	//GLOBAL.element;
	var that,
	element,
	innerDiv,
	
		sb =PBS.KIDS.storybook,	
		
		//initialized = false,
		parentElement = options && options.parentElement,
		suggestedBooks = [],			
		
		init = function(){
				
			var  width, height;			
		
				// Create the drawing pad element
				element.className = "suggestedBooks";
				if (options.className) {
					element.className += " " + options.className;
				}	
		
				// e.g. 90px
				if (sb.isInPixelUnits(that.width)) {
					width = sb.getNumberFromString(that.width);
				// e.g. 90%
				} else if (sb.isInPercentageUnits(that.width)) {
					width = sb.getNumberFromString(that.width) * that.parentWidth / 100;
				// e.g 90
				} else {
					width = that.width * that.parentWidth / 100;
				}
				
				// e.g. 90px
				if (sb.isInPixelUnits(that.height)) {
					height = sb.getNumberFromString(that.height);
				// e.g. 90%
				} else if (sb.isInPercentageUnits(that.height)) {
					height = sb.getNumberFromString(that.height) * that.parentHeight /100;
				// e.g 90
				} else {
					height = that.height * that.parentHeight / 100;
				}		

		};		
		
	//adds images to outer container
	element = GLOBAL.document.createElement("div");
	element.id = "suggestedBooksContainer";	
	console.log(element);		
	element.style.width = "100%";
	element.style.height = "100%";
	element.style.position = "absolute";
	//add to dom
	GLOBAL.document.body.appendChild(element);

// Create our XMLHttpRequest object
var hr = new XMLHttpRequest(); 	
// Gets images from server and adds them to container	
function ajax_get_json(){
	 innerDiv = GLOBAL.document.getElementById("suggestedBooksContainer");
	 console.log(innerDiv);	       
    hr.open("GET", "http://ingemit.com/kevin/my_json_list.php", true);
    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type", "application/json",true);		 
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		  	var data = JSON.parse(hr.responseText);					
				for( var obj in data){
					//create a div element
					var div = GLOBAL.document.createElement("div");
					div.style.width = "50%";
					div.style.height = "50%";
					div.style.float = "left";					
					//create img tag
					var img = GLOBAL.document.createElement("img");							
					//set source to url
					img.style.width = "100%";
					img.style.height = "100%";
					img.style.float = "left";
					img.src = data[obj].url ;	
					console.log(img.src);													
					div.appendChild(img) + "<br/>"; 
					console.log(img);
					innerDiv.appendChild(div);
				
					//create header for book title
					var title = document.createElement("H3");
					title.innerHTML = data[obj].title;
					title.style.fontSize = "x-large";
					title.style.position = "absolute";
					//title.style.verticalAlign = "bottom";
					div.appendChild(title) + "<br/>";
				
					//create paragraph for description
					var desc = document.createElement("p");
					desc.innerHTML = data[obj].desc;
					desc.style.fontSize = "x-large";
					desc.style.position = "absolute";
					desc.style.verticalAlign = "bottom";
					div.appendChild(desc);							
				}

	    }
    }
    // Send the data to PHP now... 
    hr.send(null); // Actually execute the request   
}
		
ajax_get_json();


	
	
	
	

			
		
	 that = PBS.KIDS.storybook.view(PBS, element);
		if (parentElement) {
				parentElement.appendChild(element);
		}
		
	// Public properties
	that.x = options && (options.x !== undefined) ? options.x : 0;
	that.y = options && (options.y !== undefined) ? options.y : 0;
	that.width = options && (options.width !== undefined) ? options.width : 100 - that.x + "%";
	that.height = options && (options.height !== undefined) ? options.height : 100 - that.y + "%";
	
	that.parentWidth = options && (options.parentWidth !== undefined) ? options.parentWidth : 100;
	that.parentHeight = options && (options.parentHeight !== undefined) ? options.parentHeight : 100;
		
	
		init();
		
		return that;		


};