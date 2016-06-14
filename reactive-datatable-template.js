Template.reactiveDatatable.rendered = function() {
    var data = this.data;

    if (typeof data.tableData !== 'function') {
        throw new Meteor.Error('Your tableData must be a function that returns an array via Cursor.fetch(), .map() or another (hopefully reactive) means');
    }

    var reactiveDataTable = new ReactiveDatatable(data.options);

    // Help Blaze cleanly remove entire datatable when changing template / route by
    // wrapping table in existing element (#datatable_wrap) defined in the template.
    var table = document.createElement('table');
    var tableClasses = data.options.tableClasses || '';
    table.className = 'table dataTable ' + tableClasses;
    table.id = data.options.id;

    // Render the table element and turn it into a DataTable
    this.$('.datatable_wrapper').append(table);
    var dt = $(table).DataTable(data.options);

    dt.on('page.dt', function(e, settings) {
        var info = dt.page.info();
        reactiveDataTable.page = info.page;
    });

    dt.on('stateLoaded.dt', function (e, settings, data) {
        console.log('state loaded', settings, data);
    } );

    dt.on( 'stateLoadParams.dt', function (e, settings, data) {
        console.log('stateLoadParams event fired', settings, data);
    } );


    reactiveDataTable.datatable = dt;


    reactiveDataTable.difference = function(array){
       var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));

       var containsEquals = function(obj, target) {
        if (obj == null) return false;
        return _.any(obj, function(value) {
          return _.isEqual(value, target);
        });
      };

      return _.filter(array, function(value){ return ! containsEquals(rest, value); });
    };


    this.autorun(function() {
        reactiveDataTable.update(data.tableData(), data.options);
    });

};
