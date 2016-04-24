# -*- coding: utf-8 -*-
import json

class Igra():

    def __init__(self, environ, segments):
        self.environ = environ
        self.segments = segments
        self.igpath = "http://"+self.environ["SERVER_ADDR"]+ "/igra"
        self.t42path = "http://"+self.environ["SERVER_ADDR"]+ "/t82"
        self.t42root = "http://"+self.environ["SERVER_ADDR"]+ "/py/t42"
        self.basepath = self.environ["DOCUMENT_ROOT"]+"/igra"

        self.steps = []
        #print(environ)

    def t42(self):

        vpmod = self.my_import('mypythonapp.web.lib.viewport')
        self.viewport = vpmod.t42viewport(self)
        #self.print = self.viewport.print

        gm = self.my_import('mypythonapp.web.t42.'+self.segments[1])

        funcname = ""
        if len(self.segments) > 3 and "f" in self.segments:

            segnum = [i+1 for i,seg in enumerate(self.segments) if seg == "f"][0]
            funcname = self.segments[segnum] if len(self.segments) > segnum else ""

        if funcname:
            methodToCall = getattr(gm, funcname)
            methodToCall(self)
        else:
            gm.main(self)

        print(json.dumps(self.steps))


    def step(self, mod, params, command=""):

        modname = mod if isinstance(mod, str) else mod.__class__.__name__ [3:]

        self.steps.append({
           "module": modname,
           "params": params,
           "command": command
        })

    def pausa(self, params):
        self.step("pausa", params, command="")

    def write(self, html, id):
        self.viewport.write(html, id)


    def my_import(self, name):
        m = __import__(name)
        for n in name.split(".")[1:]:
          m = getattr(m, n)
        return m

    def default_page(self):
        with open(self.basepath+"/public_html/igra.html") as f: s = f.read()
        s = s.replace("%igpath%", self.igpath).replace("%t42path%", self.t42path)\
            .replace("%t42root%", self.t42root)
        print(s)