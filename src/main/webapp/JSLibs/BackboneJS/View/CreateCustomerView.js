var CreateCustomersView = Backbone.View.extend({
	events: {
		"click #bookMeeting": "createAppointment",
		"click #invitePeople li": "invitePeopleList"
	},
	initialize: function(){
		var customerInfo = this.model.toJSON();
		console.info(customerInfo);
		this.collection = new CreateCustomersCollection();
		var self = this;
		var customerJSON = {
			"first_name": customerInfo.first_name,
			"email_id": customerInfo.email_id,
			"cell_phone": customerInfo.cell_phone
		};
		this.collection.fetch({
			url: this.collection.url,
			type: "POST",
			async: false,
			data: JSON.stringify(customerJSON),
			beforeSend: function(xhr){
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
			},
			success: function(response){
				var customerKey = response.toJSON();
				window.globalSelectMeetingCustomerKey = customerKey[0].key;
				console.info(globalSelectMeetingCustomerKey);
			}
		});
	},
	createAppointment: function(){
		var user_name = $("#username").val();
		var email_address = $("#email_address").val();
		var phone_number = $("#phone_number").val();
		var customerJSON = {
			"first_name": user_name,
			"email_id": email_address,
			"cell_phone": phone_number
		}

		if( user_name != "" && email_address != "" && phone_number != ""){
			var newCustomerCreationModel = new CreateCustomersModel(customerJSON);
			var newCustomerCreationView = new CreateCustomersView({
				model: newCustomerCreationModel
			});
			$("#username").val("");
			$("#email_address").val("");
			$("#phone_number").val("");
		}
		$("#user-detail").hide();
		$("appointment-summary").show();
		summary();
	},
	invitePeopleList: function(e){
		$("#inviteList").append("<li email_id=" + $(e.currentTarget).attr("email_id") + ">" + $(e.currentTarget).text() + " <span>&times</span></li>");
		$("#invitePeople li").remove();
		$("#invite").val("");
	},
	summary: function(){

	}
});