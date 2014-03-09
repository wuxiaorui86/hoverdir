## 综述

Hoverdir。

* 版本：1.0
* 作者：元泉
* demo：[http://gallery.kissyui.com/hoverdir/1.0/demo/index.html](http://gallery.kissyui.com/hoverdir/1.0/demo/index.html?ks-debug)

## 初始化组件
		
    S.use('gallery/hoverdir/1.0/index', function (S, Hoverdir) {
         var hd = new Hoverdir({
            el : S.one('#wrap'),
            hoverDelay : 0,
            reverse : false
        });
    });
	
	

## API说明

    el : null //hover的容器
    hoverDelay : 0 //hover的延时，默认为0
    reverse:false  // 是否反向动画，默认为false   
    hoverElCls : "hover-element" //hover时出现的层的class