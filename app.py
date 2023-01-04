from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, jsonify
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
    submit_count = session.get('submit_count', 0)
    highscore = session.get('highest_score', 0)
    return render_template('index.html', board=board, highscore=highscore, submit_count=submit_count)


@app.route('/validate-guess')
def validate_guess():
    guess = request.args["guess"]
    board = session['board']
    validate_result = boggle_game.check_valid_word(board, guess)
    return jsonify({guess: validate_result})


@app.route('/score-and-submission-times', methods=['POST'])
def score_and_submission():
    # increment the session['submit_count']
    # return session['submit_count']
    # send the highest score back to the front-end

    # access the current score from front-end
    score = request.json["score"]

    # access the current submit_count again and update/increment it in session
    submit_count = session.get('submit_count', 0)
    session['submit_count'] = submit_count + 1

    # access the highest score from sessionm, compare with current score, and store the latest highest score in session
    highscore = session.get('highest_score', 0)
    session['highest_score'] = max(score, highscore)

    # import pdb
    # pdb.set_trace()
    # use brokeRecord to represent the True/False in order to access it in the front-end
    return jsonify(brokeRecord=score > highscore)
