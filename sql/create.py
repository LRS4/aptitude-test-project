import sqlite3

# Create a database in RAM
db = sqlite3.connect(':memory:')
# Creates or opens a file called mydb with a SQLite3 DB
db = sqlite3.connect(r"C:\Users\lrspe\Dropbox\Computer Science\numeric_reasoning_app\tests.db")

cursor = db.cursor()

cursor.execute('''CREATE TABLE test_one(id INTEGER PRIMARY KEY AUTOINCREMENT, question VARCHAR(255),
                    question_url VARCHAR(255), feedback_url VARCHAR(255), answer1 VARCHAR(255), 
                    answer2 VARCHAR(255), answer3 VARCHAR(255), answer4 VARCHAR(255), answer5 VARCHAR(255),
                    correct_answer VARCHAR(255))''')

print("Table created")

db.commit()