var RoomsCollection = Backbone.Collection.extend({
	model: RoomsModel,
	url: "https://developer.setmore.com/api/v1/bookingapi/staffs",
	parse: function(response){
		return response.data.staffs;
	}
});