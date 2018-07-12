$(document).ready(function() {
	/*
	Setup
	7d019bd42bWbohpX1aeT_N6rDSgOqkcC7sQy-mI-UMft2
	https://developers.setmore.com/searchAccountLogin?searchString=pravin.bala@a-cti.com&searchPriviledge=admin
	https://developers.setmore.com/api/v1/admin/contactId/pravin.bala@a-cti.com
	*/

	// Global Access Token
	var userToken = "7d019bd42bWbohpX1aeT_N6rDSgOqkcC7sQy-mI-UMft2";
	$.ajax({
		url: "https://developer.setmore.com/api/v1/o/oauth2/token?refreshToken=" + userToken,
		type: "GET",
		async: false,
		success: function(response){
			window.accessToken =  response.data.token.access_token;
		}
	});

	// Router for the Backbone
	var router = new MyRouter();
	Backbone.history.start();

	// Date Picking Calendar
	$("#datetimepicker").datetimepicker({
		todayHighlight: true,
		minView: 2,
		beforeShowDay: true,
		format: 'dd/mm/yyyy',
		autoclose: true
	});

	// Date Selection from the Calendar
	$("#datetimepicker").on('changeDate', function(e) {
		$("#hiddenDate").val(
			$("#datetimepicker").datetimepicker('getFormattedDate')
		);
		window.globalSelectMeetingDate = $("#hiddenDate").val();
		$(".list-group").css({
			"border-style": "solid",
			"border-color": "#000000"
		});
		$("#meetingTimeSlot li").remove();
		var meetingTimeSlotsView = new TimeSlotsView();
	});

	// Book the Meeting 
	$("#bookMeeting").on("click", function(){
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

		var meetingDate = meetingDateFormat();
		var startTime = calculateStartTime();
		var endTime = calculateEndTime();

		var customerAppointmentJSON = {
			"staff_key" : window.globalSelectRoomKey,
			"service_key" : window.globalSelectMeetingType,
			"customer_key": window.globalSelectMeetingCustomerKey,
			"start_time": meetingDate + "T" + startTime + ":00.000Z",
			"end_time": meetingDate + "T" + endTime + ":00.000Z",
			"label": "confirmed"
		}

		$("#user-detail").hide();
		$("#appointment-status").show();
		var createNewAppointmentsModel = new CreateAppointmentsModel(customerAppointmentJSON);
		var createNewMeetingAppointment = new CreateAppointmentsView({
			model: createNewAppointmentsModel
		});
	});

	var meetingDateFormat = function(){
		var dateFormat = window.globalSelectMeetingDate;
		console.info(dateFormat);
		var Year = dateFormat.substring(6,10);
		var Month = dateFormat.substring(3,5);
		var Date = dateFormat.substring(0,2);
		return Year + "-" + Month + "-" + Date;
	}

	var calculateStartTime = function(){
		var time = window.globalSelectMeetingTimeSlot;
		return time.substring(0,2) + ":" + time.substring(3,5);
	}

	var calculateEndTime = function(){
		var count = 0;
		var time = window.globalSelectMeetingTimeSlot;
		var serviceDurationTime = window.globalSelectMeetingDuration;
		var totalMinutes = parseInt(serviceDurationTime) + parseInt(time.substring(3,5));
		var hours = "";
		var minutes = "";
		if(totalMinutes > 60){
			count++;
			minutes = totalMinutes % 60;
		} else {
			minutes = totalMinutes;
		}
		hours = parseInt(time.substring(0,2)) + count;
		return hours + ":" + minutes;
	}

	// Fetching the customer details
	$("#invite").on("keyup", function(){
		var search_name = $("#invite").val();
		if (search_name.length > 3){
			var searchJSON = {
				"first_name": search_name
			};
			var newFetchCustomerModel = new FetchCustomersModel(searchJSON);
			var newFetchCustomerView = new FetchCustomersView({
				model: newFetchCustomerModel
			});
		}
	})

	// Selecting the people from the invite list
	$("#invitePeople li").on("click", function(e){
		$("#inviteList").append("<li email_id=" + $(e.currentTarget).attr("email_id") + ">" + $(e.currentTarget).text() + " <span>&times</span></li>");
		$("#invitePeople li").remove();
		$("#invite").val("");
	});

	// Deleting the member from the list
	$("#inviteList li").on("click", function(e){
		$(e.currentTarget).remove();
	});
});