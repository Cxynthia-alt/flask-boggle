from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


boggle_game = Boggle()
board = boggle_game.make_board()
all_scores = set()


@app.route('/')
def set_board():
    session['board'] = board
    session['score'] = 0
    session['submit_count'] = 0
    session['highest_score'] = 0
    return render_template('index.html', board=board)


@app.route('/validate-guess')
def validate_guess():
    guess = request.args["guess"]
    validate_result = boggle_game.check_valid_word(board, guess)
    score_point = session.get('score', 0)
    if validate_result == 'ok':
        if score_point == None:
            session['score'] = len(guess)
        else:
            session['score'] += len(guess)
    all_scores.add(session['score'])
    session['highest_score'] = max(all_scores)
    return jsonify({guess: validate_result, 'highest_score': session['highest_score'], 'score': session['score']})


@ app.route('/score-and-submission-times', methods=['POST'])
def score_and_submission():
    # increment the session['submit_count']
    # return session['submit_count']
    # send the highest score back to the front-end
    session['submit_count'] += 1
    # import pdb
    # pdb.set_trace()
    return str(session['submit_count'])
