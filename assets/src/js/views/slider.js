module.exports = Backbone.View.extend({
    current: 0,
    events: {
        'click .previous'       : 'previousSlide',
        'click .next'           : 'nextSlide',
        'click .pagination a'   : 'paginate'
    },
    initialize : function(){
        this.options = this.$el.data('options');
        this.slides = this.$el.find('.slide');
        this.render();
    },
    render : function(){
        var self = this;
        $(window).load(function () {
            self.setHeight();
        });
        $(window).on('resize', function(){
            self.setHeight();
        });
    },

    setHeight : function(){
        var self = this;
        this.$el.find('.slides').get(0).style.height = 'auto';
        if(this.options && this.options.height){
            if(this.options.height === 'container'){
                var height = self.$el.parent().outerHeight();
                this.$el.find('.slides').height(height);
            }
        } else {
            var maxHeight = 0;
            var heights = [];
            _.each(this.slides, function (item) {
                heights.push($(item).outerHeight());
            });
            maxHeight = Math.max.apply(Math, heights);

            this.$el.find('.slides').height(maxHeight);
        }
    },
    changeSlide : function(slide, old, direction){
        old = this.slides[old];
        var newer = this.slides[slide];
        this.current = slide;

        direction = direction === 'forward' ? 100: -100;
        $(newer).stop().css({
            left: ( direction + '%'),
            top: 0
        });
        $(old).stop().animate({
            left: ( direction * -1) + '%',
            opacity: 0
        }, 250);
        $(newer).stop().animate({
            left: 0,
            opacity: 1
        }, 250);
        this.$el.find('.pagination li').removeClass('current').eq(slide).addClass('current');
    },
    previousSlide : function(event){
        event.preventDefault();
        var slide;
        var old = this.current;
        if(this.current > 0){
            this.current--;
            slide = this.current;
        } else {
            slide = this.slides.length - 1;
        }
        this.changeSlide(slide, old, 'backwards');
    },
    nextSlide : function(event){
        event.preventDefault();
        var slide;
        var old = this.current;
        if(this.current < this.slides.length - 1){
            this.current++;
            slide = this.current;
        } else {
            slide = 0;
        }

        this.changeSlide(slide, old, 'forward');
    },
    paginate : function(event){
        event.preventDefault();

        var index = $(event.target).closest('li').index();
        if(index !== this.current) {
            this.changeSlide(index, this.current, 'forward');
        }

    }
});
