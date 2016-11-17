var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
var videoSequence = function (options) {
	"use strict";
	this.filesLoaded = 0;
	this.options = {};
	this.defaults = {
		secondsNum: 25,
		imageNum: 300,
		filesToBuffer: 2,  // After loading this number of files the video sequence will be played.
		filesPath: ["assets/images01.js", "assets/images02.js", "assets/images03.js", "assets/images04.js", "assets/images05.js", "assets/images06.js"],
		onBufferStart: function () {
		},
		onBufferComplete: function () {
		},
		onSequenceStart: function () {
		},
		onSequenceComplete: function () {
		}
	};
	this.myInterval;
	this.image = new Image();
	this.animation;
	this.now;
	this.then = Date.now();
	this.delta;
	this.options = extend(this.defaults, options);
	var self = this;
	if (EB.isInitialized()) {
		this.init();
	} else {
		EB.addEventListener(EBG.EventName.EB_INITIALIZED, function () {
			self.init();
		});
	}
	;
}
videoSequence.prototype = {
	init: function () {
		this.currentFPS = getFPS(this.options.imageNum, this.options.secondsNum);
		this.currentInterval = getMyInterval(this.currentFPS);
		this.startBuffering(this);
		this.options.onBufferStart.call(this);
	},
	startBuffering: function (obj) {
		getScript(obj.options.filesPath[obj.filesLoaded], function (data, textStatus, jqxhr) {
			obj.filesLoaded++;
			if (obj.filesLoaded < obj.options.filesPath.length) {
				obj.startBuffering(obj);
			} else {
				obj.options.onBufferComplete.call(obj);
			}
			console.log(obj.filesLoaded)
			if (obj.options.filesToBuffer == obj.filesLoaded) {
				obj.startSequence();
			}
		});
	},
	stopBuffering: function () {
		this.filesLoaded = 1000;
	},
	startSequence: function () {
		this.d = new Date();
		EB.automaticEventCounter("videoSequence Start");
		this.options.onSequenceStart.call(this);
		this.imagesPlayed = 0;
		this.imageSet = imageSet;
		return this.animate(this);
	},
	resumeSequence: function () {
		EB.automaticEventCounter("videoSequence Resume");
		return this.animate(this);
	},
	stopSequence: function () {
		EB.automaticEventCounter("videoSequence Stop");
		return cancelAnimationFrame(this.animation);
	},
	animate: function (obj) {
		this.animation = requestAnimationFrame(function () {
			obj.animate(obj);
		});
		this.now = Date.now();
		this.delta = this.now - this.then;
		this.timeahora = new Date();
		this.segundos = (this.timeahora - this.d) / 1000;
		//VideoSub_main_sequence(this.segundos);
		//---
		if (this.delta > this.currentInterval) {
			this.then = this.now - (this.delta % this.currentInterval);
			this.imagesPlayed++;
			this.image.src = this.imageSet[this.imagesPlayed];
			this.options.sequenceContainer.src = this.imageSet[this.imagesPlayed];
			console.log(this.imageSet.length)
			switch (getVideoPlayed(obj))    // lastInteraction prevents multiple interactions issue
			{
				case 25:
					if (obj.lastInteraction != 25) {
						EB.automaticEventCounter("videoSequence Video_25");
						obj.lastInteraction = 25;
					}
					break;
				case 50:
					if (obj.lastInteraction != 50) {
						EB.automaticEventCounter("videoSequence Video_50");
						obj.lastInteraction = 50;
					}
					break;
				case 75:
					if (obj.lastInteraction != 75) {
						EB.automaticEventCounter("videoSequence Video_75");
						obj.lastInteraction = 75;
					}
					break;
				case 100:
					EB.automaticEventCounter("videoSequence Video_100");
					obj.lastInteraction = 100;
					cancelAnimationFrame(obj.animation)
					obj.options.onSequenceComplete.call(obj);
					break;
			}
		}
	}
}
function getVideoPlayed(obj) {
	return Math.round((obj.imagesPlayed * 100 / obj.options.imageNum));
}
function getFPS(framesNUM, secondsNUM) {
	return framesNUM / secondsNUM;
}
function getMyInterval(FPSNUM) {
	return 1000 / FPSNUM;
}
function getScript(source, callback) {
	var script = document.createElement('script');
	var prior = document.getElementsByTagName('script')[0];
	script.async = 1;
	prior.parentNode.insertBefore(script, prior);
	script.onload = script.onreadystatechange = function (_, isAbort) {
		if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
			script.onload = script.onreadystatechange = null;
			script = undefined;
			if (!isAbort) {
				if (callback) callback();
			}
		}
	};
	script.src = source;
}
function extend(a, b) {
	for (var key in b)
		if (b.hasOwnProperty(key))
			a[key] = b[key];
	return a;
}