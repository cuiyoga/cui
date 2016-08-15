var loginTpl=require('../templates/login.string');
SPA.defineView("login",{
  html:loginTpl,//设置页面中的内容
  plugins:["delegated"],//引入插件，用于给DOM绑定动作
  styles:{
    background:'transparent!important'
  },
  bindActions:{//给DOM事件绑定动作(需要给DOM元素添加action-type的属性)
    "dialog.close":function(){
        this.hide();
        SPA.show('mine');
    },
    "go.register":function(){
      SPA.show('register',{
        ani: {
          name: 'actionSheet',
          distance: 200
        }
      });
    }
  }
})