//REPLACE FOR JQUERY READY
//listen for changes to document.readyState - onreadystatechange is fired when readyState value is changed
//Alternative to 'DOMContentLoaded' - when readyState=='interactive' the event DOMContentLoaded was fired
document.onreadystatechange = function () {
	if(document.readyState === 'interactive') {

		// AJAX Functions //////////////////////////////////////////////////////////

		// function addItemsAjax() {
		// 	var request = new XMLHttpRequest();
		// 	request.open('GET', '/', true);
		// 	request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		//
		// 	request.onload = function() {
		// 		if (request.status >= 200 && request.status < 400) {
		// 			// Success!
		// 			var data = JSON.parse(request.response);
		// 			if (data.length > 0) {
		// 				var items = getItems(data);
		// 				var fragment = getFragment(data);
		// 				loadImages(fragment, items);
		// 			}
		// 		} else {
		// 			// Error!
		// 			console.log("Error: "+request.status);
		// 		}
		// 	};
		//
		// 	request.send();
		// }

		// function loadImages(fragment, items) {
		// 	window.removeEventListener('scroll', ajaxScroll, false);
		//
		// 	// append elements to container
		// 	grid.appendChild(fragment);
		//
		// 	var imgLoad = imagesLoaded(items);
		//
		// 	imgLoad.on('progress', function(instance, image) {
		// 		var el = document.querySelector("img[src='"+image.img.getAttribute('src')+"']");
		// 		var parent = findParent(el, 'grid-item');
		// 		// un-hide item
		// 		parent.style.display = '';
		// 		// masonry does its thing
		// 		msnry.appended(parent);
		// 	});
		//
		// 	imgLoad.on('always', function(instance) {
		// 		window.addEventListener('scroll', ajaxScroll, false);
		// 	});
		// }

		// function getItems(data) {
		// 	var elems = [];
		// 	for (i=0; i<data.length; i++) {
		// 		var item = getItemElement(data[i].thumb, data[i].original);
		// 		// hide by default
		// 		item.style.display = 'none';
		// 		elems.push(item);
		// 	}
		// 	return elems;
		// }

		// function getFragment(data) {
		// 	var fragment = document.createDocumentFragment();
		// 	for (i=0; i<data.length; i++) {
		// 		var item = getItemElement(data[i].thumb, data[i].original);
		// 		// Add item to lightbox
		// 		lightbox.thumbnails.push(item.querySelector('a'));
		// 		// hide by default
		// 		item.style.display = 'none';
		// 		fragment.appendChild(item);
		// 	}
		// 	return fragment;
		// }

		// function getItemElement(imgURL, aURL) {
		// 	var img = document.createElement('img');
		// 	img.src = imgURL;
		// 	var lnk = document.createElement('a');
		// 	lnk.href = aURL;
		// 	// Set lightbox attributes
		// 	lnk.setAttribute('data-jslghtbx', aURL);
		// 	lnk.setAttribute('data-jslghtbx-group', 'mygroup1');
		// 	lnk.appendChild(img);
		// 	var figure = document.createElement('figure');
		// 	figure.className = 'grid-item';
		// 	figure.appendChild(lnk);
		//
		// 	return figure;
		// }


		// Responsive Burger Button & Tags /////////////////////////////////////////

		var burgerBtn = document.getElementsByClassName('burger-btn')[0];
		var header = document.getElementsByClassName('main')[0];
		burgerBtn.addEventListener('click', function(event){
			event.preventDefault();
			toggleClass(this, 'open');
			toggleClass(header.querySelector('.camera'), 'hide');
			if (hasClass(burgerBtn, 'open')) {
				header.style.marginLeft = '0';
			} else {
				// Remove inline style attribute
				header.removeAttribute("style");
			}
		});

		var tags = document.getElementsByClassName('tags')[0];
		var tagsSelect = tags.querySelectorAll('.tags-select');
		for(var i=0; i<tagsSelect.length; i++) {
			tagsSelect[i].addEventListener('click', function(event) {
				tags.querySelector("ul").classList.toggle("show");
			});
		}

		window.onclick = function(event) {
			// Close tags dropdown if the user clicks outside of it
			if (!event.target.matches('.tags-select')) {
				if (tags.querySelector("ul").classList.contains('show')) {
					tags.querySelector("ul").classList.toggle("show");
				}
			}
			// Close burger menu if the user clicks outside of it
			if (!findParent(event.target, 'burger-btn') && !findParent(event.target, 'main')) {
				console.log('trueee');
				if (hasClass(burgerBtn, 'open')) {
					toggleClass(burgerBtn, 'open');
					toggleClass(header.querySelector('.camera'), 'hide');
					header.removeAttribute("style");
				}
			}
		}


		// OnScroll Functionality //////////////////////////////////////////////////

		// var ajaxScroll = function(event) {
		// 	if ((window.innerHeight + window.scrollY) == document.body.scrollHeight) {
		// 		addItemsAjax();
		// 	}
		// };

		// window.addEventListener('scroll', ajaxScroll, false);

		// Helper Functions ////////////////////////////////////////////////////////

		function findParent(el, cls) {
			while ((el = el.parentElement) && !el.classList.contains(cls));
			return el;
		}

		function hasClass(elem, className) {
			return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
		}

		function addClass(elem, className) {
			if (!hasClass(elem, className)) {
				elem.className += ' ' + className;
			}
		}

		function removeClass(elem, className) {
			var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
			if (hasClass(elem, className)) {
				while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
					newClass = newClass.replace(' ' + className + ' ', ' ');
				}
				elem.className = newClass.replace(/^\s+|\s+$/g, '');
			}
		}

		function toggleClass(elem, className) {
			var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
			if (hasClass(elem, className)) {
				while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
					newClass = newClass.replace( ' ' + className + ' ' , ' ' );
				}
				elem.className = newClass.replace(/^\s+|\s+$/g, '');
			} else {
				elem.className += ' ' + className;
			}
		}

	}
}
