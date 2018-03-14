import $        from 'jquery';
import MapMarker    from './map-marker.js';

export default class Map {
    constructor(selector) {
        // Map and marker options/data
        this.locations = [];
        this.markerIndex = 0;
        this.currentMarkerIndex = null;
        this.center = {
            lat: 39.7444929,
            lng: -104.9869222
        };
        this.bounds = new google.maps.LatLngBounds();
        this.$selector = $(selector);
        this.render();
    }

    render() {
        var self = this;

        self.initializeMap();
    }

    initializeMap() {
        let self = this;

        let element = document.getElementById("gmap_canvas");

        // Instantiate Google map
        let mapSettings = {
            center: self.center,
            zoom: 10,
            styles: this.styles,
            disableDoubleClickZoom: true,
            draggable: true,
            scrollwheel: false,
            panControl: false
        }
        self.map = new google.maps.Map(element, mapSettings);

        // Map/DOM event listeners
        google.maps.event.addListenerOnce(self.map, 'projection_changed', function() {
            self.initializeLocations();

            setTimeout(function () {
                // self.map.fitBounds(self.bounds);
                self.map.setZoom(self.map.getZoom());
                self.map.setCenter(self.map.getCenter());
            }, 250);
        });

        google.maps.event.addDomListener(window, 'resize', function() {
            google.maps.event.trigger(self.map, 'resize');
            // self.map.fitBounds(self.bounds);
            self.map.setCenter(self.map.getCenter(), 0, 0);
        });
    }

    initializeLocations() {
        let self = this;
        this.$selector.find('.location-info').each(function() {
            let index = self.locations.push(new MapMarker($(this)));
            self.markerIndex++;
        });
    }
}
