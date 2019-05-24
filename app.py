import os
from flask import Flask, flash, jsonify, redirect, render_template, request, session, url_for, g
from flask_session import Session
import sqlite3
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError


# PEP8 Python Validator Tool: http://pep8online.com/

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route("/", methods=['GET'])
def index():
    """Display test to user"""
    return render_template("index.html")


@app.route("/next", methods=['GET'])
def next():
    """Get next question information"""
    next_question_id = request.args.get("q")
    db = sqlite3.connect('tests.db') 
    print("Database connected.")
    c = db.cursor() 
    rows = c.execute('SELECT * FROM test_one WHERE id = ?', [next_question_id]) 
    print("Executing query..")
    row = rows.fetchone() # fetch one row
    db.close()
    print("Database closed.")
    return jsonify(row)
    

if __name__ == '__main__':
    app.run()