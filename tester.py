import random
from random import randint
import os
import subprocess
import yaml
import re
import copy
import tqdm
import itertools
''' 
TODO::::::::::
1. take the yaml file as input
2. graph and tree
3. range modification
4. add external input for any variable
5. remove random
6. tqdm implement 
7. add eval expression in properties
8. add only one file for evaluation
9. characters range a-z A-Z like regex
10. range of length
11. add checker for yaml
12. analyze different probabilities (normal, x^2 , increasing , decreasing)
13. add complexity analysis
'''
doc = yaml.full_load(open('file2.yaml'))

if "preprocess" in doc:
    os.system(doc["preprocess"])
    print("Preprocessing completed.")

if "files" in doc:
    if "brute" in doc["files"]:
        brute = doc["files"]['brute']
    code = doc["files"]['code']

if(doc['input-creator-file']==''):
    input_for = doc["input"]
    times = input_for["times"]
    var = { x:None for x in input_for["variables"]}

# def nrange(value):
    
def product_nth(lists, num):
    res = []
    for a in reversed(lists):
        res.insert(0, a[num % len(a)])
        num //= len(a)
    return res
    

def get_values(cond):
    global var
    cond["type"] = cond["type"].lower()
    for i in cond :     
        if type(cond[i]) == str:
            if ("{}" not in cond[i]) and (i not in ["value","format"]):
                cond[i] = cond[i].format(**var)
    
    if cond["type"] in ["integer","int"]:
        lower_limit,upper_limit = cond["range"].split('-')
        lower_limit = int(lower_limit)
        upper_limit = int(upper_limit)
        return range(lower_limit,upper_limit+1)
    elif cond["type"] in ["string","str"]:
        return list(cond["range"])
    

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

    if cond["type"] in ["integer","int"]:
        if "random" in cond :
            lower_limit,upper_limit = cond["range"].split('-')
            lower_limit = int(lower_limit)
            upper_limit = int(upper_limit)
            ele = randint(lower_limit,upper_limit)
        else :
            ele = int(cond["range"])
    elif cond["type"] in ["string","str"]:
        if "random" in cond :
            ele = ''.join(random.choices(cond["range"],k = int(cond["length"])))
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
            indices = random.sample(range(pro),int(cond["length"]))
            if "order" in cond:
                if cond["order"]=="increasing":
                    indices.sort()
                else:
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
                else:
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
    
    if original:
        return ele
    return str(ele)



def yield_input(times):
    global var
    if(doc['input-creator-file']!=''):
        for _ in range(times):
            out = subprocess.check_output(doc['input-creator-file'],shell=True).decode('utf-8')
            yield out
        return

    for _ in range(times):

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
        
        yield ret


for inp in yield_input(times):
    if "files" not in doc:
        print(inp)
        input("Continue?")
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
