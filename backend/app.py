from flask import Flask , jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

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
def get_shop_list():
	category = request.args.get("category")
	country = request.args.get("country")
	region = request.args.get("region")

	# Insert to mongoDB
	db=client.shops_around_me
	return_col = {"shopName":1,"address":1,"phone":1}

	if category and country and region:
		query = {{"location":
					{
						"country": country,
						"region": region
					},
						"category":category}}
		result = list(db.shops.find(query, return_col))
	else:
		result = list(db.shops.find({},return_col))

	for index, content in enumerate(result):
		result[index]["_id"] = str(content["_id"])

	return jsonify(result)
	# start here

@app.route("/api/shops/<string:shop_id>")
def get_shop(shop_id, methods=["GET"]):
	db = client.shops_around_me
	query = db.shops.find_one({"_id":ObjectId(shop_id)})
	query["_id"] = str(query["_id"])
	return jsonify(query)


@app.route("/api/<string:shopId>/createComment")
def create_comment(shop_id):
	

@app.route("/api/createShop",methods = ["POST"])
def create_shop():

	data = request.get_json()
	shopName = data.get("shopName")

	contractAddress = data.get("contractAddress")

	category = data.get("category")

	country = data.get("country")

	region = data.get("region")

	address = data.get("address")

	description = data.get("description")

	phone = data.get("phone")

	newShop = {
		"shopName": shopName,
		"contractAddress": contractAddress,
		"category": category,
		"country": country,
		"region": region,
		"address": address,
		"phone": phone,
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
