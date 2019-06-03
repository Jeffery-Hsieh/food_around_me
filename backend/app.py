from flask import Flask , jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from web3 import Web3

import json
import datetime

# interface of contract
from constants.contracts.Shop import abi as shop_abi

# connect to mondoDB
from constants.authInfo import mongoDB_Auth
print(mongoDB_Auth)

## mongoDB
client = MongoClient(mongoDB_Auth)

app = Flask(__name__)
CORS(app)

@app.route("/", methods = ["GET"])
def get_ui():
	db=client.admin
	serverStatusResult=db.command("serverStatus")
	return str(serverStatusResult)

@app.route("/api/createShop", methods = ["POST"])
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

	comments = []

	newShop = {
		"shopName": shopName,
		"contractAddress": contractAddress,
		"category": category,
		"country": country,
		"region": region,
		"address": address,
		"phone": phone,
		"description": description,
		"comments": comments
	}

	print("{} is added to database".format(shopName))
	db = client.shops_around_me
	db.shops.insert(newShop)

	response_object = {"status":"Success"}
	return jsonify(response_object)

@app.route("/api/createComment", methods = ["POST"])
def create_comment():
	data = request.get_json()

	contractAddress	= data.get("contractAddress")

	description = data.get("description")

	commentId = data.get("commentId")

	author = data.get("author")


	insert_data = {
		"id": commentId,
		"author": author,
		"description": description,
		"viewPrice": 0
	}

	db = client.shops_around_me
	db.shops.update({"contractAddress":contractAddress},{"$push":{"comments":insert_data}})
	print("{} added one comment".format(contractAddress))

	response_object = {"status":"Success"}
	return jsonify(response_object)

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

@app.route("/api/shops/<string:shop_id>", methods=["GET"])
def get_shop_detail(shop_id):
	# initailize web3
	db = client.shops_around_me
	query = db.shops.find_one({"_id":ObjectId(shop_id)})
	comments = query.pop("comments")

	web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

	shopContract = web3.eth.contract(address=query["contractAddress"], abi=shop_abi)
	votePrice = shopContract.functions.votePrice().call()
	createCommentPrice = shopContract.functions.createCommentPrice().call()

	commentUnAccepted = []
	commentAccepted = []

	for comment in comments:
		if comment["viewPrice"] == 0:
			commentUnAccepted.append(comment)
		else:
			commentAccepted.append(comment)

	query["_id"] = str(query["_id"])
	result = dict({
				"votePrice":votePrice,
				"createCommentPrice":createCommentPrice,
				"commentUnAccepted":commentUnAccepted,
				"commentAccepted":commentAccepted,
				},
				**query)
	print("return {} detail".format(query["shopName"]))
	return jsonify(result)

@app.route("/api/voteComment", methods=["POST"])
def vote_comment():
	db = client.shops_around_me

	data = request.get_json()
	contractAddress = data.get("contractAddress")
	comment_id = data.get("commentId")
	viewPrice = data.get("viewPrice")
	print(viewPrice)

	if viewPrice > 0:
		comment = db.shops.find_one({"contractAddress":contractAddress})["comments"][comment_id]["description"]
		db.shops.update({"contractAddress":contractAddress,"comments.id":comment_id},{"$set":{"comments.$.viewPrice":viewPrice,"comments.$.description":comment[:100]}})
	else:
		print("viewPrice is not correct")

	response_object = {"status":"Success"}
	return jsonify(response_object)



if __name__ == '__main__':
	from argparse import ArgumentParser
	parser = ArgumentParser()
	parser.add_argument("-p", "--port", type = int, default = 5003)
	args = parser.parse_args()
	port = args.port
	app.run(host = "127.0.0.1", port = port)
