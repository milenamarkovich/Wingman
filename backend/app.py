from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Configurations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    yaw = db.Column(db.Integer())
    delta_x = db.Column(db.Integer())
    delta_y = db.Column(db.Integer())

    def __init__(self, yaw, delta_x, delta_y):
        self.yaw = yaw
        self.delta_x = delta_x
        self.delta_y = delta_y

class ConfigurationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'yaw', 'delta_x', 'delta_y')

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
    yaw = request.json['yaw']
    delta_x = request.json['delta_x']
    delta_y = request.json['delta_y']

    configs = Configurations(yaw, delta_x, delta_y)
    db.session.add(configs)
    db.session.commit()
    return config_schema.jsonify(configs)

@app.route('/update/<id>/', methods = ['PUT'])
def update_config(id):
    config = Configurations.query.get(id)

    yaw = request.json['yaw']
    delta_x = request.json['delta_x']
    delta_y = request.json['delta_y']

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
    app.run(host = '0.0.0.0', port = 5000, debug=True)

