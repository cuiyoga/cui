var mineTpl=require('../templates/mine.string');
SPA.defineView("mine",{
	html:mineTpl,
  plugins:['delegated'],
  bindActions:{
    'goto.menu':function(){
      SPA.show('menu')
    }
  }
})
