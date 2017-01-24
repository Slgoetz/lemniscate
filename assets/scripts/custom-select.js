var dw_select = { 
	o : {
		select_class : '.dw-select',
		options: '.dw-options',
		option : '.dw-option',
		outside_picker: '.js-pick-clean-type'
	},
	// initiate the function
	init : function( el ) {	
		if( $(el).length > 0){
			this.o.select_class = el;
		}

		$(this.o.select_class).on('click', dw_handler.click);
	},

	// on click show the custom select options
	open_options : function(el){
		var $self = $(el),
			dd_height = dw_select.get_height($self.find(this.o.options));

		$self.addClass('dw-active');
		$self.find(this.o.options).css({
			'height': dd_height
		});
	},
	// close the dropdown
	close_options : function(el){
		console.log('close');
		var $self = $(el);
		$self.removeClass('dw-active');
		$self.find(this.o.options).css({
			'height': '0px'
		});
	},
	// checks if element is open
	is_open : function(el){
		return $(el).hasClass( 'dw-active' );
	},

	// get the overall height of the options to animate the expansion 
	get_height : function(el){
		var overall_height = 0;
		// get the height of each list item in the options panel
		$(el).children().each( function(i, item){
			overall_height += $(item).outerHeight(true);
		});
		// return the value
		return overall_height;
	},
	
	
};

dw_handler = {
	click: function(event){
		var $self = $(event.target).parents(dw_select.o.select_class);

		console.log($self);
		if(dw_select.is_open( $self )){
			dw_select.close_options( $self );
		}else{
			console.log(  dw_select.is_open( $self )  );
			dw_select.close_options('.dw-active');
			dw_select.open_options( $self );
			
		}
	}
}





module.exports = dw_select;

