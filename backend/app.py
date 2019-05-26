from flask import Flask , jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

import json
import datetime

from constants.authInfo import mongoDB_Auth
print(mongoDB_Auth)

## mongoDB
## Modify the auth token
client = MongoClient(mongoDB_Auth)

app = Flask(__name__)
CORS(app)

@app.route("/", methods = ["GET"])
def get_ui():
	db=client.admin
	serverStatusResult=db.command("serverStatus")
	return str(serverStatusResult)

@app.route("/api/shops", methods = ["GET"])
def getShopsFromDB():
	category = request.args.get("category")
	country = request.args.get("country")
	city = request.args.get("city")

	# Insert to mongoDB
	db=client.shops_around_me
	if category and country and city:
		query = list(db.shops.find({"location":{"country":country,"city":city},"tag":category}))
	else:
		query = list(db.shops.find())

	for index,content in enumerate(query):
		query[index]["_id"] = str(content["_id"])

	return jsonify(query)
	# start here

@app.route("/api/createShop",methods = ["POST"])
def createShop():

	data = request.get_json()
	shopName = data.get("shopName")

	contractAddress = data.get("contractAddress")

	category = data.get("category")

	country = data.get("country")

	city = data.get("city")

	description = data.get("description")

	newShop = {
		"shopName": shopName,
		"contractAddress": contractAddress,
		"category": category,
		"country": country,
		"city": city,
		"description": description
	}

	print("{} is added to database".format(shopName))
	db = client.shops_around_me
	db.shops.insert(newShop)

	response_object = {"status":"Success"}
	return jsonify(response_object)

if __name__ == '__main__':
	from argparse import ArgumentParser
	parser = ArgumentParser()
	parser.add_argument("-p", "--port", type = int, default = 5003)
	args = parser.parse_args()
	port = args.port
	app.run(host = "127.0.0.1", port = port)
