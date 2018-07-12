var CreateAppointmentsView = Backbone.View.extend({
	initialize: function(){
		var createAppointment = {
			"staff_key": this.model.get("staff_key"),
			"service_key": this.model.get("service_key"),
			"customer_key": this.model.get("customer_key"),
			"start_time": this.model.get("start_time"),
			"end_time": this.model.get("end_time")
		};
		console.info(createAppointment);
		this.collection = new CreateAppointmentsCollection();
		var self = this;
		this.collection.fetch({
			url: this.collection.url,
			type: "POST",
			data: JSON.stringify(createAppointment),
			beforeSend: function(xhr){
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
			},
			success: function(response){
				var status = response.toJSON();
				$("#appointmentStatus").val(status[0].msg);
				console.info(status);
			}
		})
	}
})