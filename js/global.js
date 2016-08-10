/**
 * Created by Anly.Z on 16/7/27.
 */
function highlightPage() {
	if (!document.getElementsByTagName || !document.getElementById) {
		return false;
	}
	var headers = document.getElementsByTagName('header');
	var navs = headers[0].getElementsByTagName('nav');
	if (headers.length < 1 && navs.length < 1) return false;
	var links = navs[0].getElementsByTagName('a');
	for (var i = 0, len = links.length; i < len; i++) {
		var url = links[i].getAttribute('href');
		if (window.location.href.indexOf(url) != -1) {
			links[i].className = 'here';
			var link_text = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id', link_text);
		}
	}
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
// addLoadEvent(showSection);

//移动动画
function moveElement(elementID, final_x, final_y, interval) {
	if (!document.getElementById) return false;
	var elem = document.getElementById(elementID);
	if (!elem) return false;
	if (elem.movement) {
		clearTimeout(elem.movement)
	}
	if (!elem.style.left) {
		elem.style.left = '0px';
	}
	if (!elem.style.top) {
		elem.style.top = '0px';
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;
	if (xpos == final_x && ypos == final_y) return true;
	if (xpos < final_x) {
		dist = Math.ceil((final_x - xpos) / 10);
		xpos += dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos - final_x) / 10);
		xpos -= dist;
	}
	if (ypos < final_y) {
		dist = Math.ceil((final_y - xpos) / 10);
		ypos += dist;
	}
	if (ypos > final_y) {
		dist = Math.ceil((ypos - final_y) / 10);
		ypos += dist;
	}
	elem.style.left = xpos + 'px';
	elem.style.top = ypos + 'px';
	var repeat = "moveElement( '" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
	elem.movement = setTimeout(repeat, interval);
}

//幻灯片
function prepareSlideshow() {
	if (!document.getElementsByTagName || !document.getElementById) {
		return false;
	}
	var intro = document.getElementById('intro');
	if (intro.length < 1) return false;
	var slideshow = document.createElement('div');
	var preview = document.createElement('img');
	slideshow.setAttribute('id', 'slideshow');
	//var frame = document.createElement('img');
	//frame.setAttribute('id','frame');
	//frame.setAttribute('src','../images/slideshow.png');
	//frame.setAttribute('alt','');
	preview.setAttribute('id', 'preview');
	preview.setAttribute('src', '../images/slideshow.png');
	preview.setAttribute('alt', 'a glimpse of what awaits you');
	slideshow.appendChild(preview);
	//slideshow.appendChild(frame);
	insertAfter(slideshow, intro);

	var links = document.getElementsByTagName('a');
	var des;
	for (var i = 0, len = links.length; i < len; i++) {
		links[i].onmouseover = function () {
			des = this.getAttribute('href');
			if (des.indexOf('home.html') != -1) {
				moveElement('preview', 0, 0, 5);
			}
			if (des.indexOf('about.html') != -1) {
				moveElement('preview', -150, 0, 5);
			}
			if (des.indexOf('photos.html') != -1) {
				moveElement('preview', -300, 0, 5);
			}
			if (des.indexOf('live.html') != -1) {
				moveElement('preview', -450, 0, 5);
			}
			if (des.indexOf('contact.html') != -1) {
				moveElement('preview', -600, 0, 5);
			}
		}
	}
}

//insert element in after
function insertAfter(newElement, targetElement) {
		var parent = targetElement.parentNode;
		if (parent.lastChild == targetElement) {
			parent.appendChild(newElement);
		} else {
			parent.insertBefore(newElement, targetElement.nextSibling)
		}
}

function showSection(id) {
	var sections = document.getElementsByTagName('section');
	for (var i = 0, len = sections.length; i < len; i++) {
		if (sections[i].getAttribute('id') != id) {
			sections[i].style.display = 'none';
		} else {
			sections[i].style.display = 'block';
		}
	}
}



function showPic(whichpic) {
	if (!document.getElementById('img')) return false;
	var src = whichpic.getAttribute('href');
	var placeholderImg = document.getElementById('img');
	placeholderImg.setAttribute('src', src);
	if (document.getElementById('description')) {
		var text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : '';
		var description = document.getElementById('description');
		description.firstChild.nodeValue = text;
	}
	return true;
}

function prepareGallery() {
	if (!document.getElementsByTagName || !document.getElementById || !document.getElementById('image-gallery')) {
		return false;
	}
	var gallery = document.getElementById('image-gallery');
	var links = gallery.getElementsByTagName('a');
	for (var i = 0, len = links.length; i < len; i++) {
		links[i].onclick = function () {
			return !showPic(this);
		}
	}
}

function preparePlaceholder() {
	var div = document.createElement('div');
	div.setAttribute('class', 'placeholderImg');
	var img = document.createElement('img');
	img.setAttribute('id', 'img');
	img.setAttribute('alt', 'placeholder');
	div.appendChild(img);
	var p = document.createElement('p');
	p.setAttribute('id', 'description');
	var pTxt = document.createTextNode('Choose in image');
	p.appendChild(pTxt);
	var gallery = document.getElementById('image-gallery');
	insertAfter(div,gallery);
	insertAfter(p, div);
}


addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);