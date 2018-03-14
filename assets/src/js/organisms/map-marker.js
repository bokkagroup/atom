import $        from 'jquery';

export default class MapMarker {
    constructor(selector) {
        let self = this;
        this.mapInfo = selector.data('map-info');
        this.iconPath = './assets/images/map/';
        this.markerIndex = this.options.parent.markerIndex
        self.initializeMarker();
    }

    initializeMarker(item) {
        let self = this;
        let content = '<div class="infobox-content"><a href="#" class="infobox-close"></a><div class="title">'+ self.mapInfo.title +'</div><div class="subtitle">'+ self.mapInfo.subtitle +'</div></div>'
        if (self.mapInfo.position) {
            
        }
    }
}
