// In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

//      * `selectAll()`
//      * `insertOne()`
//      * `updateOne()`


// Import MySQL connection.
var connection = require("./connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}


// Object for all our SQL statement functions.
var orm = {
    selectAll: function (tableName, cb) {
        var queryString = "SELECT * FROM " + tableName + ";";

        console.log(queryString);

        connection.query(queryString, function (err, results) {
            if (err) throw err;
            cb(results);
        });
    },
    insertOne: function (tableName, cols, vals, cb) {
        var queryString = "INSERT INTO " + tableName;
        queryString += " (" + cols.toString() + ") ";
        queryString += "VALUES ( ? ); ";


        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;
            cb(result);
        });

    },
    updateOne: function (tableName, objColVals, condition, cb) {
        var queryString = "UPDATE burgers " + tableName;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        // var queryString = "UPDATE " + table;
        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });

    }

}