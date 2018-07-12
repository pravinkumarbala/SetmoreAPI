var MeetingTypesModel = Backbone.Model.extend({
	defaults: {
		staff_key: "",
		key: "",
		service_name: "",
		staff_keys: [],
		duration: null,
		cost: null
	}
});