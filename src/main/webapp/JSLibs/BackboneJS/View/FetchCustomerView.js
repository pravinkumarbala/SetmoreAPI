var FetchCustomersView = Backbone.View.extend({
	events:{
		'click .test': "selectMeetingPeople"
	},
	initialize: function(){
		_.bindAll(this, this.render());
		this.model.bind('change', this.render());
		this.render();
	},
	render: function(){
		this.collection = new FetchCustomersCollection();
		var customer_name_search_model = this.model.get("first_name");
		//console.info(customer_name_search_model);
		var self = this;
		this.collection.fetch({
			url: this.collection.url + customer_name_search_model,
			type: "GET",
			beforeSend: function(xhr){
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
			},
			success: function(response){
				$("#invitePeople li").remove();
				var search_customer = response.toJSON();
				for(var i = 0; i < search_customer.length; i++ ){
					if (search_customer.first_name != ""){
						$("#invitePeople").append("<li email_id=" + search_customer[i].email_id + ">" + search_customer[i].first_name + " " + search_customer[i].last_name + " - " + search_customer[i].email_id + "</li>");
					}	
				}
				console.info(search_customer);
			}
		})
	},
	selectMeetingPeople: function(){
		alert("Working");
	}
});