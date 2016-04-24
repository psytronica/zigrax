# -*- coding: utf-8 -*-
import json

class t42viewport():

     def __init__(self, t42):
         self.t42 = t42

     def init(self, params):

         self.t42.step(self, params)

     def write(self, html, id):

         self.update({"content": html, "id" : id})

     def update(self, params):
         self.t42.step(self, params, "update")
