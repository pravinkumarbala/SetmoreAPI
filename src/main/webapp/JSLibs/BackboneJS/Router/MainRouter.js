var MyRouter = Backbone.Router.extend({
	routes: {
		"": "SelectMeetingRoom",
		"/MeetingType": "SelectMeetingType"
	},
	SelectMeetingRoom: function(){
		var meetingRoomView = new RoomsView();
	}
})