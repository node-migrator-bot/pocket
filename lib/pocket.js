var Database = require('./pocket/database');

exports.openDatabase = function(path, collections, callback) {
  if (typeof collections === 'function') {
    callback = collections;
    collections = [];
  }
  
  var db = new Database(path, collections);
  db.exists(function(exists) {
    if (exists) {
      db.open(function(err) {
        if (err) { return callback(err); }
        callback(null, db);
      });
    } else {
      db.create(function(err) {
        if (err) { return callback(err); }
        db.open(function(err) {
          if (err) { return callback(err); }
          callback(null, db);
        });
      });
    }
  });
}


exports.Database = Database;
