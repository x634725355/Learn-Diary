class valid_bit: # 有效位
    def __init__(self, b, i):
        self.num = 1 # 序号
        self.bit = int(b) # 数值
        self.link = [] # 组成成分, 7 = 4 + 2 + 1

class check_bit: # 校验位
    def __init__(self, i):
        self.num = i # 序号
        self.bit = None # 数值
        self.link = [] # 校验位

def smallest_check_number(k): 
    r = 1
    while 2 ** r - r - 1 < k:
        r += 1 # 得到最小检测位数
    return r

def is_standard(string): 
    return string.count('1') + string.count('0') == len(string)

checkList = [] # 校验list
hammingList = [] # 海明码
hammingList.append(0) # 填补0位, index即下标

string = raw_input("请输入有效位:")

for i in range(1, len(string) + 1): 
    locals()['b' + str(i)] = valid_bit(int(string[i - 1]), i)
    print("第一次循环的字典", locals())
    hammingList.append(locals()['b' + str(i)]) # 先加入b

r = smallest_check_number(len(string)) # 获取校验位

for j in range(1, r + 1):
    locals()['P' + str(j)] = check_bit(j)
    hammingList.insert(2 ** (j - 1), locals()['P' + str(j)])
    checkList.append(2 ** (j - 1)) # 再插入P
    
for i in range(1, len(hammingList)): # i是有效位, j是检测位
    if i in checkList: 
        continue # 跳过 P
    remain = i
    for j in range(len(checkList) - 1, -1, -1): 
        if remain >= checkList[j]:
            remain -= checkList[j]
            hammingList[i].link.append(checkList[j]) # b的link中加入P的位号
        if remain == 0: 
            break
    for j in hammingList[i].link:
        hammingList[j].link.append(i) # P的link中加入b的位号

for j in checkList:
    xor = 0
    for i in hammingList[j].link:
        xor = xor ^ hammingList[i].bit
    hammingList[j].bit = xor

for i in range(1, len(hammingList)):
    if i in checkList: # 检测码
        print(hammingList[i].bit)
    else:
        print(hammingList[i].bit)
