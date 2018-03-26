import $            from 'jquery';
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
        this.createInfobox();
    }

    render() {
        let self = this;

        self.initializeMap();
    }

    initializeMap() {
        let self = this;

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
        self.map = new google.maps.Map(self.$selector.find('.js-locations-map').get(0), mapSettings);

        // Map/DOM event listeners
        google.maps.event.addListenerOnce(self.map, 'projection_changed', function() {
            self.initializeLocations();

            setTimeout(function () {
                self.map.fitBounds(self.bounds);
                self.map.setZoom(self.map.getZoom());
                self.map.setCenter(self.map.getCenter());
            }, 250);
        });

        google.maps.event.addDomListener(window, 'resize', function() {
            google.maps.event.trigger(self.map, 'resize');
            self.map.fitBounds(self.bounds);
            self.map.setCenter(self.map.getCenter(), 0, 0);
        });
    }

    initializeLocations() {
        let self = this;
        this.$selector.find('.location-info').each(function() {
            let index = self.locations.push(new MapMarker($(this), self));
            self.markerIndex++;
        });
    }

    resetLocations() {
        let self = this;

        self.bounds = new google.maps.LatLngBounds();

        _.each(self.locations, function(item) {
            if(item.marker) {
                item.marker.setMap(null)
                self.currentMarkerIndex = null;
                self.bounds.extend(item.marker.getPosition())
                self.map.fitBounds(self.bounds)
                self.map.setZoom(self.map.getZoom() - 1)
                self.map.setCenter(self.map.getCenter(), 0, 0)
                setTimeout(function(){
                    if (item.isVisible()) {
                        item.marker.setMap(self.map)
                    }
                }, 500);
                self.resetInfobox();
            }
        })
    }

    setCenter(coordinates, offsetx, offsety) {
        let self = this;
        let scale = Math.pow(2, self.map.getZoom());
        offsetx = (typeof offsetx !== 'undefined') ? offsetx : 0;
        offsety = (typeof offsety !== 'undefined') ? offsety : 0;

        let worldCoordinateCenter = self.map.getProjection().fromLatLngToPoint(coordinates)
        let pixelOffset = new google.maps.Point( (offsetx/scale) || 0, (offsety/scale) || 0 )

        let worldCoordinateNewCenter = new google.maps.Point(
            worldCoordinateCenter.x - pixelOffset.x,
            worldCoordinateCenter.y + pixelOffset.y
        )

        let newCenter = self.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter)

        self.map.panTo(newCenter);
    }

    createInfobox() {
        let self = this;
        // Create infobox instance
        self.infoBoxTemplate = require('../templates/infoBox.handlebars');
        let InfoBox = require('../vendor/google-maps-infobox.js');

        let boxOptions = {
            content: null
            ,disableAutoPan: true
            ,maxWidth: 310
            ,zIndex: null
            ,boxStyle: {
                width: '310px',
            }
            ,isHidden: false
            ,pane: 'floatPane'
            ,enableEventPropagation: false
        };
        self.infoBox = new InfoBox();
        self.infoBox.setOptions(boxOptions);
    }

    openInfoWindow(info, marker, markerIndex, force) {
        let self = this;
        let windowTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

        if (((self.currentMarkerIndex !== markerIndex) && windowTop > 0) || force) {
            self.infoBox.setContent(self.infoBoxTemplate(info));
            self.infoBox.open(self.map, marker);

            self.currentMarkerIndex = markerIndex;

            // Bind event handler for close buttoninfoBoxelf.ib.addListener('domready', function () {
            self.infoBox.addListener('domready', function () {
                $('.infowindow-close').on('click', function (event) {
                    event.preventDefault();
                    self.infoBox.close();
                });
            });
        }
    }

    resetInfobox() {
        let self = this;
        self.infoBox.setContent('');
        self.infoBox.close();
    }
}
