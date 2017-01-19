//Setup breakpoint value we can query throughout our app
window.bokka.breakpoint = {
    refreshValue : function () {
        window.bokka.breakpoint.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
    }
};
window.bokka.breakpoint.refreshValue();

jQuery(window).on('resize', function(){
    window.bokka.breakpoint.refreshValue();
});
