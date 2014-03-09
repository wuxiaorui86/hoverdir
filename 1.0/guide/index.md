## 综述

Hoverdir。

* 版本：1.0
* 作者：元泉
* demo：[http://gallery.kissyui.com/hoverdir/1.0/demo/index.html](http://gallery.kissyui.com/hoverdir/1.0/demo/index.html?ks-debug)

## 初始化组件
		
    S.use('gallery/hoverdir/1.0/index', function (S, Hoverdir) {
        //以下参数都为默认值
        var hd = new Hoverdir({
            elCls : 'ks-hover-item',
            slideElCls : 'ks-slide-item',
            hoverDelay : 0, 
            reverse : false
        });          
    })
	
	

## API说明

    elCls : 'ks-hover-item' //hover结点的class
    hoverDelay : 0 //hover的延时，默认为0
    reverse : false  // 是否反向动画，默认为false   
    slideElCls : "ks-slide-item" //hover时出现的层的class