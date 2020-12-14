import re

class variable_graph:
    def __init__(self,variables):
        self.variables = [i for i in variables if variables[i]["part"]==False]
        self.depend = {v:set() for v in variables}
        self.variable_order = []
        in_order =set()

        for name,v in variables.items():
            for j,p in v.items():
                if j!="part":
                    tmp = set(re.findall(r'(?<=(?<!\{)\{)[^{}]*(?=\}(?!\}))',p))
                    if '' in tmp:
                        tmp.remove('')
                    for t in tmp:
                        if variables[t]["part"] == False:
                            self.depend[name].add(t)
        
        self.topological_sort()

    def recur_topological(self,v,visited,stack):
        visited[v] = True

        for i in self.depend[v]:
            if visited[i] == False:
                self.recur_topological(i,visited,stack)
        
        stack.append(v)

    def topological_sort(self):
        visited = {v:False for v in self.variables}
        stack = []

        for v in self.variables:
            if visited[v] == False:
                self.recur_topological(v,visited,stack)


        self.variable_order = stack

    def get_order(self):
        return self.variable_order
