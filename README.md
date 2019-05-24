# Numerical Assessment Flask App

## Overview

The project was to create a numerical assessment test from printed PDF materials I purchased from Assessment Day a few years ago. This project is for personal use, for the purposes of reference and learning and therefore any material from Assessment Day will not be included so as to comply with their restrictions of sharing content. However, screenshots can be seen below to get a feel for the end result - with questions omitted. The project:

* Creates a single page template; question, timer, answer radios, and submit
* Updates that page by sending AJAX requests to the server
* The server then interrogates a SQLite database 
* The database returns question, multiple choices, and correct answer
* If user submits correct answer, a counter is incremented using JavaScript to keep score
* At the end, the user is given results and %, alongside which questions they got wrong

A demo video (30 seconds) of functionality can be found [here](https://www.youtube.com/watch?v=0E8LegbfDGQ).

## Tools used

* SQLite3
* HTML5, CSS3 and Bootstrap4
* JavaScript and jQuery
* Python3
* Flask and Jinja2
* VS Code

## Skills applied

* Creating a single page application which reacts dynamically
* Sending and receiving AJAX HTTP requests and JSON data
* DOM manipulation using jQuery
* Database construction using SQLite

## Challenges

* Ensuring database is correctly storing data in proper format
* Deciding whether to process answer validation front-end or back-end
* Data input - the PDF was SECURED therefore data entry was time-consuming (should investigate better options, OCR?)