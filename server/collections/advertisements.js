Customers.allow({
	insert: function (adId, doc) {
		return true;
	},

	update: function (adId, doc, fields, modifier) {
		return true;
	},

	remove: function (adId, doc) {
		return true;
	}
});

Customers.before.insert(function(adId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = adId;

	
});

Customers.before.update(function(adId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = adId;

	
});

Customers.before.remove(function(adId, doc) {
	
});

Customers.after.insert(function(adId, doc) {
	
});

Customers.after.update(function(adId, doc, fieldNames, modifier, options) {
	
});

Customers.after.remove(function(adId, doc) {
	
});
