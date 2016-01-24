/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        console.log("in initialize function");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("in onDeviceReady");
        app.receivedEvent('deviceready');

       

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    scan: function() {
            console.log('scan(): init');
            console.log('scanning');
        	//document.getElementById('errorLabel').style.display = 'none';
        	try {
        		var scanner = window.cordova.require('phonegap-plugin-barcodescanner.BarcodeScanner');
        	} catch(e) {
        		console.log("not working");
        	}

        	console.log("scanner is defined?");

        	console.log("scanner: " + scanner);

            
            console.log("scan module defined")
           
            scanner.scan(
                    function (result) {
                    //remark
                    	/*
                        alert("We got a barcode\n" +
                            "Result: " + result.text + "\n" +
                            "Format: " + result.format + "\n" +
                            "Cancelled: " + result.cancelled);
                            */
                            if (result.cancelled == 0) {
                            	document.getElementById('preloader').style.display = 'inline-block';
                        		var ref = window.open('https:/mobile.mellanox.com/mquery/trace.php?search=' + result.text, '_blank');
                        		ref.addEventListener('exit', function(event) 
								{
									document.getElementById('preloader').style.display = 'none';
								});

                        	}
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
             );
        }
     
};
console.log("WEB - read index.js");
app.initialize();



