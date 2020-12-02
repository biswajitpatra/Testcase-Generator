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
from range_class import allrange

parser = argparse.ArgumentParser(description="Create test cases based on input")
parser.add_argument("path",metavar="path",type=str,help='The path to yaml/json')

args = parser.parse_args()
input_path = args.path

if not os.path.isfile(input_path):
    raise Exception("The following path to yaml file does not exist")

doc = yaml.full_load(open(input_path))

if "preprocess" in doc:
    os.system(doc["preprocess"])
    print("Preprocessing completed.")

if "files" in doc:
    if "brute" in doc["files"]:
        brute = doc["files"]['brute']
    code = doc["files"]['code']

if(doc.get('input-creator-file','')==''):
    input_for = doc["input"]
    times = input_for["times"]
    var = { x:None for x in input_for["variables"]}


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

def get_values(cond):
    global var
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
    

def create_var(cond, original=False):
    global var
    if "file" in cond:
        return subprocess.check_output(cond["file"].format(**var),shell=True).decode('utf-8')

    ele = None
    cond["type"] = cond["type"].lower()

    for i in cond :     
        if type(cond[i]) == str:
            if ("{}" not in cond[i]) and (i not in ["value","format"]):
                cond[i] = cond[i].format(**var)
                cond[i] = re.sub('<.+?>',evaluator,cond[i])

    if cond["type"] in ["integer","int"]:
        ele = int(allrange(str(cond["range"]),int).random())
    elif cond["type"] in ["string","str"]:
        ele = ''.join(allrange(str(cond["range"]),str).random(k = int(cond["length"])))
    elif cond["type"] in ["list","array"]:
        ele = []
        req_var = {x:None for x in re.findall(r'(?<=(?<!\{)\{)[^{}]*(?=\}(?!\}))', cond["value"])}
        if "distinct" in cond:
            req_lst = []
            pro = 1
            for i in req_var:
                tmp = get_values(copy.deepcopy(input_for["variables"][i]))
                pro*= len(tmp)
                req_lst.append(tmp)
            # print(req_lst)
            indices = sample(pro,int(cond["length"]))
            if "order" in cond:
                if cond["order"]=="increasing":
                    indices.sort()
                elif cond["order"]=="decreasing":
                    indices.sort(reverse=True)
            for ind in indices:
                idx = product_nth(req_lst,ind)
                for j,i in enumerate(req_var):
                    req_var[i]= idx[j]
                ele.append(cond["value"].format(**req_var))
        else:
            f_arr = []
            for _ in range(int(cond["length"])):
                tmp_arr = []
                for i in req_var:
                    tmp_arr.append(create_var(copy.deepcopy(input_for["variables"][i]),True))
                f_arr.append(tmp_arr)
            if "order" in cond:
                if cond["order"]=="increasing":
                    f_arr.sort()
                elif cond["order"]=="decreasing":
                    f_arr.sort(reverse=True)
            for k in range(int(cond["length"])):
                for i,j in enumerate(req_var):
                    req_var[j] = str(f_arr[k][i])
                ele.append(cond["value"].format(**req_var))
        ele = ''.join(ele)
    # elif cond["type"] in ["tree"]:
    #     arr = [i for i in range(1,int(cond["length"])+1)]
    #     random.shuffle(arr)
    #     if "root" in cond:
    #         tmp = arr.index(int(cond["root"]))
    #         arr[0] , arr[tmp] = arr[tmp] , arr[0]
        
    #     i = 0
    #     while(i<len(arr)):
                        
        
    # elif cond["type"] in ["graph"]:
    #     cond["nodes"] = int(cond["nodes"])
    #     cond["directed"] = 

        
    
    if original:
        return ele
    return str(ele)



def yield_input(times):
    global var
    if(doc.get('input-creator-file','')!=''):
        for _ in range(times):
            out = subprocess.check_output(doc['input-creator-file'],shell=True).decode('utf-8')
            yield out
        return

    for _ in range(times):
        checker = False
        while(checker==False):
            if "testcases" in input_for:
                if '-' in str(input_for["testcases"]):
                    lower_limit,upper_limit = input_for["testcases"].split('-')
                    lower_limit = int(lower_limit)
                    upper_limit = int(upper_limit)
                    testcases = randint(lower_limit,upper_limit)
                else:    
                    testcases = int(input_for["testcases"])
                ret = str(testcases)+'\n'
            else:
                testcases = 1
                ret = ""

            for _ in range(testcases):
                for i in var:
                    if "part" not in input_for["variables"][i]:
                        var[i] = create_var(copy.deepcopy(input_for["variables"][i]))
                ret += input_for["structure"].format(**var)
            
            checker = True
            if input_for.get("input-checker-file",'')!='':
                    check_out = subprocess.check_output(input_for["input-checker-file"], input = str.encode(ret),shell=True).decode('utf-8')
                    if int(check_out)==0:
                        checker = False           
        yield ret


for inp in yield_input(times):
    if "files" not in doc:
        print(inp)
        if input("Continue?").lower() == 'n':
            break
    else:
        if "brute" in doc["files"]:
            try:
                f1_out = subprocess.check_output(brute, input = str.encode(inp),shell=True).decode('utf-8')
                f2_out = subprocess.check_output(code, input = str.encode(inp),shell=True).decode('utf-8')
            except:
                print("!! ERROR OCCURED !!")
                print(inp)
                break
            if(f1_out.strip()!=f2_out.strip()):
                print("!! WRONG ANSWER !!")
                print(inp)    
                print("Brute : ")
                print(f1_out)
                print("Code : ")
                print(f2_out)
                if input("Continue or not (y/n)").lower() == 'n':
                    break
            print("!! CORRECT !!")
        else:
            try:
                f2_out = subprocess.check_output(code, input = str.encode(inp),shell=True).decode('utf-8')
            except:
                print("!! ERROR OCCURED !!")
                print(inp)
                break
            print("INPUT :")
            print(inp)
            print("OUTPUT :")
            print(f2_out)
            if input("Continue(Y/N)?").lower() == 'n' :
                break
