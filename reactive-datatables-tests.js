// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by reactive-datatables.js.
import { name as packageName } from "meteor/reactive-datatables";

// Write your tests here!
// Here is an example.
Tinytest.add('reactive-datatables - example', function (test) {
  test.equal(packageName, "reactive-datatables");
});
