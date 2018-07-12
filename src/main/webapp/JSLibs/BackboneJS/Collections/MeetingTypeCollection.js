var MeetingTypesCollection = Backbone.Collection.extend({
	model: MeetingTypesModel,
	url: "https://developer.setmore.com/api/v1/bookingapi/services",
	parse: function(response){
		//console.info(response.data.services.length);
		return response.data.services;
	}
});