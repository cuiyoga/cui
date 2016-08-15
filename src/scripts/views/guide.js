var guideTpl=require('../templates/guide.string');
SPA.defineView("guide",{
	html:guideTpl,//设置页面中的内容
	plugins:["delegated"],//引入插件，用于给DOM绑定动作
	bindEvents:{	//绑定视图事件
		//boforeShow:function(){},	//视图加载完成之前回调函数
		show:function(){	//视图加载完成之后回调函数
			var mySwiper = new Swiper('.swiper-container',{
				autoplay:4000,
				//direction:'vertical',
				//speed:1000,
				//slidesPerView : 'auto',
				//loopedSlides :2,
				//effect : 'cube'
				//freeMode : true
			}) 
		}
	},
	bindActions:{//给DOM事件绑定动作(需要给DOM元素添加action-type的属性)
		"go.index":function(){
			SPA.open('index')//跳转到index页
		}
	}
})