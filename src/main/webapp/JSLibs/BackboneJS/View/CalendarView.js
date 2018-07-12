var CalendarsView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev next',
				center: 'title',
				right: 'month, basicWeek, basicDay',
				ignoreTimeZone: false
			},
			selectable: true,
			selectHelper: true,
			editable: true
		});	
	}
});