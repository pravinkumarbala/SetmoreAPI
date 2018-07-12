var MeetingTypesView = Backbone.View.extend({
	el: $("#meetingType"),
	events:{
		"click .meetingTypes": "selectRoom"
	},
	template: _.template($("#meetingTypeList").html()),
	initialize: function(){
		//this.collection.on('reset', this.render, this);
		this.model = new MeetingTypesModel();
		this.collection = new MeetingTypesCollection();
		var self = this;
		this.collection.fetch({
			url: this.collection.url,
			type: "GET",
			beforeSend: function(xhr){
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
			},
			success: function(response){
				//console.info(response.models);
				for(var i = 0 ; i < response.models.length; i++){
					//console.log(response.models[i].toJSON());
					self.$el.append(self.template(response.models[i].toJSON()));
				}
			}
		})
	},
	selectRoom: function(e){
		var selectedMeetingType = $(e.currentTarget).attr("type_id");
		var selectedMeetingDuration = $(e.currentTarget).attr("service_duration");
		window.globalSelectMeetingType = selectedMeetingType;
		window.globalSelectMeetingDuration = selectedMeetingDuration;
		//var selectTimeSlotView = new TimeSlotsView();
		$("#type").hide();
		$("#time-slot").show();
	}
});