import random
from random import randint
import os
import subprocess
import yaml
import re
import copy
import tqdm
import itertools
import argparse
from functools import partial
from .range_class import allrange
from .graph import create_graph
from .variable_graph import variable_graph

def evaluator(match):
	match = match.group()
	return str(eval(match[1:-1]))

def product_nth(lists, num):
    res = []
    for a in reversed(lists):
        res.insert(0, a[num % len(a)])
        num //= len(a)
    return res

def sample(n, k):
    if n < k :
        raise Exception("Not enough values to be distinct")
    # assume n is much larger than k
    randbelow = partial(random.randrange, n)
    # from random.py
    result = [None] * k
    selected = set()
    selected_add = selected.add
    for i in range(k):
        j = randbelow()
        while j in selected:
            j = randbelow()
        selected_add(j)
        result[i] = j
    return result

def get_values(cond,var):
    cond["type"] = cond["type"].lower()
    for i in cond :     
        if type(cond[i]) == str:
            if ("{}" not in cond[i]) and (i not in ["value","format"]):
                cond[i] = cond[i].format(**var)
                cond[i] = re.sub('<.+?>',evaluator,cond[i])
    
    if cond["type"] in ["integer","int"]:
        return allrange(str(cond["range"]),int)
    elif cond["type"] in ["string","str"]:
        return allrange(str(cond["range"]),str)
    

def create_var(cond,var,input_for,original=False):
    if "file" in cond:
        return subprocess.check_output(cond["file"].format(**var),shell=True).decode('utf-8')

    ele = None
    cond["type"] = cond["type"].lower()

    for i in cond :     
        if type(cond[i]) == str:
            if ("{}" not in cond[i]) and (i not in ["value","format","weight"]):
                cond[i] = cond[i].format(**var)
                cond[i] = re.sub('<.+?>',evaluator,cond[i])

    if cond["type"] in ["integer","int"]:
        ele = int(allrange(str(cond["range"]),int).random())

    elif cond["type"] in ["string","str"]:
        ele = ''.join(allrange(str(cond["range"]),str).random(k = int(allrange(cond["length"],int).random())))

    elif cond["type"] in ["list","array"]:
        ele = []
        ori_val=[]
        req_var = {x:None for x in re.findall(r'(?<=(?<!\{)\{)[^{}]*(?=\}(?!\}))', cond["value"])}
        length = int(allrange(cond["length"],int).random())

        if cond["distinct"]=='true':
            req_lst = []
            pro = 1
            for i in req_var:
                tmp = get_values(copy.deepcopy(input_for["variables"][i]),var)
                pro*= len(tmp)
                req_lst.append(tmp)
            # print(req_lst)
            indices = sample(pro,int(allrange(cond["length"],int).get_lower_random(pro)))
            if "order" in cond:
                if cond["order"]=="increasing":
                    indices.sort()
                elif cond["order"]=="decreasing":
                    indices.sort(reverse=True)
            for ind in indices:
                idx = product_nth(req_lst,ind)
                for j,i in enumerate(req_var):
                    req_var[i]= idx[j]
                ori_val.append(copy.deepcopy(req_var))
                # ele.append(cond["value"].format(**req_var))
        else:
            f_arr = []     
            for _ in range(length):
                tmp_arr = []
                for i in req_var:
                    tmp_arr.append(create_var(copy.deepcopy(input_for["variables"][i]),var,input_for,True))
                f_arr.append(tmp_arr)
            if "order" in cond:
                if cond["order"]=="increasing":
                    f_arr.sort()
                elif cond["order"]=="decreasing":
                    f_arr.sort(reverse=True)
            for k in range(length):
                for i,j in enumerate(req_var):
                    req_var[j] = f_arr[k][i]
                ori_val.append(copy.deepcopy(req_var))

        if original:
            return ori_val
        for k in ori_val:
            ele.append(cond["value"].format(**k))
        for i,v in enumerate(ele):
            ele[i] = re.sub('<.+?>',evaluator,ele[i])
        ele = ''.join(ele)
    elif cond["type"] in ["graph"]:
        ele=[]
        nodes = allrange(cond["nodes"],int).random()
        directed = (cond["directed"]=="true")
        connected = (cond["connected"]=="true")
        cycles = (cond["cycles"]=="true")
        nodes = [i+1 for i in range(nodes)]
        
        gh = create_graph(nodes,directed,cycles,connected)
        lst_weights = []

        if cond["weight"] != '':
            variables = set(re.findall(r'(?<=(?<!\{)\{)[^{}]*(?=\}(?!\}))', cond["weight"]))
            if '' in variables:
                variables.remove('')
            if len(variables) > 0:
                req_var = {x:None for x in variables}
                for _ in range(gh.size()):
                    for i in req_var:
                        req_var[i] = create_var(copy.deepcopy(input_for["variables"][i]),var,input_for)
                    tmp_value = cond["weight"].format(**req_var)
                    tmp_value = re.sub('<.+?>',evaluator,tmp_value)
                    lst_weights.append(allrange(tmp_value,str).random())

        if original:
            return gh,lst_weights
        if cond["weight"] != "":
            for e,w in zip(gh.get_edges(),lst_weights):
                ele.append(f"{e[0]} {e[1]} {w}")
        else:
            for e in gh.get_edges():
                ele.append(f"{e[0]} {e[1]}")
        
        ele = '\n'.join(ele)
    elif cond["type"] in ["tree"]:
        raise NotImplementedError()
        
    if original:
        return ele
    return str(ele)


