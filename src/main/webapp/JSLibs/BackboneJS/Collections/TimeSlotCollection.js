var TimeSlotsCollection = Backbone.Collection.extend({
	model: TimeSlotsModel,
	url: "https://developer.setmore.com/api/v1/bookingapi/slots",
	parse: function(response){
		return response.data;
	}
});