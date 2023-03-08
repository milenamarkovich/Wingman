from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import logging

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Configurations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    yaw = db.Column(db.types.Float(precision=1,asdecimal=True))
    delta_x = db.Column(db.types.Float(precision=1,asdecimal=True))
    delta_y = db.Column(db.types.Float(precision=1,asdecimal=True))
    title = db.Column(db.String(100))

    def __init__(self, yaw, delta_x, delta_y, title):
        self.title = title
        self.yaw = yaw
        self.delta_x = delta_x
        self.delta_y = delta_y

class ConfigurationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'yaw', 'delta_x', 'delta_y')

config_schema = ConfigurationSchema()
configs_schema = ConfigurationSchema(many=True)

@app.route('/get', methods = ['GET'])
def get_config():
    all_configs = Configurations.query.all()
    results = configs_schema.dump(all_configs)
    return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def post_details(id):
    config = Configurations.query.get(id) 
    return config_schema.jsonify(config)

@app.route('/add', methods = ['POST'])
def add_config():
    title = request.json['title']
    yaw = request.json['yaw']
    delta_x = request.json['delta_x']
    delta_y = request.json['delta_y']

    config = Configurations(yaw, delta_x, delta_y, title)
    
    db.session.add(config)
    db.session.commit()
    response = config_schema.dump(config)
    
    print(response)
    return response
    

@app.route('/update/<id>/', methods = ['PUT'])
def update_config(id):
    config = Configurations.query.get(id)

    title = request.json['title']
    yaw = request.json['yaw']
    delta_x = request.json['delta_x']
    delta_y = request.json['delta_y']

    config.title = title
    config.yaw = yaw
    config.delta_x = delta_x
    config.delta_y = delta_y

    db.session.commit()
    return config_schema.jsonify(config)

@app.route('/delete/<id>/', methods = ['DELETE'])
def config_delete(id):
    config = Configurations.query.get(id)
    db.session.delete(config)
    db.session.commit()

    return config_schema.jsonify(config)

if __name__ == "__main__":
    app.run(host = '10.0.0.179', port = 5000)

