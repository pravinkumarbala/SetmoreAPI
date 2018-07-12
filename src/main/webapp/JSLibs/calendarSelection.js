/*
$(window).on('load', function(){
	$.ajax({
		url: "https://developer.setmore.com/api/v1/bookingapi/staffs",
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzZXRtb3JlLmZ1bGxhdXRoLmNvbSIsImlhdCI6MTUyOTA2MTYyNiwidXNlcl9pZCI6ImE0MTRiOTRkLTMxYjMtNGI0NS05MzFmLWY3YTA5YWMwYTEzZiIsImV4cCI6MTUyOTA2ODgyNiwianRpIjoiZjBlMTYua21SdGFSSE5OcyJ9.XvIzatJE6FaS2HQBVaTz2cWEAKMEdIK9IY71XNk1EEw");
		},
		success: function(response){
			for (var i = 0; i < response.data.staffs.length; i++) {
				$('#staffList').append('<option value="'+ response.data.staffs[i].key +'">' + response.data.staffs[i].first_name +" "+ response.data.staffs[i].last_name + '</option>');
			}	
		}
	})
});

function fetchAppt(){
	$.ajax({
		url: "https://developer.setmore.com/api/v1/bookingapi/appointments",
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzZXRtb3JlLmZ1bGxhdXRoLmNvbSIsImlhdCI6MTUyOTA2MTYyNiwidXNlcl9pZCI6ImE0MTRiOTRkLTMxYjMtNGI0NS05MzFmLWY3YTA5YWMwYTEzZiIsImV4cCI6MTUyOTA2ODgyNiwianRpIjoiZjBlMTYua21SdGFSSE5OcyJ9.XvIzatJE6FaS2HQBVaTz2cWEAKMEdIK9IY71XNk1EEw");
		},
		success: function(response){
			console.log(response);
		}
	})
}
*/

var calendarCollection = new CalendarsCollection();
new CalendarsView({
	el: $('#calendar'),
	collection: calendarCollection	
}).render();