from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


boggle_game = Boggle()


@app.route('/')
def set_board():
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('index.html', board=board)


@app.route('/validate-guess', methods=['POST'])
def validate_guess():
    guess = request.form['user_guess_word']
    return render_template('output.html', guess=guess)

# js
# write a handler in app.js for users to submit the form
# read the form and find out what's the user input
# call "validate-guess" and send in user input
# await axios.get('/check-guess', { params: { guess: guess }});
