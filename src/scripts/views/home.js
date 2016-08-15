document.addEventListener('touchmove', function(e){e.preventDefault();},false);
var homeTpl=require('../templates/home.string');
var util=require('../util/util.js');
SPA.defineView("home",{
	html:homeTpl, 
	plugins:["delegated",{//引入插件
		name:'avalon',
		options:function(vm){
			vm.livelist=[];//给VM添加livelist的属性
		}
	}],
	init:{
		mySwiper:null,
		head_swiper:null,
		vm:null,
		livelistArr:[],
		formatData:function(data){//将json数据变成二维数组
			var newArr=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				newArr[i] = [];
	            newArr[i].push(data[2*i]);
	            newArr[i].push(data[2*i+1]);
			}
			return newArr
		}
	},
	bindEvents:{
		beforeShow:function(){
					this.vm=this.getVM(),//获取VM
				  that=this;//获取视图
			$.ajax({
				//url:"/footballApp/json/livelist.json",
					url:'/api/getLivelist.php',
					type:"get",
	        data:{
	        	rtype:"origin" 
	        },
				success:function(e){
					that.livelistArr=e.data;
					//console.log(that.livelistArr)
					//将json挂到VM上
					that.vm.livelist=that.formatData(e.data)
				},
				error:function(){
					console.log('请求失败')
				}
			})
		},
		show:function(){
			var that=this;
			this.mySwiper = new Swiper('#swiper-slide',{
				onSlideChangeStart:function(swiper){
					var index=swiper.activeIndex;
					util.setFocus($('#m-nav li').eq(index))
				}
			})
			this.head_swiper = new Swiper('.m-home>.swiper-container',{
				onSlideChangeStart:function(swiper){
					var index=swiper.activeIndex;
					util.setFocus($('#h_nav li').eq(index))
				}
			})
			// var liveScroll=this.widgets['liveScroll'];
			// liveScroll.options.scrollX=true;
			// liveScroll.options.scrollY=false;


			 // 下拉刷新--上拉加载
      var myScroll = this.widgets.homeListScroll;
      var scrollSize = 35;
      myScroll.scrollBy(0,-scrollSize);
      var head=$(".head img"),
          topImgHasClass=head.hasClass("up");
      var foot=$(".foot img"),
          bottomImgHasClass=head.hasClass("down");

      myScroll.on("scroll",function(){
        var y=this.y,
            maxY=this.maxScrollY-y;
            if(y>=0){
                 !topImgHasClass && head.addClass("up");
                 return "";
            }
            if(maxY>=0){
                 !bottomImgHasClass && foot.addClass("down");
                 return "";
            }
      })

      myScroll.on("scrollEnd",function(){
      	//下拉刷新
        if(this.y>=-scrollSize && this.y<0){//判断拉的距离，是否进行刷新
              myScroll.scrollTo(0,-scrollSize);
              head.removeClass("up");
        }else if(this.y>=0){//如果距离大于0，进行刷新页面
              head.attr("src","/footballApp/img/ajax-loader.gif");
            	 $.ajax({
                  //url:"/footballApp/mock/livelist.json",  mock数据
                  url:"/api/getLivelist.php",
                  type:"get",
                  data:{
                     rtype:"refresh"
                  },
                  success:function(rs){
                  	//将数组连接在原数组的最前边
										that.livelistArr = rs.data.concat(that.livelistArr);
										//将最新的数据渲染在页面最前面
                    that.vm.livelist = that.formatData(that.livelistArr); 
                   //  myScroll.scrollTo(0,-scrollSize);
	                  // head.removeClass("up");
	                  // head.attr("src","/footballApp/img/arrow.png");
                  }
              })
	            setTimeout(function(){
	                  myScroll.scrollTo(0,-scrollSize);
	                  head.removeClass("up");
	                  head.attr("src","/footballApp/img/arrow.png");
	            },1000)
        }
        //上拉加载
        var maxY=this.maxScrollY-this.y;
        var self=this;
        if(maxY>-scrollSize && maxY<0){
              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
              foot.removeClass("down");
        }else if(maxY>=0){
            foot.attr("src","/footballApp/img/ajax-loader.gif");
              // 请求加载数据
              $.ajax({
                  //url:"/footballApp/mock/livelist.json",  mock数据
                  url:"/api/getLivelist.php",
                  type:"get",
                  data:{
                     rtype:"more"
                  },
                  success:function(rs){
										 that.livelistArr = that.livelistArr.concat(rs.data);
                     that.vm.livelist = that.formatData(that.livelistArr);
                     myScroll.refresh();
                		 //myScroll.scrollTo(0,self.y+that.maxScrollY);
                		 foot.removeClass("down");
                 		 foot.attr("src","/footballApp/img/arrow.png"); 
                  }
              })
              // setTimeout(function(){
              // 	 myScroll.refresh();
              //    myScroll.scrollTo(0,self.y+that.maxScrollY);
              //    foot.removeClass("down");
              //    foot.attr("src","/footballApp/img/arrow.png");
              // },500)
        }
      })
		}
	},
	bindActions:{
		"tap.slide":function(e){
			var index=$(e.el).index();
			this.mySwiper.slideTo(index,1000,false);
			util.setFocus($(e.el));
		},
		"tap.tabs":function(e){
			var index=$(e.el).index();
			this.head_swiper.slideTo(index,1000,false);
			util.setFocus($(e.el));
		},
		"goto.detail":function(e,data){
			SPA.show('detail',{
        param:data
      })
		}
	}
})