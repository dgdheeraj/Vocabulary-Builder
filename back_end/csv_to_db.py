import csv, sqlite3

con = sqlite3.connect("vocab.db")
cur = con.cursor()
# cur.execute("CREATE TABLE vocab (word_id INTEGER PRIMARY KEY, word NVARCHAR(30) NOT NULL, meaning NVARCHAR(100) NOT NULL, usage1 NVARCHAR(200), usage2 NVARCHAR(200));") # use your column names here
# cur.execute("CREATE TABLE Users (uname VARCHAR(30) PRIMARY KEY, pwd NVARCHAR(30) NOT NULL, name NVARCHAR(100) NOT NULL, email NVARCHAR(200));") 
# cur.execute("SELECT uname,name,email FROM users WHERE uname = 'dgdheeraj'")
# rows = cur.fetchall()
# print(rows)
# cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
cur.execute("SELECT * from Users;")
print(cur.fetchall())

# with open('vocab.csv','r', encoding='utf8') as fin: # `with` statement available in 2.5+
#     # csv.DictReader uses first line in file for column headings by default
#     dr = csv.DictReader(fin) # comma is default delimiter
#     dr = csv.DictReader(fin)
#     to_db = []
#     count = 1
#     for i in dr:
#     	tuple_added = (count, i['Word'], i['Meaning'], i['Examples0'], i['Examples1'])
#     	to_db.append(tuple_added)
#     	count+=1
# cur.executemany("INSERT INTO vocab (word_id, word, meaning, usage1, usage2) VALUES (?, ?, ?, ?, ?);", to_db)
# con.commit()
# con.close()
