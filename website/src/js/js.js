//REPLACE FOR JQUERY READY
//listen for changes to document.readyState - onreadystatechange is fired when readyState value is changed
//Alternative to 'DOMContentLoaded' - when readyState=='interactive' the event DOMContentLoaded was fired
document.onreadystatechange = function () {
	if(document.readyState === 'interactive') {

		function addItemsAjax() {
			var request = new XMLHttpRequest();
			request.open('GET', '/', true);
			request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					// Success!
					var data = JSON.parse(request.response);
					if (data.length > 0) {
						var items = getItems(data);
						var fragment = getFragment(data);
						loadImages(fragment, items);
					}
				} else {
					// Error!
					console.log("Error: "+request.status);
				}
			};

			request.send();
		}

		function loadImages(fragment, items) {
			// append elements to container
			grid.appendChild(fragment);
			console.log(grid);

			var imgLoad = imagesLoaded(items);

			imgLoad.on('progress', function(instance, image) {
				var el = document.querySelector("img[src='"+image.img.getAttribute('src')+"']");
				var parent = findParent(el, 'grid-item');
				// un-hide item
				parent.style.display = '';
				// masonry does its thing
				msnry.appended(parent);
			});
		}

		function getItems(data) {
			var elems = [];
			for (i=0; i<data.length; i++) {
				var item = getItemElement(data[i]);
				// hide by default
				item.style.display = 'none';
				elems.push(item);
			}
			return elems;
		}

		function getFragment(data) {
			var fragment = document.createDocumentFragment();
			for (i=0; i<data.length; i++) {
				var item = getItemElement(data[i]);
				// hide by default
				item.style.display = 'none';
				fragment.appendChild(item);
			}
			return fragment;
		}

		function getItemElement(url) {
			var img = document.createElement('img');
			img.src = url;
			var lnk = document.createElement('a');
			lnk.href = '/';
			lnk.appendChild(img);
			var figure = document.createElement('figure');
			figure.className = 'grid-item';
			figure.appendChild(lnk);

			return figure;
		}

		window.onscroll = function(){
			if ((window.innerHeight + window.scrollY) == document.body.scrollHeight) {
				addItemsAjax();
			}
		}

		function findParent(el, cls) {
			while ((el = el.parentElement) && !el.classList.contains(cls));
			return el;
		}

		function hasClass(elem, className) {
			return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
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
