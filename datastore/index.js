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
  console.log(id);
  fs.readFile(this.dataDir + '/' + id + '.txt', (err, fileData) => {
    if (err) {
      callback(err, 0);
    } else {
      callback(err, { id: id, text: String(fileData) });
    }
  });
  // if (fs.existsSync(this.dataDir + '/' + id + '.txt')) {
  //   const fileText = String(fs.readFileSync(this.dataDir + '/' + id + '.txt'));
  // } else {
  //   throw('File does not exist');
  // }
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  if (!fs.existsSync(this.dataDir + `/${id}.txt`)) {
    callback(100, id);
  } else {
    fs.writeFile(this.dataDir + `/${id}.txt`, text, (err) => {
      if (err) {
        throw ('error writing todo number ', id);
      } else {
        console.log('this is id, ', id, ' and this is text, ', text);
        callback(null, {text: text, id: id});
      }
    });
  }
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  if (!fs.existsSync(this.dataDir + `/${id}.txt`)) {
    callback(100, id);
  }
  fs.unlinkSync(this.dataDir + `/${id}.txt`);
  if (!fs.existsSync(this.dataDir + `/${id}.txt`)) {
    callback(100, id);
  } else {
    console.log('Successfully deleted file ', id, '.txt');
  }
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
