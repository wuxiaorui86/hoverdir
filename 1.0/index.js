/**
 * @fileoverview 
 * @author 元泉<yuanquan.wxr@taobao.com>
 * @module hoverdir
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class Hoverdir
     * @constructor
     * @extends Base
     */
    function Hoverdir(comConfig) {
        var self = this;
        //调用父类构造函数
        Hoverdir.superclass.constructor.call(self, comConfig);
        self._init();
    }
    S.extend(Hoverdir, Base, /** @lends Hoverdir.prototype*/{
        _init : function(){
            this._loadEvents();
        },
        _loadEvents : function() {
            
            var _self = this;
            var elCls = _self.get('elCls');
            var slideElCls = _self.get('slideElCls');
            
            $(_self.get('hoverProxy')).delegate( 'mouseenter.hoverdir, mouseleave.hoverdir', '.' + elCls, function( event ) {
                
                var $el         = $(event.currentTarget),
                    $hoverElem  = $el.one('.'+slideElCls),
                    direction   = _self._getDir( $el, { x : event.pageX, y : event.pageY } ),
                    hoverClasses= _self._getClasses( direction );
                
                _self._resetClass($hoverElem);
                
                if( event.type === 'mouseenter' ) {
                    
                    $hoverElem.hide().addClass( hoverClasses.from );
                    
                    clearTimeout( _self.tmhover );
                    
                    _self.tmhover = setTimeout( function() {
                        
                        $hoverElem.show().addClass( hoverClasses.to );
                    
                    }, _self.get('hoverDelay') );
                    
                } else {
                                    
                    clearTimeout( _self.tmhover );
                    
                    $hoverElem.addClass( hoverClasses.from );
                    
                }
                    
            } );
            
        },
        _resetClass : function(el){
            var temp = 'data-class-old', oldCls = el.attr(temp);
            if(!oldCls){
                oldCls = el.attr('class');
                el.attr(temp, oldCls);
            }else{
                el.attr('class', oldCls);
            }
        },
        // credits : http://stackoverflow.com/a/3647634
        _getDir             : function( $el, coordinates ) {
            
                /** the width and height of the current div **/
            var w = $el.width(),
                h = $el.height(),

                /** calculate the x and y to get an angle to the center of the div from that x and y. **/
                /** gets the x value relative to the center of the DIV and "normalize" it **/
                x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
                y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
            
                /** the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);**/
                /** first calculate the angle of the point, 
                add 180 deg to get rid of the negative values
                divide by 90 to get the quadrant
                add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
                direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 )  % 4;
            
            return direction;
            
        },
        _getClasses         : function( direction ) {

            return { 
                from : this.get("fromClass")[!this.get('reverse') ? direction : (direction + 2) % 4], 
                to: this.get("toClass")[direction] 
            };
                    
        }    
    }, {ATTRS : /** @lends Hoverdir*/{
        elCls : {
            value : "ks-hover-item"     
        },
        hoverDelay  : {
            value : 0
        },
        reverse     : {
            value : false
        },
        slideElCls : {
            value : "ks-slider-item"
        },
        hoverProxy : {
            value : document
        },
        fromClass : {
            value : ['ks-slideFromTop','ks-slideFromRight','ks-slideFromBottom','ks-slideFromLeft']
        },
        toClass : {
            value : ['ks-slideTop','ks-slideRight','ks-slideBottom','ks-slideLeft']
        }
    }});


    return Hoverdir;
}, {requires:['node', 'base']});



