import $        from 'jquery';
import _        from 'lodash';

/**
* Mobile navigation
* @type {mobileMenu}
*/
export default class mobileMenu {

    /**
    * Initialize mobile menu
    * @param  {string} selector Element wrapper selector
    * @param  {array}  options  Array of options that override defaults
    */
    constructor(selector, options) {
        this.options = Object.assign({
            toggleSelector: '.menu-toggle',
            menuSelector: '.menu'
        }, options);

        this.$selector = $(selector);

        this.toggleEventHandlers();

        $(window).on('resize', _.debounce(this.toggleEventHandlers.bind(this), 300));
    }

    /**
     * Attach/destroy event handlers as necessary
     */
    toggleEventHandlers() {
        if (this.isMobile()) {
            // if they haven't been attached yet, attach (desktop --> mobile)
            // if event handlers have already been attached, don't do anything (mobile --> mobile)
            this.attachEventHandlers();
        } else {
            // if event handlers have already been attached, destroy (mobile --> desktop)
        }
    }

    /**
     * Attach event listeners for menu toggles
     */
    attachEventHandlers() {
        const self = this;

        // Toggle mobile menu display
        $(self.options.toggleSelector).on('click', function (event) {
            event.preventDefault();
            self.$selector.find(self.options.menuSelector).toggleClass('menu-open');
        });

        // Toggle submenu display
        $(self.options.menuSelector).find('.has-submenu > a').on('click', function (event) {
            event.preventDefault();
            $(this).next('.submenu').toggleClass('menu-open');
            $(this).toggleClass('submenu-open');
        });
    }

    /**
    * Check visibility of menu toggle before attaching event listeners
    * @return {Boolean}
    */
    isMobile() {
        return $(this.options.toggleSelector).is(':visible') ? true : false;
    }
}
