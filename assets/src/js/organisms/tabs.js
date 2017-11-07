import $        from 'jquery';

export default class Tabs {

    /**
     * Initialize tabbed content
     * @param  {string} selector Element selector
     * @param  {array}  options  Array of options that override defaults
     */
    constructor(selector, options) {
        this.options = Object.assign({
            adaptiveHeight: true,
            animate: false,
            initial: 0
        }, options);

        this.$selector = $(selector);
        this.$tabs = this.$selector.find('ul li');

        this.attachEventHandlers();
        this.openTab(this.options.initial);
    }

    /**
     * Attach click handler for tabs
     */
    attachEventHandlers() {
        let self = this;

        for (const tab of this.$tabs) {
            $(tab).find('a').on('click', function (event) {
                event.preventDefault();
                let target = $(this).attr('href');
                self.openTab(target);
            });
        }
    }

    /**
     * Open tab by ID (anchor) value or tab index
     */
    openTab(value) {
        let target;
        let anchor;

        if (Number.isInteger(value)) {
            anchor = this.$tabs.eq(value).find('a');
            target = this.$selector.children('div').eq(value);
        } else {
            anchor = this.$tabs.find('a[href="' + value + '"]');
            target = this.$selector.find('#' + value);
        }

        if (anchor && target) {
            target.addClass('active').siblings().removeClass('active');
            anchor.parent().addClass('active').siblings().removeClass('active');
        }
    }
}
