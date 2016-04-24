var VPRS = {};

jQuery.extend({

    viewport: function(options, command) {

        var defaults = {
            wrapper:null,
            id: "",
            width: "", //px
            height: "", //px
            x: "", //px
            y: "", //px
            content: "",
            scroll: false,
            background: "",
            bgtype: "tile", // tile / scale
            parent: "", // id родительского вьюпорта
            css:"",
            effect:"", //fadeIn / corner
            effectTime:"",
            animation:"", // swing / linear

            /* TODO - сделать триггеры */
            onDragBegin: null,
            onDragEnd: null,
            onResizeBegin: null,
            onResizeEnd: null,
            onAjaxContentLoaded: null,

            draggable: false,
            resizeable: false

        };

        var my = {};
        my.options = jQuery.extend(defaults, options);

        if(!my.options.id){
            t42log("Вы должны задать id вьюпорта");
        }

        if(!command){
            this.init(my);
        }else if (command == "update"){
            this.update(my, options);
        }

        VPRS[my.options.id] = my;
    },

    init: function(my) {

        my.vpwrapper = jQuery("<div></div>");
        my.vpwrapper.addClass("t42viewport_wrapper");
        my.vpwrapper.attr("id", "t42viewport_wrapper_"+my.options.id);

        my.bg = jQuery("<div></div>");
        my.bg.addClass("t42viewport_bg");
        if(my.options.background && my.options.bgtype == "scale"){

            my.img = jQuery("<img src='"+my.options.background+"' />");
            my.img.addClass("t42viewport_img");
            my.bg.append(my.img);

            /*if(my.options.width){
                my.img.css("width", my.options.width);
            }
            if(my.options.height){
                my.img.css("height", my.options.height);
            }*/

        }else if(my.options.background && my.options.bgtype == "tile"){
            my.bg.css("background-image", 'url(' + my.options.background + ')');
        }


        my.vpwrapper.append(my.bg);

        my.vp = jQuery("<div></div>");

        my.vpwrapper.append(my.vp);

        my.vp.html(my.options.content);


        if(my.options.parent){
            if(!VPRS[my.options.parent]){
                t42log("Родительский вьюпорт '"+my.options.parent+"' не существует");
                return;
            }
            VPRS[my.options.parent].vp.append(my.vpwrapper);
        }else{
            my.options.wrapper.append(my.vpwrapper);
        }

        my.vp.addClass("t42viewport");
        if(my.options.scroll) my.vpwrapper.addClass("viewport");

        my.vpwrapper.attr({
            "style": my.options.css
        });
        my.vp.attr({
            "id": "t42vp_"+my.options.id
        });


        if(my.options.width){
            my.vp.css("width", my.options.width);
            my.vpwrapper.css("width", my.options.width);
            my.bg.css("width", my.options.width);
        }
        if(my.options.height){
            my.vp.css("height", my.options.height);
            my.vpwrapper.css("height", my.options.height);
            my.bg.css("height", my.options.height);
        }
        if(my.options.x) my.vpwrapper.css("left", my.options.x);
        if(my.options.y) my.vpwrapper.css("top", my.options.y);

        if(my.options.effect){
            my.vpwrapper.hide();
            if( my.options.effect == 'corner'){
                my.vpwrapper.show(parseInt(my.options.effectTime));
            }else if(my.options.effect == 'slide'){
                my.vpwrapper.slideDown(parseInt(my.options.effectTime));
            }else{
                my.vpwrapper.fadeIn(parseInt(my.options.effectTime));
            }
        }


    },
    update: function(my, options) {

        my.options = jQuery.extend(VPRS[my.options.id].options, options);

        console.log("UPDAAAAAATE");
        console.log(options);

        my.vpwrapper = jQuery("#t42viewport_wrapper_"+my.options.id);
        my.vp = jQuery("#t42vp_"+my.options.id);
        my.bg = my.vpwrapper.children(".t42viewport_bg").first();

        if(my.bg.children('img').length) my.img = my.bg.children('img').first();


        if (my.options.animation){

            var animaparams = {}
            if(options.x) animaparams['left'] = options.x;
            if(options.y) animaparams['top'] = options.y;
            if(options.width) animaparams['width'] = options.width;
            if(options.height) animaparams['height'] = options.height;

            my.vpwrapper.animate(animaparams, {
                duration: parseInt(my.options.effectTime),
                easing: my.options.animation,
                complete: function() {
                  //
                }

            });

            if(options.content || options.width || options.height){

                var vpparams = {}

                if(options.content){
                    vpparams['opacity'] = 0.0;
                }
                if(options.width) vpparams['width'] = options.width;
                if(options.height) vpparams['height'] = options.height;



                my.vp.animate(vpparams, {
                    duration: parseInt(parseInt(my.options.effectTime)/2),
                    easing: my.options.animation,
                    complete: function() {

                        if(options.content){
                            my.vp.html(options.content);
                            my.vp.animate({
                                opacity:  1.0
                            }, {
                                duration: parseInt(parseInt(my.options.effectTime)/2),
                                easing: my.options.animation
                            });
                        }

                    }

                });
            }



            if(options.width || options.height){

                var bgparams = {}
                if(options.width) bgparams['width'] = options.width;
                if(options.height) bgparams['height'] = options.height;

                my.bg.animate(bgparams, {
                    duration: parseInt(my.options.effectTime),
                    easing: my.options.animation

                });

                /*if(my.img){
                    my.img.animate(bgparams, {
                        duration: parseInt(my.options.effectTime),
                        easing: my.options.animation

                    });

                }*/

            }

        }else{
            if(options.x) my.vpwrapper.css("left", options.x);
            if(options.y) my.vpwrapper.css("top", options.y);

            if(options.width){
                my.vpwrapper.css("width", options.width);
                my.vp.css("width", options.width);
                my.bg.css("width", options.width);
            }
            if(options.height){
                my.vpwrapper.css("height", options.height);
                my.vp.css("height", options.height);
                my.bg.css("height", options.height);
            }


            if(options.content){
                my.vp.html(options.content);
            }

        }


    }

});



jQuery(document).ready(function() {


    jQuery('.t42igra').each(function(ind, el){

        if(!el.id){
            t42log("Задайте уникальный id контейнера .t42igra");
            return;
        }

        t42Wrapper = jQuery(el);
        getProgramma(t42Wrapper);

    });

    //background
    //t42log(VPRS["main"]);

});

function getProgramma(t42Wrapper, url){

    link = T42ROOT+"/"+t42Wrapper.attr('id')
    if (url) link += url

    jQuery.get( link, function( data ) {

        jQuery.each(data, function( index, step ) {
            if(step.module == "viewport"){
                step.params['wrapper'] = t42Wrapper;
                jQuery.viewport(step.params, step.command);

            }else if(step.module == "pausa"){
                 doPausa(step, t42Wrapper)
            }
        });
    }, "json" );

}

function doPausa(step, t42Wrapper){

    setTimeout(function(){
      getProgramma(t42Wrapper, "/f/"+step.params['do']);
    }, step.params['time']);

}


function t42log(text, isdir){
    if(isdir){
        console.dir(text);
    }else{
        console.log(text);
    }
}