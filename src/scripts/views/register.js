var registerTpl = require('../templates/register.string');
SPA.defineView('register', {
  html: registerTpl,
  styles: {
    //'background': '#fff !important'
  },
  plugins: ['delegated'],
  bindActions: {
    'tap.cancel': function () {
      this.hide();
    }
  }
})
