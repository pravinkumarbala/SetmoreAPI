var FetchCustomersCollection = Backbone.Collection.extend({
	model: FetchCustomersModel,
	url: "https://developer.setmore.com/api/v1/bookingapi/customer?firstname=",
	parse: function(response){
		return response.data.customer;
	}
});