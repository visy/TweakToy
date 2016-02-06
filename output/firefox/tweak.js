// ==UserScript==
// @name TweakToy
// @include http://*
// @include https://*
// @include about:blank
// @require jquery-1.9.1.min.js
// @require rangeslider.min.js
// @require rangeslider.css
// ==/UserScript==

var $ = window.$.noConflict(true); // Required for IE

var tweakui = $(document.createElement('img')).attr({
    src: 'http://orig05.deviantart.net/364f/f/2009/212/7/e/start_button_by_chiphilla.png',
    id: 'tweakui',
    title: 'TweakToy'
}).css({
    position: 'absolute',
    left: '10px',
    top: document.body.clientHeight - document.body.clientHeight/4 + 'px',
    'z-index': '10000'
}).appendTo(document.body);

tweakui.click(function() {

	window.shadercode = document.getElementById("dlgAlertTXT").childNodes[0].innerHTML;

	window.getProgramInfo = function(gl, program) {
    var result = {
        attributes: [],
        uniforms: [],
        attributeCount: 0,
        uniformCount: 0
    },
        activeUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS),
        activeAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    // Taken from the WebGl spec:
    // http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
    var enums = {
        0x8B50: 'FLOAT_VEC2',
        0x8B51: 'FLOAT_VEC3',
        0x8B52: 'FLOAT_VEC4',
        0x8B53: 'INT_VEC2',
        0x8B54: 'INT_VEC3',
        0x8B55: 'INT_VEC4',
        0x8B56: 'BOOL',
        0x8B57: 'BOOL_VEC2',
        0x8B58: 'BOOL_VEC3',
        0x8B59: 'BOOL_VEC4',
        0x8B5A: 'FLOAT_MAT2',
        0x8B5B: 'FLOAT_MAT3',
        0x8B5C: 'FLOAT_MAT4',
        0x8B5E: 'SAMPLER_2D',
        0x8B60: 'SAMPLER_CUBE',
        0x1400: 'BYTE',
        0x1401: 'UNSIGNED_BYTE',
        0x1402: 'SHORT',
        0x1403: 'UNSIGNED_SHORT',
        0x1404: 'INT',
        0x1405: 'UNSIGNED_INT',
        0x1406: 'FLOAT'
    };

    // Loop through active uniforms
    for (var i=0; i < activeUniforms; i++) {
        var uniform = gl.getActiveUniform(program, i);
        uniform.typeName = enums[uniform.type];
        result.uniforms.push(uniform);
        result.uniformCount += uniform.size;
    }

    // Loop through active attributes
    for (var i=0; i < activeAttributes; i++) {
        var attribute = gl.getActiveAttrib(program, i);
        attribute.typeName = enums[attribute.type];
        result.attributes.push(attribute);
        result.attributeCount += attribute.size;
    }

    return result;
}


	setTimeout(function() { 
		var shadercode = window.shadercode;
		$( "#tweakui" ).replaceWith("<div id = 'tweaker' style = 'width:680px;height:500px;background-color:white;opacity:0.9;border: 4px solid grey;position:absolute;left:0px;top:426px;'/>")

		var gl = document.getElementById("demogl").getContext("experimental-webgl");
		var prog = gl.getParameter(gl.CURRENT_PROGRAM);

		var inUnis = shadercode.split("uniform float");
		window.offsetLoc = [];
		window.offsetName = [];

		for (var i = 0; i < inUnis.length; i++) {
			var uniformName = inUnis[i].split(";")[0].trim();
			if (uniformName == null) break;
			else {
				alert(i + " - " + uniformName);
				window.offsetLoc[i] = gl.getUniformLocation(prog, uniformName);
				window.offsetName[i] = uniformName;
			}
		}

	
		$( "#tweaker" ).append('<div id="unicha1" style = "width:300px;float:right;" ><h3>uniform: ' + window.offsetName[1] + '</h3><br> <input style="position: absolute; width: 300px; height: 16px; overflow: hidden; opacity: 1;" min="1" max="1000" step="1" data-rangeslider="" type="range" id="slider1"><div class="rangeslider rangeslider--horizontal" id="js-rangeslider-4"><div style="width: 135.556px;" class="rangeslider__fill"></div><div style="left: 115.556px;" class="rangeslider__handle"></div></div> <output id ="output1">0</output> <br/><label><input name="min" value="10" type="number"> <code>min</code></label><br> <label><input name="max" value="100" type="number"> <code>max</code></label><br> <label><input name="step" value="5" type="number"> <code>step</code></label> <br> <br> <button class="button button--small" id = "button1">Change attributes</button></div>');
		$( "#tweaker" ).append('<div id="unicha2" style = "width:300px;float:right;" ><h3>uniform: ' + window.offsetName[2] + '</h3><br> <input style="position: absolute; width: 300px; height: 16px; overflow: hidden; opacity: 1;" min="1" max="1000" step="1" data-rangeslider="" type="range" id="slider2"><div class="rangeslider rangeslider--horizontal" id="js-rangeslider-5"><div style="width: 135.556px;" class="rangeslider__fill"></div><div style="left: 115.556px;" class="rangeslider__handle"></div></div> <output id ="output2">0</output> <br/><label><input name="min" value="10" type="number"> <code>min</code></label><br> <label><input name="max" value="100" type="number"> <code>max</code></label><br> <label><input name="step" value="5" type="number"> <code>step</code></label> <br> <br> <button class="button button--small" id = "button2">Change attributes</button></div>');
		$( "#tweaker" ).append('<div id="unicha3" style = "width:300px;float:right;" ><h3>uniform: ' + window.offsetName[3] + '</h3><br> <input style="position: absolute; width: 300px; height: 16px; overflow: hidden; opacity: 1;" min="1" max="1000" step="1" data-rangeslider="" type="range" id="slider3"><div class="rangeslider rangeslider--horizontal" id="js-rangeslider-6"><div style="width: 135.556px;" class="rangeslider__fill"></div><div style="left: 115.556px;" class="rangeslider__handle"></div></div> <output id ="output3">0</output> <br/><label><input name="min" value="10" type="number"> <code>min</code></label><br> <label><input name="max" value="100" type="number"> <code>max</code></label><br> <label><input name="step" value="5" type="number"> <code>step</code></label> <br> <br> <button class="button button--small" id = "button3">Change attributes</button></div>');

	$('input[type="range"]').rangeslider();

		$( "#slider1" ).on("input change", function() { gl.uniform1f(window.offsetLoc[1],$( "#slider1" ).val()/1000.0); $("#output1").innerHTML = ""+$( "#slider1" ).val()/1000.0; });
		$( "#slider2" ).on("input change", function() { gl.uniform1f(window.offsetLoc[2],$( "#slider2" ).val()/1000.0); $("#output2").innerHTML = ""+$( "#slider2" ).val()/1000.0; });
		$( "#slider3" ).on("input change", function() { gl.uniform1f(window.offsetLoc[3],$( "#slider3" ).val()/1000.0); $("#output3").innerHTML = ""+$( "#slider3" ).val()/1000.0; });

		$( "#button1").click(function(e) {
			var $inputRange = $('[data-rangeslider]', e.target.parentNode);
			  var attributes = {
			    min: $('input[name="min"]', e.target.parentNode)[0].value,
			    max: $('input[name="max"]', e.target.parentNode)[0].value,
			    step: $('input[name="step"]', e.target.parentNode)[0].value
			  };
			  $inputRange.attr(attributes).rangeslider('update', true);
		});
		$( "#button2").click(function(e) {
			var $inputRange = $('[data-rangeslider]', e.target.parentNode);
			  var attributes = {
			    min: $('input[name="min"]', e.target.parentNode)[0].value,
			    max: $('input[name="max"]', e.target.parentNode)[0].value,
			    step: $('input[name="step"]', e.target.parentNode)[0].value
			  };
			  $inputRange.attr(attributes).rangeslider('update', true);
		});
		$( "#button3").click(function(e) {
			var $inputRange = $('[data-rangeslider]', e.target.parentNode);
			  var attributes = {
			    min: $('input[name="min"]', e.target.parentNode)[0].value,
			    max: $('input[name="max"]', e.target.parentNode)[0].value,
			    step: $('input[name="step"]', e.target.parentNode)[0].value
			  };
			  $inputRange.attr(attributes).rangeslider('update', true);
		});
	
	},500);
});

window.tweakui = tweakui;
