# -*- coding: utf-8 -*-

def main(t42):
    t42.viewport.init(
        {"id":"tea1", "width":"500px", "height": "300px", "x": "50px", "y": "20px",
        "content": 'Чай 1', "css": "border:1px dotted green; color:white",
        "background": '../igra/public_html/images/3.jpg', "bgtype":"tile",
         "effect": "slide", "effectTime": "1000"}
    )


    t42.viewport.init(
        {"id":"tea2",
         "width":"300px", "height": "200px", "x": "20px", "y": "30px",
            "content": 'Чай2', "css": "color:#fe0; border:1px solid yellow", "parent": "tea1",
            "background": '../igra/public_html/images/chai.jpg', "bgtype":"scale",
            "effect": "corner", "effectTime": "2000"}
    )

    t42.pausa({"time" : "3000", "do" : "func2"})


def func2(t42):
    t42.viewport.init(
        {"id":"tea3", "width":"200px", "height": "150px", "x": "70px", "y": "330px",
            "content": 'Чай <b>asd</b> 3', "css": "border:1px dotted green; color:white",
            "background": '../igra/public_html/images/chai2.jpg', "bgtype":"scale",
            "effect": "fadeIn", "effectTime": "1000"}
    )

    t42.pausa({"time" : "1000", "do" : "func3"})


def func3(t42):
    t42.viewport.init(
        {"id":"tea4", "width":"100px", "height": "60px", "x": "300px", "y": "350px",
            "content": 'Чай 44', "css": "border:1px dotted green; color:white",
            "background": '../igra/public_html/images/chai.jpg', "bgtype":"scale",
            "effect": "corner", "effectTime": "1000"}
    )

    t42.pausa({"time" : "1500", "do" : "func4"})

def func4(t42):
    t42.viewport.update(
        {"id":"tea2", "x": "75px", "y": "50px", "content": 'Чай 222', "animation": "linear", "effectTime" : "2000",
         "width": "100px", "height":"200px"}
    )
    t42.write("<div style='color:yellow'>Za <b>za</b> Za!</div>", "tea3")