/**
 * Created by gmarsh on 11/23/15.
 */
jQuery(document).ready(function($){
    var _custom_media = true,
        _orig_send_attachment = wp.media.editor.send.attachment;

    jQuery('.custom_media').click(function(e) {
        var send_attachment_bkp = wp.media.editor.send.attachment;
        var button = jQuery(this);
        var id = button.attr('id').replace('_button', '');
        _custom_media = true;
        wp.media.editor.send.attachment = function(props, attachment){
            if ( _custom_media ) {
                jQuery("#"+id).val(attachment.url);
                if (id == 'slideimage') {
                    showDimensions(attachment.url);
                }
            } else {
                return _orig_send_attachment.apply( this, [props, attachment] );
            };
        }

        wp.media.editor.open(button);
        return false;
    });

    jQuery('.add_media').on('click', function(){
        _custom_media = false;
    });

    jQuery('#bgcolor').minicolors();
    jQuery('#textcolor').minicolors();

    if (jQuery('#slideimage').val() != '') {
        showDimensions(jQuery('#slideimage').val());
    }

    if (jQuery('#preview')) {
        jQuery('#preview').height(jQuery('#preview').width()*(9/16));
    }
});

function showDimensions(url){
    jQuery("<img/>",{
        load : function(){
            jQuery("#slideimagedimensions").html('Image Dimensions: ' + this.width+' x '+this.height);
        },
        src  : url
    });
}