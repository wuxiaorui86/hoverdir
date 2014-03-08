/*
combined files : 

gallery/hoverdir/1.0/index

*/
/**
 * @fileoverview 
 * @author 元泉<yuanquan.wxr@taobao.com>
 * @module hoverdir
 **/
KISSY.add('gallery/hoverdir/1.0/index',function (S, Node,Base) {
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
            var el = _self.get('el');
            var hoverElCls = _self.get('hoverElCls');
            
            el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {
                
                var $el         = $(this),
                    evType      = event.type,
                    $hoverElem  = $el.one('.'+hoverElCls),
                    direction   = _self._getDir( $el, { x : event.pageX, y : event.pageY } ),
                    hoverClasses= _self._getClasses( direction );
                
                $hoverElem.attr('class',hoverElCls);
                
                if( evType === 'mouseenter' ) {
                    
                    $hoverElem.hide().addClass( hoverClasses.from );
                    
                    clearTimeout( _self.tmhover );
                    
                    _self.tmhover   = setTimeout( function() {
                        
                        $hoverElem.show().addClass( 'ks-animate' ).addClass( hoverClasses.to );
                    
                    }, _self.get('hoverDelay') );
                    
                }
                else {
                
                    $hoverElem.addClass( 'ks-animate' );
                    
                    clearTimeout( _self.tmhover );
                    
                    $hoverElem.addClass( hoverClasses.from );
                    
                }
                    
            } );
            
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
            
            var fromClass, toClass, reverse = this.get('reverse');
            
            switch( direction ) {
                case 0:
                    // from top
                    ( !reverse ) ? fromClass = 'ks-slideFromTop' : fromClass = 'ks-slideFromBottom';
                    toClass     = 'ks-slideTop';
                    break;
                case 1:
                    // from right
                    ( !reverse ) ? fromClass = 'ks-slideFromRight' : fromClass = 'ks-slideFromLeft';
                    toClass     = 'ks-slideLeft';
                    break;
                case 2:
                    // from bottom
                    ( !reverse ) ? fromClass = 'ks-slideFromBottom' : fromClass = 'ks-slideFromTop';
                    toClass     = 'ks-slideTop';
                    break;
                case 3:
                    // from left
                    ( !reverse ) ? fromClass = 'ks-slideFromLeft' : fromClass = 'ks-slideFromRight';
                    toClass     = 'ks-slideLeft';
                    break;
            };
            
            return { from : fromClass, to: toClass };
                    
        }    
    }, {ATTRS : /** @lends Hoverdir*/{
        el : {
            value : null,
            setter : function(el){
                return Node.one(el);
            }
        },
        hoverDelay  : {
            value : 0
        },
        reverse     : {
            value : false
        },
        hoverElCls : {
            value : "hover-element"
        }
    }});


    return Hoverdir;
}, {requires:['node', 'base']});




