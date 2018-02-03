module.exports = {
    process (src, filename) {
      console.log('from mock', filename);
      return 'module.exports = ' + JSON.stringify(filename) + ';';
    },
  };
