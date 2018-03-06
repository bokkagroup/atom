import $        from 'jquery';

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

		// Check visibility of menu toggle before attaching event listeners
		if ($(this.options.toggleSelector).is(':visible')) {
			this.attachEventHandlers();
		}
	}

	attachEventHandlers() {
		const self = this;

		// Toggle mobile menu display
		$(self.options.toggleSelector).on('click', function (event) {
			event.preventDefault();
			self.$selector.find(self.options.menuSelector).toggleClass('menu-open');
		});

		// Toggle submenu display
		$(self.options.menuSelector).find('.has-submenu').on('click', function (event) {
			event.preventDefault();
			$(this).next('.submenu').toggleClass('menu-open');
			$(this).toggleClass('submenu-open');
		});
	}
}
