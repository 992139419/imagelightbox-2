$(function() {

    /*
    |--------------------------------------------------------------------------
    | Setup Lightbox
    |--------------------------------------------------------------------------
    */

    var activityIndicatorOn = function()
    {
        $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
    },

    activityIndicatorOff = function()
    {
        $( '#imagelightbox-loading' ).remove();
    },

    overlayOn = function()
    {
        $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
    },

    overlayOff = function()
    {
        $( '#imagelightbox-overlay' ).remove();
    },

    closeButtonOn = function( instance )
    {
        $( '<a id="imagelightbox-close">Close</a>' ).appendTo( 'body' );
    },

    closeButtonOff = function()
    {
        $( '#imagelightbox-close' ).remove();
    },

    captionOn = function()
    {
        var image = $('a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img');

        if (image.length) {

            var description = image.attr('alt');

            if (description.length > 0) {
                $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
            }
        }
    },

    captionOff = function()
    {
        $( '#imagelightbox-caption' ).remove();
    };

    arrowsOn = function( instance, selector )
    {

        var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );

        if (instance.length >= 2)
        {
            $arrows.appendTo( 'body' );
        }

        $arrows.on( 'click touchend', function( e )
        {
            e.preventDefault();

            var $this   = $( this ),
                $target = $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
                index   = $target.index( selector );

            if( $this.hasClass( 'imagelightbox-arrow-left' ) )
            {
                index = index - 1;
                if( !$( selector ).eq( index ).length )
                    index = $( selector ).length;
            }
            else
            {
                index = index + 1;
                if( !$( selector ).eq( index ).length )
                    index = 0;
            }

            instance.switchImageLightbox( index );
            return false;
        });
    },
    arrowsOff = function()
    {
        $( '.imagelightbox-arrow' ).remove();
    };

    var selector =  'a[data-imagelightbox="thumb"]';
    var instance = $( selector ).imageLightbox(
    {
	 	allowedTypes:	'png||jpg|jpeg|gif',
        preloadNext:    true,
        onStart:        function() { overlayOn(); closeButtonOn( instance ); arrowsOn( instance, selector );  },
        onEnd:          function() { overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); arrowsOff(); },
        onLoadStart:    function() { captionOff(); activityIndicatorOn(); },
        onLoadEnd:      function() { captionOn(); activityIndicatorOff();}
    });
});