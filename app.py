from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


boggle_game = Boggle()
board = boggle_game.make_board()


@app.route('/')
def set_board():
    session['board'] = board
    return render_template('index.html', board=board)


@app.route('/validate-guess')
def validate_guess():
    guess = request.args["guess"]
    validate_result = boggle_game.check_valid_word(board, guess)
    session['score'] = 0
    if validate_result == 'ok':
        if session['score'] == 0:
            session['score'] = len(guess)
        else:
            session['score'] += len(guess)
    return jsonify({guess: validate_result})


@app.route('/score-and-submission-times')
def score_and_submission():
    request.json()
    import pdb
    pdb.set_trace()
    return None
