var CreateAppointmentsCollection = Backbone.Collection.extend({
	model: CreateAppointmentsModel,
	url: "https://developer.setmore.com/api/v1/bookingapi/appointment/create",
	parse: function(response){
		return response;
	}
});