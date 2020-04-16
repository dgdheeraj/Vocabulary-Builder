from flask import Flask, request, abort, render_template,jsonify, Response
from flask_cors import CORS, cross_origin
import sqlite3
import requests
import random
import re
import datetime
import hashlib
import json
pword_pat = re.compile('^[a-fA-F0-9]{40}$')

app = Flask(__name__)
CORS(app, support_credentials=True)

total_ques = 13160

# APIs for Login and Reigster-----------------------------------------
@app.route('/api/register', methods=['PUT'])
@cross_origin(supports_credentials=True)
def add_user():
    print('gfdgdf')
    data = request.get_json()
    uname = data['username']
    pword = data['password']
    name = data['name']
    email = data['email']    

    query = {"table":"Users","columns":["uname"] ,"where":"1"}

    uname_list = requests.post(url='http://127.0.0.1:5000/api/v1/db/read',json=query)
    valid=1
    
    print("9th api called . . .")
    
    uname_list=uname_list.json()

    print(uname_list)
    
    for x in uname_list["uname"]:
        if(uname==x):
            print("duplicate")
            valid=0
            break

    if(valid):
        pword = hashlib.sha256(pword.encode('utf-8')).hexdigest()
        sql_add = {"insert":[uname,pword,name,email],"table":"Users","columns":["uname","pwd","name","email"],"isDelete":"False"}
        requests.post(url='http://127.0.0.1:5000/api/v1/db/write',json=sql_add)
        return "1"
    else:
        #invalid uname
        return "0"
        
@app.route('/api/validate', methods=['POST'])
@cross_origin(supports_credentials=True)
def validate():
    data = request.get_json()
    uname = data["uname"]
    pword = data["pword"]
    pword = hashlib.sha256(pword.encode('utf-8')).hexdigest()
    query1 = {"table":"Users","columns":["uname"] ,"where":"1"}
    uname_list = requests.post(url='http://127.0.0.1:5000/api/v1/db/read',json=query1)
    
    valid=0
    uname_list=uname_list.json()
    for x in uname_list["uname"]:
        if(uname==x):
            #print("duplicate")
            valid=1
            break

    if(valid==1):
        #check password
        #print("Password is :"+pword)

        whereCond = "uname = '"+uname+"'"
        query2 = {"table":"Users","columns":["pwd"] ,"where":whereCond}
        actual_pword = requests.post(url='http://127.0.0.1:5000/api/v1/db/read',json=query2)
        actual_pword=actual_pword.json()
        print(actual_pword['pwd'] )
        if pword == actual_pword["pwd"][0]:
            #valid password
            return "0"
        else:
            return "2"
    else:
        #invalid uname
        return "1"

