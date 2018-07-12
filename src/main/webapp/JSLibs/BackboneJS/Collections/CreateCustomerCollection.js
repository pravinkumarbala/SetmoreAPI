var CreateCustomersCollection = Backbone.Collection.extend({
	model: CreateCustomersModel,
	url: "https://developer.setmore.com/api/v1/bookingapi/customer/create",
	parse: function(response){
		return response.data.customer;
	}
});