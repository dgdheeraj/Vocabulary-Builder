import nltk 
from nltk.corpus import wordnet 
# synonyms = [] 
# antonyms = [] 
  
# for syn in wordnet.synsets("hit"): 
#     for l in syn.lemmas(): 
#         synonyms.append(l.name()) 
#         if l.antonyms(): 
#             antonyms.append(l.antonyms()[0].name()) 
  
# words = ['amazing', 'interesting', 'love', 'great', 'nice']

# for w in words:
#     tmp = wordnet.synsets(w)[0].pos()
#     if tmp=='n':
#         print(w, ":", tmp)

# l=[]
# # print(set(synonyms)) 
# for s in synonyms:
#     try:
#         if(s=='hit'):
#             continue
#         val=(wordnet.wup_similarity(wordnet.synset(s+".v.01"),wordnet.synset("hit.v.01")))
#         if val > 0.2:
#             # print(s,val)
#             l.append(s)
#     except:
#         print("Not a noun or a verb")
# # print(set(antonyms)) 
# print(l)


def gen_syn(w):
    tmp = wordnet.synsets(w)[0].pos()
    
    synonyms=[]
    for syn in wordnet.synsets(w): 
        for l in syn.lemmas(): 
            synonyms.append(l.name()) 
    l=[]
    for s in synonyms:
        try:
            if(s==w):
                continue
            val=(wordnet.wup_similarity(wordnet.synset(s+"."+tmp+".01"),wordnet.synset(w+"."+tmp+".01")))

            if val > 0.2 and len(l)<4:
                # print(s,val)
                l.append(s)
        except:
            pass
            # print("Not a noun or a verb")
    l=set(l)
    l=list(l)
    if(w in l):
        l.remove(w)
    for s in l:
        if s.lower() == w.lower():
            l.remove(s)
    return l

# l=gen_syn("anxious")
# print(l)