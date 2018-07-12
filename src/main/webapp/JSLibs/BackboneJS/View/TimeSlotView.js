var TimeSlotsView = Backbone.View.extend({
	events: {
		"change .list-group-time": "slotKey"
	},
	initialize: function(){
		this.collection = new TimeSlotsCollection();
		var self = this;
		var slotJSON = {
			"staff_key": window.globalSelectRoomKey,
			"service_key": window.globalSelectMeetingType,
			"selected_date": window.globalSelectMeetingDate,
			"off_hours": true,
			"double_booking": false,
			"slot_limit": window.globalSelectMeetingDuration
		};
		this.collection.fetch({
			url: this.collection.url,
			type: "POST",
			data: JSON.stringify(slotJSON),
			beforeSend: function(xhr){
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
			},
			success: function(response){
				var slotData = response.toJSON();
				for(var i = 0; i < slotData[0].slots.length; i++){
					var slot = slotData[0].slots[i];
					if (slot.substring(0,2) >= 7 && slot.substring(0,2) < 12) {
						$("#morningMeetingTimeSlot").append('<li class="list-group-item" slot_time='+ slot +'>' + slot +" AM" +'</li>');
					}
					if ( slot.substring(0,2) >= 12 && slot.substring(0,2) < 17) {
						$("#noonMeetingTimeSlot").append('<li class="list-group-item" slot_time='+ slot +'>' + slot.replace(slot.substring(0,2), parseInt(slot.substring(0,2)) - 12) + " PM" + '</li>');
					}
					if (slot.substring(0,2) >= 17 && slot.substring(0,2) < 22) {
						$("#eveningMeetingTimeSlot").append('<li class="list-group-item" slot_time='+ slot +'>' + slot.replace(slot.substring(0,2), parseInt(slot.substring(0,2)) - 12) + " PM" + '</li>');
					}
				}	
			}
		});
	},
	slotKey: function(){
		//var slot = $(e.currentTarget).attr("slot_time");
		var slot = $(".list-group ul .list-group-item:selected").attr("slot_time")
		window.globalSelectMeetingTimeSlot = slot;
		$('#time-slot').hide();
		$('#user-detail').show();
	}
});