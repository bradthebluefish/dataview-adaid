var pageSession = new ReactiveDict();

Template.CustomersDetails.rendered = function() {
	
};

Template.CustomersDetails.events({
	
});

Template.CustomersDetails.helpers({
	
});

Template.CustomersDetailsDetailsForm.rendered = function() {
	

	pageSession.set("customersDetailsDetailsFormInfoMessage", "");
	pageSession.set("customersDetailsDetailsFormErrorMessage", "");

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

Template.CustomersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customersDetailsDetailsFormInfoMessage", "");
		pageSession.set("customersDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			if(!t.find("#form-cancel-button")) {
				var message = msg || "Saved.";
				pageSession.set("customersDetailsDetailsFormInfoMessage", message);
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("customersDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},

	//NEW CODE - REDIRECT 
	"click #form-edit-button": function(e, t) {
		e.preventDefault();

		//BROKEN!! - ROUTER FOR 'custmerId' CANNOT BE FOUND
		//Router.go("customers.edit", {customerId: this._id});

		//WORKS!!! - CustomerID - Marc Maravalli - EDgp4nKrRBzKpx8YS
		//	this.route("customers.edit", {path: "/customers/edit/:customerId", controller: "CustomersEditController"});/*ROUTER_MAP*/
		//Router.go("customers.edit", {customerId: 'EDgp4nKrRBzKpx8YS'});
		Router.go("customers.edit", {customerId: 'EDgp4nKrRBzKpx8YS'});

		//WORKS!!! - ROUTER FOR 'customers' WORKS FOR NO ID REQUIRED
		//Router.go("customers", {});
		return false;
	},

	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("customers", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("customers", {});
	}

});

Template.CustomersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customersDetailsDetailsFormErrorMessage");
	}
	
	
});

Template.CustomersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("customers.details", {customerId: this._id});
		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Customers.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("customers.edit", {customerId: this._id});
		return false;
	}
});
