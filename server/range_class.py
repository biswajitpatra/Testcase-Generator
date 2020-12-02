import random

class allrange:
    def __init__(self, string, var=None ):
        self.length = 0
        self.var = var
            
        string == str(string)
        value = string.split(",")
        if value.count('')==2:
            value.append(',')
        value = [i for i in value if i!='']

        self.data = []
        for v in value:
            if "-" in v:
                if "-"==v:
                    self.data.append(v)
                    self.length+=1
                else:
                    lower_bound,upper_bound = v.split("-")
                    if var == str:
                        if lower_bound.isdigit():
                            self.data.append([range(int(lower_bound),int(upper_bound)+1),str])
                            self.length += int(upper_bound) - int(lower_bound) + 1
                        else:
                            self.data.append([range(ord(lower_bound),ord(upper_bound)+1),chr])
                            self.length += ord(upper_bound) - ord(lower_bound) + 1
                    elif var == int:
                        self.data.append([range(int(lower_bound),int(upper_bound)+1),int])
                        self.length += int(upper_bound) - int(lower_bound) + 1
            else:
                self.data.append(var(v))
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

    def random(self,k=1):
        values=[]
        for _ in range(k):
            values.append(self[random.randint(0,self.length-1)])
        if k==1:
            return values[0]
        else :
            return values
