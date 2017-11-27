/**
 * Created by rockyl on 15/12/21.
 */

var added = false;
function showQrCode(url,_top,_height){
	var img;
	if(!added){
		added = true;
		img = document.createElement("img");
		img.className = 'imgQrCode';
		var egretPlayer = document.getElementsByClassName('egret-player')[0];
		egretPlayer.appendChild(img);

		img.style.margin = 'auto';
		img.style.position = 'absolute';
		img.style.left = '0';
		img.style.right = '0';
	}
	img = document.getElementsByClassName('imgQrCode')[0];
	img.src = url;

	img.style.visibility = 'visible';

	var ww = window.innerWidth;
    var wh = window.innerHeight;
    img.style.top = _top + 'px';
    img.style.width = _height + 'px';
    img.style.height = _height + 'px';
}

function hideQrCode(){
	img = document.getElementsByClassName('imgQrCode')[0];
	img.style.visibility = 'hidden';
}