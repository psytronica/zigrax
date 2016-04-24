# -*- coding: utf-8 -*-
import sys
import io
from sys import path


path.append('/var/www/html/igra')

from mypythonapp.web import html
from mypythonapp.web.igra import *

def application(environ, start_response):
    segments = environ['REQUEST_URI'].split("/")[2:]
    #pt_begin ="/py"


    real_stdout = sys.stdout
    fake_stdout = io.BytesIO()
    try:
        sys.stdout = fake_stdout

        gm = Igra(environ, segments)

        if len(segments) and segments[0] == "t42":
            gm.t42()
        #elif peticion.startswith(pt_begin + '/gracias'):
        #    gm.gracias()
        else:
            gm.default_page()

    finally:
        sys.stdout = real_stdout
        output = fake_stdout.getvalue()
        fake_stdout.close()

        #output = "S"+output+"Z"

    start_response('200 OK', [('Content-Type', 'text/html; charset=utf-8')])
    return output
