import random
import copy 

class graph:
    def __init__(self,nodes,directed=False,cycles=False,connected=True):
        self.nodes = copy.deepcopy(nodes)
        random.shuffle(self.nodes)
        self.directed = directed
        self.connected = connected
        self.num = len(self.nodes)
        self.edges = set()
        self.map_edge = [[] for _ in range(self.num)]

    def add_edge(self,a,b):
        e = (a,b)
        if e not in self.edges:
            if (not self.directed) and (b,a) in self.edges:
                return False
            self.edges.add(e)
            self.map_edge[a].append(b)
            if not self.directed:
                self.map_edge[b].append(a)
            return True
        return False

    def __getitem__(self,i):
        return (self.nodes[self.edges[i][0]],self.nodes[self.edges[i][1]])

    def size(self):
        return len(self.edges)

    def get_edges(self,shuffle=True):
        tmp_edges = set()
        for e in self.edges:
            tmp_edges.add((self.nodes[e[0]],self.nodes[e[1]]))
        return tmp_edges


def create_graph(nodes,directed=False,cycles=False,connected=True):
    # if connected==False:
    #     raise NotImplementedError()
    gh = graph(nodes,directed,cycles,connected)
    nv = set(range(gh.num)) 
    
    nv.remove(0)
    pre = 0
    while len(nv):
        if not connected:
            if random.random() < 0.5:
                pre = random.choice(tuple(nv))
                nv.remove(pre)
        if cycles:
            tmp_lst = list(range(gh.num))
            tmp_lst.remove(pre)
            tmp = random.choice(tmp_lst)
        else:
            tmp = random.choice(tuple(nv))
        if tmp in nv:
            nv.remove(tmp)
        gh.add_edge(pre,tmp)
        if random.random() < 0.5:
            pre = tmp
    return gh
        
        



