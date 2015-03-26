var pageSession = new ReactiveDict();

Template.CustomersEdit.rendered = function() {
	
};

Template.CustomersEdit.events({
	
});

Template.CustomersEdit.helpers({
	
});

Template.CustomersEditEditForm.rendered = function() {
	

	pageSession.set("customersEditEditFormInfoMessage", "");
	pageSession.set("customersEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.CustomersEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customersEditEditFormInfoMessage", "");
		pageSession.set("customersEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			if(!t.find("#form-cancel-button")) {
				var message = msg || "Saved.";
				pageSession.set("customersEditEditFormInfoMessage", message);
			}

			Router.go("customers", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("customersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Customers.update({ _id: t.data.customer._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("customers", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.CustomersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customersEditEditFormErrorMessage");
	}
	
});
