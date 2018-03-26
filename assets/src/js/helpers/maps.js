import $           from 'jquery';
import Map         from '../organisms/map.js';

export default function maps() {
    window.catalystwp.loadMapsAPI = function(callback) {
        if (typeof google == "undefined") {
            window.mapsCallback = callback;
            addEventListener('load', function() {
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCl4JYsNl9F4T0-c5bI3ovONUuwGegKu-M&v=3&callback=mapsCallback';
                document.body.appendChild(script);
            });
        } else {
            callback();
        }
    }

    if($('.map-w-locations').length > 0) {
        window.catalystwp.loadMapsAPI(function() {
            $('.map-w-locations').each(function() {
                new Map($(this));
            });
        });
    }
}
