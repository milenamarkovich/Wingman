import socket
import json
import requests

s = socket.socket()
HOST, PORT = '10.0.0.179', 12345

s.bind((HOST, PORT))

s.listen(5)

id = 27

message = requests.get('http://10.0.0.179:5000/get/' + str(id))
response = json.loads(message.text)

data = json.dumps(response)

while True:
    c, addr = s.accept()
    print('Got connection from', addr)
    c.send(bytes(data, encoding="utf-8"))
    c.close()