def yield_input(times,doc,var,input_for):
    if(doc.get('input-creator-file','')!=''):
        for _ in range(times):
            out = subprocess.check_output(doc['input-creator-file'],shell=True).decode('utf-8')
            yield out
        return

    var_order = variable_graph(input_for["variables"]).get_order()

    for _ in range(times):
        checker = False
        while(checker==False):
            if input_for.get("testcases",'')!='':
                testcases = allrange(input_for["testcases"],int).random()
                ret = str(testcases)+'\n'
            else:
                testcases = 1
                ret = ""

            for _ in range(testcases):
                for i in var_order:
                    var[i] = create_var(copy.deepcopy(input_for["variables"][i]),var,input_for)
                ret += input_for["structure"].format(**var)
            
            checker = True
            if input_for.get("input-checker-file",'')!='':
                    check_out = subprocess.check_output(input_for["input-checker-file"], input = str.encode(ret),shell=True).decode('utf-8')
                    if int(check_out)==0:
                        checker = False           
        yield ret


def get_sample_output(doc):
    if "preprocess" in doc:
        os.system(doc["preprocess"])
        print("Preprocessing completed.")

    if "files" in doc:
        if "brute" in doc["files"]:
            brute = doc["files"]['brute']
        code = doc["files"]['code']

    if doc.get('input-creator-file','')=='':
        input_for = doc["input"]
        times = input_for["times"]
        var = { x:None for x in input_for["variables"]}

    for inp in yield_input(1,doc,var,input_for):
            return inp
                

def compare_code(doc):
    yield {"text":"Preprocessing started..."}
    if "preprocess" in doc:
        os.system(doc["preprocess"])
        print("Preprocessing completed.")
    yield {"text":"Starting tests ......"}
    if "files" in doc:
        if "brute" in doc["files"]:
            brute = doc["files"]['brute']
        code = doc["files"]['code']

    if doc.get('input-creator-file','')=='':
        input_for = doc["input"]
        times = input_for["times"]
        var = { x:None for x in input_for["variables"]}
    prev_pro = 0
    for i,inp in enumerate(yield_input(times,doc,var,input_for)):
        try:
            f1_out = subprocess.check_output(brute, input = str.encode(inp),shell=True).decode('utf-8')
        except:
            yield {"success":False,"input":inp, "message":"Error occured in File-1"}
            return

        try:
            f2_out = subprocess.check_output(code, input = str.encode(inp),shell=True).decode('utf-8')
        except:
            yield {"success":False,"input":inp, "message":"Error occured in File-2"}
            return

        if(f1_out.strip()!=f2_out.strip()):
            yield {"success":False,"input":inp,"message":"Both getting different answer","file1":f1_out,"file2":f2_out}
            return

        if prev_pro != ((i+1)*100)//times :
            yield {"text":"Finding errors...","progress": ((i+1)*100)//times}
            prev_pro = ((i+1)*100)//times
        # print(i,inp,f1_out,f2_out)
    yield {"success":True,"message":"No differences found"}


