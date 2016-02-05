// ==UserScript==
// @name TweakToy
// @include http://*
// @include https://*
// @include about:blank
// @require jquery-1.9.1.min.js
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
		$( "#tweakui" ).replaceWith("<div id = 'tweaker' style = 'width:680px;height:300px;background-color:black;opacity:0.9;border: 4px solid white;position:absolute;left:0px;top:626px;'/>")

		var gl = document.getElementById("demogl").getContext("experimental-webgl");
		var prog = gl.getParameter(gl.CURRENT_PROGRAM);

		var inUnis = shadercode.split("uniform float")[1].split(";")[0].trim();
		alert ("."+inUnis+".");

		window.offsetLoc = gl.getUniformLocation(prog, inUnis);
		alert (window.offsetLoc);

		$( "#tweaker" ).append('  <input id="slider1" type="range" min="0.0" max="10" step="0.01" /> ')
		$( "#tweaker" ).append('  <input id="slider2" type ="range" min ="100" max="500" step ="50" value ="100"/> ')
		$( "#tweaker" ).append('  <input id="slider3" type ="range" min ="-2.5" max="3.0" step ="0.1"/>  ')

		$( "#slider1" ).on("input change", function() { 
			gl.uniform1f(window.offsetLoc,$( "#slider1" ).val());


		 });
	
	},500);
});

window.tweakui = tweakui;
