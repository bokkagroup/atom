import $        from 'jquery';

export default class Tabs {

    /**
     * Initialize tabbed content
     * @param  {string} selector Element selector
     */
    constructor(selector) {
        this.$selector = $(selector);
        this.attachEventHandlers();
    }

    /**
     * Attach click handler for tabs
     */
    attachEventHandlers() {
        this.$tabs = this.$selector.find('.tab-labels li');

        for (const tab of this.$tabs) {
            $(tab).find('a').on('click', function (event) {
                event.preventDefault();

                let target = $(this).attr('href');
            });
        }
    }

    /**
     * Open tab by ID (anchor) value
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    openTab(id) {
        //go to tab by id
    }
}
