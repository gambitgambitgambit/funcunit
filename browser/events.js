steal(function(){

	if(steal.options.browser === "phantomjs"){
		var ifrm = document.createElement("iframe");
		ifrm.id = 'funcunit_app';
		ifrm.setAttribute("width", "960");
		ifrm.setAttribute("height", "800");
		
		document.body.insertBefore(ifrm, document.body.firstChild);
	}

	var evts = ['begin', 'testStart', 'testDone', 'moduleStart', 'moduleDone', 'done', 'log'], type;
	
	for (var i = 0; i < evts.length; i++) {
		type = evts[i];
		(function(type){
			QUnit[type] = function(data){
				if(type === "done"){
					if (steal.instrument) {
						steal.client.trigger("coverage", steal.instrument.compileStats());
					}
				}
				steal.client.trigger(type, data);
			};
		})(type);
	}
})
