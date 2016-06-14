ReactiveDatatable = function(options) {
	var self = this;

	this.options = options = _.defaults(options, {
		// Any of these can be overriden by passing an options
		// object into your ReactiveDatatable template (see readme)
		rowId: '_id',
		stateSave: true,
		stateDuration: -1, // Store data for session only
		pageLength: 10,
		lengthMenu: [3, 5, 10, 50, 100],
		columnDefs: [{ // Global default blank value to avoid popup on missing data
			targets: '_all',
			defaultContent: '–––'
		}],
		stateLoadParams: function(settings, data) {
			// Make it easy to change to the stored page on .update()
			self.page = data.start / data.length;
		},

		/*

		"drawCallback": function( settings ) {
        	var api = new $.fn.dataTable.Api( settings );

	        // Output the data for the visible rows to the browser's console
	        // You might do something more useful with it!
	        // console.log( api.rows( {page:'current'} ).data() );

	        console.log( settings );
	    }

	    */


	});

	// console.log("options?", options);
};

ReactiveDatatable.prototype.update = function(data, settings) {
	if (!data) return;
	var self = this;

	/*
	console.log("-----------------------------");
	console.log("DataTables Data (Existing)");
	console.log("-----------------------------");
	console.log(self.datatable.rows().data());
	console.log("-----------------------------");
	console.log("dataTables updating");
	console.log("-----------------------------");
	console.log(data);
	console.log("-----------------------------");
	*/

	var existingData = self.datatable.rows().data().toArray();
	var dataDifference = self.difference(data,existingData);

	if ( dataDifference.length > 0 ) {

		dataDifference.forEach(function (dataItem) {

			var index = self.datatable.row('#'+dataItem._id);

			if ( index.length > 0 ) {
				self.datatable.row(index[0]).data(dataItem).invalidate();
			} else {
				self.datatable.row.add(dataItem);
			}

		});

	} else {

		// Data initializing or we have the same data
		self.datatable.rows.add(data);

	}

	self.datatable.draw(false);

};
