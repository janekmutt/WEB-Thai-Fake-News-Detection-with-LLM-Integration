from flask import Flask

app = Flask(__name__)

if __name__=="__main__":
    app.run(debug=True)

#Member API route
@app.route("/members")
def member():
    return {"members": ["member1","member2","member3"]}

if __name__ == "__main__":
    app.run(debug=True)