module.exports = [
  {
    context: [''],
    target: 'http://localhost:8080',
    // the bypass part might be useless for you depending on how your backend works
    bypass: function(req, res, proxyOptions) {
      if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
        console.log('Skipping proxy for browser request.');
        return '/index.html';
      }
    }
  }
];
