var RoomsView = Backbone.View.extend({
	el: $('#meetingRoom'),
	events: {
		"click .meetingRooms": "selectRoom"
	},
	template: _.template($("#meetingRoomList").html()),
	initialize: function(){
		this.collection = new RoomsCollection();
		var self = this;
		this.collection.fetch({
			url: this.collection.url,
				type: "GET",
				beforeSend: function(xhr){
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", "Bearer " + window.accessToken);
			},
			success: function(response){
				for(var i = 0; i < response.models.length; i++){
					self.$el.append(self.template(response.models[i].toJSON()));
				}
			}
		})
	},
	selectRoom: function(e){
		var selectedRoomKey = $(e.currentTarget).attr("room-id");
		window.globalSelectRoomKey = selectedRoomKey;
		var selectMeetingTypeView = new MeetingTypesView();
		//selectedRoom.model.set("staff_key", selectedRoomKey);
		$("#room").hide();
		$("#type").show();
	}
});