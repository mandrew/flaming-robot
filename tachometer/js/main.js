// show element
var show = function (elem) {
	elem.style.display = 'block';
};

// hide element
var hide = function (elem) {
	elem.style.display = 'none';
};

// toggle display of element
var toggle = function (elem) {
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}
	show(elem);
};

// Listening for click, then run toggle function
document.addEventListener('click', function (event) {
	if (!event.target.classList.contains('js-toggle-dialog')) return;
	event.preventDefault();
	var content = document.querySelector(event.target.hash);
	if (!content) return;
	toggle(content);
}, false);