@app.route('/api/details/<username>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_details(username):
    whereCond = "uname = '"+str(username)+"'"

    query = {"table":"users", "columns":["uname", "name", "email"], "where":whereCond}

    data = requests.post(url='http://127.0.0.1:5000/api/v1/db/read',json=query)
    data=data.json()
    response_msg = {}
    response_msg["uname"] = data["uname"][0]
    response_msg["name"] = data["name"][0]
    response_msg["email"] = data["email"][0]

    return jsonify(response_msg)

# Quiz APIs ---------------------------------------------------------------------------
@app.route('/api/quiz', methods=['POST'])
@cross_origin(supports_credentials=True)
def send_quiz():
    num = request.get_data()
    num = num.decode('utf-8')
    num = json.loads(num)
    num = int(num['ques'])
    global total_ques

    response_msg = {}

    q_ids = random.sample(range(1,total_ques),(num*4))
    print(q_ids)
    #generate #num*4 unique random numbers between 0 to total_ques in that 1 will be ques other 3 will be options : for 1 ques : 4 unique random nums generated
    #for eachrandom num generated get that ques, 4 possible answers

    for x in range(1,len(q_ids),3):
        #read database for word with word_id=x
        whereCond = "word_id = "+str(q_ids[x])
        query1 = {"table":"vocab", "columns":["word","meaning"], "where":whereCond}

        #get its data into variable data
        data = requests.post(url='http://127.0.0.1:5000/api/v1/db/read',json=query1) 
        print(data)
        data = data.json()
        opt_list = [1,2,3,4]
        random.shuffle(opt_list)
        q_dict = {}
        possibilities = {}
        q_dict["text"] = data["meaning"][0]
        possibilities[opt_list[0]] = data["word"][0]

        #read db for word with word_id = x+1, x+2, x+3
        #put them in possibilities along with word with word_id = x
        for i in range(1,4):
            #get word for word_id = x+i into variable word_data
            whereCond = "word_id = "+str(x+i)
            query2 = {"table":"vocab", "columns":["word"], "where":whereCond}
            word_data = requests.post(url='http://127.0.0.1:5000/api/v1/db/read',json=query2)
            word_data = word_data.json()
            possibilities[opt_list[i]] = word_data["word"][0]

        q_dict["possibilities"] = possibilities
        q_dict["selected"] = 'NULL'
        q_dict["correct"] = 'NULL'

        response_msg[q_ids[x]] = q_dict
        
    return jsonify(response_msg)

@app.route('/api/quiz/answers', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_answer():
    q_id = request.get_data()
    q_id = q_id.decode('utf-8')
    q_id = json.loads(q_id)
    q_id = q_id['q_id']
    #get info about word with word_id = q_id into variable data
    whereCond = "word_id = "+str(q_id)
    query = {"table":"vocab", "columns":["word","usage1","usage2"], "where":whereCond}

    data = requests.post(url='http://127.0.0.1:5000/api/v1/db/read',json=query)
    data = data.json()
    response_msg = {}
    response_msg["q_id"] = q_id
    response_msg["ans"] = data["word"][0]
    response_msg["usage1"] = data["usage1"][0]
    response_msg["usage2"] = data["usage2"][0]
    return jsonify(response_msg)


# Sending Images for Multi Stage Download--------------------------------------------------
from flask import send_file
@app.route('/img/<id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def serve_pil_image(id):
    if(id=='1'):
        return send_file("learn.png", mimetype='image/png') 
    elif(id=='2'):
        return send_file("quiz.png", mimetype='image/png') 
    elif(id=='3'):
        return send_file("leader.png", mimetype='image/png') 
     


#DB API---------------------------------------------------------------------------------------
@app.route('/api/v1/db/write',methods=["POST"])
@cross_origin(supports_credentials=True)
def addToDB():
    result={}
    result['status']=200
    try:
        cxn=sqlite3.connect('vocab.db')
        cursor=cxn.cursor()
        cursor.execute('PRAGMA foreign_keys = ON')
    except Exception as e:
        cxn.close()
        result['status']=400
        print(e)
        return result
    cxn.commit()
    data=request.get_json()
    print(data)
    
    isDelete=data['isDelete']
    
    
    sqlQuery=""
    print(isDelete)
    tableName=data['table']
    insertData=data['insert']
    columns=data['columns']
    
    if isDelete=="True":
        print("ELSE")
        sqlQuery='DELETE FROM '+tableName+ ' WHERE '+columns[0]+'="'+insertData[0]+'"'
        print(sqlQuery)
    else:
        print("HI")
        sqlQuery='INSERT INTO '+tableName + ' ('
        for i in columns:
            sqlQuery=sqlQuery+i+','
        sqlQuery=sqlQuery[0:-1]
        sqlQuery=sqlQuery+') VALUES('

        for i in insertData:
            sqlQuery+='"'+i+'"'+','
        sqlQuery=sqlQuery[0:-1]
        sqlQuery+=')'
        print("\n\n"+sqlQuery)
    
    
    try:
        cursor.execute(sqlQuery)
        cxn.commit()
    except Exception as e:
        print("sql write error:",e)
        cxn.close()
        result['status']=400
        print(e)
        return result
    cxn.close()
    print(result)
    return jsonify(result)


#9th api
@app.route('/api/v1/db/read',methods=["POST"])
@cross_origin(supports_credentials=True)
def readDB():
    print("reading DB. . .")
    result={}

    try:
        cxn=sqlite3.connect('vocab.db')
        cursor=cxn.cursor()
        cursor.execute('PRAGMA foreign_keys = ON')
        print("Connected")
        
    except Exception as e:
        cxn.close()
        result['status']=400
        print(result)
        return jsonify(result)


    cxn.commit()
    data = request.get_json()
    print(data)

    sqlQuery=""
    tableName=data['table']
    whereClause=data['where']
    columns=data['columns']
    
    
    print("HI")
    sqlQuery='SELECT '
    for i in columns:
        sqlQuery+=i+','
    sqlQuery=sqlQuery[0:-1]
    sqlQuery+=' FROM '+tableName + ' WHERE '+whereClause
    
    print(sqlQuery)
    
    try:
        print("abc2")
        cursor.execute(sqlQuery)
        print("abc23")
        rows = cursor.fetchall()
        print("abc24")
 

        result["count"]=len(rows)
        result["status"]=200
        k=-1
        for i in columns:
            result[i]=[]
            k+=1
            for data in rows:
                result[i].append(data[k])
        
        cxn.commit()
    except Exception as e:
        print("abc")
        cxn.close()
        print(e)
        result['status']=400
        print(result)
        return result
    cxn.close()
    print(result)
    return jsonify(result)


if __name__ == '__main__':
    app.debug=True
    app.run()