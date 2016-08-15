var detailTpl=require('../templates/detail.string');
SPA.defineView("detail",{
  html:detailTpl,
  plugins:["delegated",{
    name:'avalon',
    options:function(vm){
      vm.src='',
      vm.title=null,
      vm.description=null,
      vm.isShowLoading=true;
    }
  }],
  bindEvents:{
    show:function(){
      var param=this.param.id;
      var vm=this.getVM();
      $.ajax({
        url:'/api/getDetailmes.php',
        data:{'id':param},
        success:function(e){
          vm.src=e.data.img;
          vm.title=e.data.title;
          vm.description=e.data.description;
          setTimeout(function(){
            vm.isShowLoading=false;
          },1000)
        }
      })
    }
  },
  bindActions:{
      "go.back":function(){
        this.hide();
        SPA.show('index');

      }
  }
})