
function registerPushwooshAndroid() {

 	var pushNotification = window.plugins.pushNotification;

	//push notifications handler
	document.addEventListener('push-notification', function(event) {
	            var title = event.notification.title;
	            var userData = event.notification.userdata;
	            //var header = event.notification.header;
	           // console.warn('header: ' + header + 'title: ' + title);
	            
	            //dump custom data to the console if it exists
	            if(typeof(userData) != "undefined") {
					console.warn('user data: ' + JSON.stringify(userData));
				}

				//and show alert
				navigator.notification.alert(title);

			  });

	console.warn('onDeviceReady');
	pushNotification.onDeviceReady({ projectid: "387050748417", appid : "A0443-C41F6" });
	
	//projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID"
	pushNotification.registerDevice(
									function(token) {
										alert(token);
										//callback when pushwoosh is ready
										onPushwooshAndroidInitialized(token);
									},
									function(status) {
										alert("failed to register: " +  status);
									    console.warn(JSON.stringify(['failed to register ', status]));
									});
 }

function onPushwooshAndroidInitialized(pushToken)
{
	console.warn('push token: ' + pushToken);

	var pushNotification = window.plugins.pushNotification;

	pushNotification.getTags(function(tags) {
							console.warn('tags for the device: ' + JSON.stringify(tags));
						 },
						 function(error) {
							console.warn('get tags error: ' + JSON.stringify(error));
						 });

	pushNotification.setTags({deviceName:"hello", deviceId:10},
									function(status) {
										console.warn('setTags success');
									},
									function(status) {
										console.warn('setTags failed');
									});
}

function initPushwoosh() {
	console.warn('initPushwoosh');
	var pushNotification = window.plugins.pushNotification;
	
	console.warn('registerPushwooshAndroid');
	registerPushwooshAndroid();
}

 
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
		initPushwoosh();
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
