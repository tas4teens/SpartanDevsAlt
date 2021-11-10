# import json
import socket
import json

DATABASE = "database.json"
SERVER_PORT = 8000
SERVER_IP = "localhost"

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((SERVER_IP, SERVER_PORT))
server_socket.listen()

while True:
    client_socket, client_addr = server_socket.accept()
    print(f"[CONNECTION] {client_addr}")
    request = client_socket.recv(1024).decode()
    header = request.split("\n")[0]
    requestedfile = header.split(" ")[1]
    
    if header.split(" ")[0] == "GET":
        if requestedfile == "/":
            requestedfile = "login.html"
        elif requestedfile == "/favicon.ico":
            continue

        with open(requestedfile.replace("/", ""), "r", encoding="utf8") as file:
            try:
                filedata = file.read()
            except:
                print("ran into error line 28")
        response = f"HTTP/1.1 200 OK\n\n{filedata}"

        client_socket.send(response.encode(encoding = "UTF-8"))

    elif header.split(" ")[0] == "POST":
        reqlist = request.split("\n")
        data = reqlist[len(reqlist) - 1]
        signupdatadict = json.loads(data)
        userpass = signupdatadict["data"]
        username, password = userpass[0], userpass[1]
        
        with open(DATABASE, "r") as jsonfile:
            jsonobj = json.load(jsonfile)
            jsonobj[username] = {"password":password}

        with open(DATABASE, "w") as jsonfile:
            json.dump(jsonobj, jsonfile)