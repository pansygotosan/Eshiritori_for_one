window.URL = window.URL || window.webkitURL;

var form = document.querySelector("form") ;
var input = document.querySelector("input[name=field1]") ;
var output = document.querySelector("output") ;

var file_input = document.querySelector("input[name=file]") ;

var shiritori=new Array();
var illust=new Array();
var num1=0;
var num2=0;

function on_submit(e){
	if(document.form1.field1.value != ""){
		var moji = document.form1.field1.value.slice( -1 ) ;
		
		// playsound("sound.mp3");

		//画像変換-----------
		var cv = document.getElementById("myCanvas");
		var cvx = cv.getContext("2d");
	  	var dataURI = cv.toDataURL();
	  	// "iVBORw..."をバイナリに変換
		var byteString = atob( dataURI.split( "," )[1] ) ;
		// "image/png"
		var mimeType = dataURI.match( /(:)([a-z\/]+)(;)/ )[2] ;
		// バイナリからBlobを作成
		for( var i=0, l=byteString.length, content=new Uint8Array( l ); l>i; i++ ) {
			content[i] = byteString.charCodeAt( i ) ;
		}
		var blob = new Blob( [ content ], {
			type: mimeType ,
		} ) ;

		var a = window.URL.createObjectURL( blob ) ;
		output.innerHTML +="<img src=" + a + "  Width='150' id='message' class='message' >";
		output.innerHTML +="<span class='message'>&nbsp→&nbsp</span>";
		illust[num2]=a;
		num2++;

		var msg = document.form1.field1.value;
		shiritori[num1]=msg;
		num1++;
		
		// 現在のスクロール位置
		var scrollPosition = document.getElementById("auto_scroll").scrollLeft;
		// スクロール要素の高さ
		var scrollWidth = document.getElementById("auto_scroll").scrollWidth;
		document.getElementById("auto_scroll").scrollLeft = scrollWidth;

		if(moji=="ん"){
			output.innerHTML +="<div>おわり</div>";
			document.getElementById("overlay").style.display = "block";
		}

		input.value="";
		delete_canvas();

	}
}


function playsound(filename){
	var e = new Audio();
	e.src=filename;
	e.play();
}

function on() {
    document.getElementById("overlay").style.display = "block";
    var result = document.getElementById("result");
	for(var i=0;i<num1;i++){
		result.innerHTML +="<div class='eshiritori'><img src=" + illust[i] + "   class='illust'> <div class='text' >"+shiritori[i]+"</div></div>";
	}
}



function off() {
    document.getElementById("overlay").style.display = "none";
    window.location.reload();
}


