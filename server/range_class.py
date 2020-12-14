import random
import re

class allrange:
    def __init__(self, string, var_type=None ):
        self.length = 0
        self.var_type = var_type
            
        string = str(string)
        value = string.split(",")
        if value.count('')==2:
            value.append(',')
        value = [i for i in value if i!='']

        self.data = []
        for v in value:
            if "-"==v:
                self.data.append(v)
                self.length+=1
            elif "-" in v and v.rfind('-')!=0:
                if v.count("-")==1:
                    lower_bound,upper_bound = v.split("-")
                else:
                    (ind,_) = re.search(r"\d(-)",v).span(1)
                    lower_bound = v[:ind]
                    upper_bound = v[ind+1:]

                if var_type == str:
                    if lower_bound.isdigit() or (len(lower_bound)>1 and lower_bound[0]=='-' and lower_bound[1:].isdigit()):
                        self.data.append([range(int(lower_bound),int(upper_bound)+1),str])
                        self.length += int(upper_bound) - int(lower_bound) + 1
                    else:
                        self.data.append([range(ord(lower_bound),ord(upper_bound)+1),chr])
                        self.length += ord(upper_bound) - ord(lower_bound) + 1
                elif var_type == int:
                    self.data.append([range(int(lower_bound),int(upper_bound)+1),int])
                    self.length += int(upper_bound) - int(lower_bound) + 1

            else:
                self.data.append(var_type(v))
                self.length+=1
        # print(self.data)

    def __len__(self):
        return self.length
    
    def __getitem__(self,key):
        for d in self.data:
            if type(d) == list:
                if key < d[0][-1] - d[0][0] + 1:
                    return d[1](d[0][key])
                key -= d[0][-1] - d[0][0] + 1
            else:
                if key == 0:
                    return d
                key-=1
        raise Exception("Key out of range")
    
    def get_lower_random(self,k):
        new_data = []
        new_data_length = 0
        for d in self.data:
            if type(d) == list:
                if d[0][0] > k:
                    break
                elif d[0][-1] <=k:
                    new_data.append(d)
                    new_data_length += d[0][-1] - d[0][0] + 1
                else:
                    new_data.append([range(d[0][0],k+1),d[1]])
                    new_data_length += k - d[0][0] + 1
            else:
                if d<=k:
                    new_data.append(d)
                    new_data_length+=1
                else:
                    break
        
        if len(new_data)==0:
            raise Exception("No suitable length found for unique values")
        # print(new_data)
        ind = random.randint(0,new_data_length-1)
        for d in new_data:
            if type(d) == list:
                if ind < d[0][-1] - d[0][0] + 1:
                    return d[1](d[0][ind])
                ind -= d[0][-1] - d[0][0] + 1
            else:
                if ind == 0:
                    return d
                ind-=1


    def random(self,k=None):
        values=[]
        if k==None:
            tk = 1
        else:
            tk = k
        for _ in range(tk):
            values.append(self[random.randint(0,self.length-1)])
        if k==None:
            return values[0]
        else :
            return values
