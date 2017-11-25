export function param(p) {
	return new RegExp(p).test(location.search);
}

export function qs(s) {
	return document.querySelector(s);
}

