const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // console.log(this.dataDir);

  counter.getNextUniqueId((err, id) => {
    // if (!fs.existsSync(__dirname + '/testData/')) {
    //   fs.mkdirSync(__dirname + '/testData/');
    // }
    fs.writeFile(this.dataDir + `/${id}.txt`, text, (err) => {
      if (err) {
        throw ('error writing todo number ', id);
      } else {
        callback(null, {text: text, id: id});
      }
    });
  });
};

exports.readAll = (callback) => {
  const todosArray = [];
  let files = fs.readdirSync(this.dataDir);
  files.forEach(file => {
    const fileText = String(fs.readFileSync(this.dataDir + '/' + file));
    todosArray.push( {id: file.slice(0, 5), text: fileText} );
  });
  callback(null, todosArray);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
