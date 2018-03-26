import $        from 'jquery';

export default class MapMarker {
    constructor(selector, parent) {
        let self = this;
        this.parent = parent;
        this.mapInfo = selector.data('map-info');
        this.defaultIcon = '/wp-content/themes/atom/assets/build/img/map-pin-default.png';
        this.activeIcon = '/wp-content/themes/atom/assets/build/img/map-pin-active.png';
        this.markerIndex = this.parent.markerIndex;
        self.initializeMarker();
    }

    initializeMarker(item) {
        let self = this;
        let content = '';

        if (self.mapInfo.position) {
            self.marker = new google.maps.Marker({
                position: { lat: self.mapInfo.position.lat, lng: self.mapInfo.position.lng },
                icon: { url: self.defaultIcon, scaledSize: new google.maps.Size(30, 44), size: new google.maps.Size(30, 44) }
            });

            self.marker.setMap(self.parent.map);

            self.parent.bounds.extend(self.marker.getPosition());

            self.parent.map.fitBounds(self.parent.bounds);

            self.marker.addListener('click', function() {
                self.parent.setCenter(self.marker.position);

                // open infobox when pan finished
                google.maps.event.addListenerOnce(self.parent.map, 'idle', function() {
                    self.parent.openInfoWindow(self.mapInfo, self.marker, self.markerIndex, true);
                });
            });
        }
    }
}
