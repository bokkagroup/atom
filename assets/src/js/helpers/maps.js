/**
 * load maps API
 */

window.loadMapsAPI = function(callback){
    if (typeof google == "undefined") {
        window.mapsCallback = callback;
        window.addEventListener('load', function() {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCl4JYsNl9F4T0-c5bI3ovONUuwGegKu-M&v=3&callback=mapsCallback';
            document.body.appendChild(script);
        })
    } else {
        callback();
    }
}
