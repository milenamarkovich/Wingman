from flask import Flask, jsonify, request, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_marshmallow import Marshmallow
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import json
import requests
import time

app = Flask(__name__, template_folder="components")

app.secret_key = 'your secret key'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/user_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(100))
    configs = db.relationship('Configurations', backref='user')

    def __init__(self, name, password, configs):
        self.name = name
        self.password = password
        self.configs = configs

class Configurations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    yaw = db.Column(db.types.Float(precision=1,asdecimal=True))
    pitch = db.Column(db.types.Float(precision=1,asdecimal=True))
    velocity = db.Column(db.types.Float(precision=1,asdecimal=True))
    title = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, yaw, pitch, velocity, title, user_id):
        self.title = title
        self.yaw = yaw
        self.pitch = pitch
        self.velocity = velocity
        self.user_id = user_id

class ConfigurationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'yaw', 'pitch', 'velocity')

class UserSchema(ma.Schema):
    class Meta:
        fields = ('username', 'password')

config_schema = ConfigurationSchema()
configs_schema = ConfigurationSchema(many=True)
user_schema = UserSchema()

@app.route('/')
@app.route('/login', methods =['GET', 'POST'])
def login():

    username = request.json['username']
    password = request.json['password']

    msg = ''
    print(request.json['username'], request.json['password'])
    if request.method == 'POST':
        cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = % s AND password = % s', (username, password, ))
        account = cursor.fetchone()
        if account:
            print("in)")
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            msg = 'Logged in successfully !'
            print(msg)
            user = User(username, password)
            response = user_schema.dump(user)
            return response
        else:
            msg = 'Incorrect username / password !'
    user = User(username, password)
    response = user_schema.dump(user)
    return response
 
@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))
 
@app.route('/register', methods =['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form :
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
        account = cursor.fetchone()
        if account:
            msg = 'Account already exists !'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address !'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers !'
        elif not username or not password or not email:
            msg = 'Please fill out the form !'
        else:
            cursor.execute('INSERT INTO accounts VALUES (NULL, % s, % s, % s)', (username, password, email, ))
            db.connection.commit()
            msg = 'You have successfully registered !'
    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('Register.js', msg = msg)

@app.route('/get', methods = ['GET'])
def get_config():
    all_configs = User.configs.query.all()
    results = configs_schema.dump(all_configs)
    return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def post_details(id):
    config = User.configs.query.get(id) 
    return config_schema.jsonify(config)

@app.route('/add', methods = ['POST'])
def add_config():
    title = request.json['title']
    yaw = request.json['yaw']
    pitch = request.json['pitch']
    velocity = request.json['velocity']

    config = User.configs(yaw, pitch, velocity, title)
    
    db.session.add(config)
    db.session.commit()
    response = config_schema.dump(config)
    
    print(response)
    return response
    

@app.route('/update/<id>/', methods = ['PUT'])
def update_config(id):
    config = User.configs.query.get(id)

    title = request.json['title']
    yaw = request.json['yaw']
    pitch = request.json['pitch']
    velocity = request.json['velocity']

    config.title = title
    config.yaw = yaw
    config.pitch = pitch
    config.velocity = velocity

    db.session.commit()
    return config_schema.jsonify(config)

@app.route('/delete/<id>/', methods = ['DELETE'])
def config_delete(id):
    config = User.configs.query.get(id)
    db.session.delete(config)
    db.session.commit()

    return config_schema.jsonify(config)

@app.route('/launch/<id>/', methods = ['GET'])
def launch(id):
    #--------------USE CLIENT_TEST.PY IN RPI CODE----------------#
    #config = config_schema.jsonify(Configurations.query.get(id))
    #print("config: ", config)

    #response = requests.get("http://10.43.169.33:5001/launch/" + str(id))
    response = requests.get("http://10.0.0.224:5001/launch/" + str(id))
    
    return config_schema.jsonify(response)

    '''# Create a TCP/IP socket
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to the port
    server_address = ('10.43.216.33', 10000)
    print('Starting up on {} port {}'.format(*server_address))
    s.bind(server_address)

    # Listen for incoming connections
    s.listen(1)

    #message = json.dumps({'id': 1, 'title': 'hello'})

    message = requests.get('http://10.43.216.33:5000/get/' + str(id))
    response = json.loads(message.text)

    data = json.dumps(response)

    while True:
        # Wait for a connection
        print('waiting for a connection')
        print(id)
        connection, client_address = s.accept()
        try:
            print('connection from', client_address)
            connection.send(bytes(data, encoding="utf-8"))

            data = connection.recv(1024)
            print('received {!r}'.format(data))
            
            if data != None:
                print('sending data back to the client')
                connection.sendall(data)
            else:
                print('no data from', client_address)
                break

        finally:
            # Clean up the connection
            print("Closing current connection")
            connection.close()
            s.close()'''
    
    
if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = 5000)

