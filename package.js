Package.describe({
    name: 'cenk:reactive-datatables',
    version: '1.0.1',
    summary: 'Reactive DataTables package for meteor with single row update capability',
    git: 'git@github.com:cdolek/cenk-reactive-datatables.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.3.2.4');
    api.use(['templating'], 'client');
    api.addFiles([
        'css/dataTables.1.10.13.min.css',
        'jquery.dataTables.1.10.13.min.js',
        'reactive-datatables.js',
        'reactive-datatable-template.html',
        'reactive-datatable-template.js',
    ], 'client');
    api.mainModule('reactive-datatables.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('cenk:reactive-datatables');
    api.mainModule('reactive-datatables-tests.js');
});