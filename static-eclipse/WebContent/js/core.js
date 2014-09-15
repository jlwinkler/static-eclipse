var randomContent =
"blar-de-blar-de-blar ";

var pageData = getUrlData("data/pageHtml.html");
var cssData = getUrlData("css/core.css");
var jsData = getUrlData("js/core.js");

function alertVar(v) {
	alert(v);
}

function setDivBody(body, divId) {
	if (arguments.length < 2) {
		alert("improper use of setDivBody - must supply at least 1 div ID");
	} else {
		curDivIdx = 0;
		while (curDivIdx++ < arguments.length-1) {
			divElem = document.getElementById(arguments[curDivIdx], body);
			divElem.innerHTML = body;
		}
	}
}

function setAllDivBodiesById(body, divId) {
	var selector = "#" + divId;
	var eArray = document.querySelectorAll(selector);
	for (var i=0; i<eArray.length; i++) {
		eArray[i].innerHTML = body;
	}
}

function generateRandomContent(maxRpt, asList) {
	/*
	 * want to generate a content string from randomContent that is an
	 * arbitrary length
	 */
	var rpt = Math.floor(Math.random() * maxRpt) + 1;
	
	var genRc = "";
	for (var i=0; i<rpt; i++) {
		if (asList) {
			genRc = genRc.concat("<li>" + randomContent + "</li>");
		} else {
			genRc = genRc.concat(genRc, randomContent);
		}
	}
	if (asList) {
		genRc = "<ul>" + genRc + "</ul>";
	}
	
	return genRc;
}

function populatePage() {
	var lsbContent = generateRandomContent(5, true);
	setAllDivBodiesById(lsbContent, "left-sidebar");
	var fcaContent = generateRandomContent(8, false);
	setAllDivBodiesById(fcaContent, "focus-content");
	var frsbContent = generateRandomContent(5, true);
	setAllDivBodiesById(frsbContent, "focus-right-sidebar");
}

function getUrlData(url) {
	var client = new XMLHttpRequest();
	client.open("GET", url, false);
	client.send();
	var response = client.responseText;
	
	return response;
}

function fixDivHeights() {
	/*
	 * argument elements should be valid CSS selector strings, i.e:
	 * - "#[element id]"
	 * - ".[element class]"
	 * - "#[element id] #[sub-element id]"
	 */
	var elemArray = new Array();
	var alertString = "";
	var maxDivHeight = 0;
	for (var i=0; i<arguments.length; i++) {
		elemArray[i] = document.querySelector(arguments[i]);
		alertString = alertString + "div " + arguments[i] + " height: " + elemArray[i].offsetHeight + "\n";
		if (elemArray[i].offsetHeight > maxDivHeight)
			maxDivHeight = elemArray[i].offsetHeight;
	}
	for (var i=0; i<elemArray.length; i++) {
		elemArray[i].style.height = maxDivHeight + "px";
	}
}

function zeroPad(n, length){
	  var s = n + "";
	  var needed = length - s.length;
	  if (needed > 0)
		  s = (Math.pow(10,needed) + "").slice(1) + s;
	  return s;
}
function pad(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function formatData(body) {
	var oddLineElem = "<div style='border-radius: 0; background-color: #ddd; margin: 0; padding: 0;'>";
	var evenLineElem = "<div style='border-radius: 0; background-color: #eee; margin: 0; padding: 0;'>";
	var endLineElem = "</div>";
	var lines = null;
	lines = body.replace(/</g, "&lt;").replace(/>/g, "&gt;").split("\n");
	var mlw = lines.length.toString().length;
	for (var i=0; i<lines.length; i++) {
		lines[i] = "<span style='padding: 0 3px 0 3px; margin-right: 1em; border-right: solid 1px #000;'>" +
		           zeroPad(i+1, mlw) + "</span>" + lines[i] + "</span>";
		lines[i] = (i % 2 == 0) ? evenLineElem + lines[i] + endLineElem : oddLineElem +
				   lines[i] + endLineElem;
	}
	
	return lines.join("");
}

function initPage() {
	setDivBody(pageData,
			   "container-no-float",
			   "container-basic-float",
			   "container-awesome-float",
			   "container-awesome-float-with-colheight-fix");
	setDivBody(formatData(pageData),
			   "html-doc-pre");
	populatePage();
	setDivBody(formatData(cssData), "css-doc-pre");
	setDivBody(formatData(jsData), "js-doc-pre");
	fixDivHeights(".page-notes",
				  ".page-bookmarks");
	fixDivHeights("#container-awesome-float-with-colheight-fix #left-sidebar",
				  "#container-awesome-float-with-colheight-fix #focus");
	fixDivHeights("#container-awesome-float-with-colheight-fix #focus-content",
			      "#container-awesome-float-with-colheight-fix #focus-right-sidebar");
}
