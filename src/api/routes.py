"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required
import app 


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# @api.route('/login', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def Signup():
     data = request.json
     respuesta = app.Signup(data)

     print("respuesta desde app", respuesta)
     return jsonify(respuesta),200


@api.route('/login', methods=['POST'])
def Login1():
     data = request.json
     print("Data dentro de Login1",data)
     respuesta = app.Login(data)
     print(respuesta)
     return jsonify(respuesta),201

@api.route('/private/<int:id>', methods=['GET'])
# @jwt_required()
def Private1(id):
    valor = app.Private(id)
    return jsonify(
        {
            "usuario":{
                "email" : valor.email,
                "password" : valor.password,
                "is_active" : valor.is_active,
            }
        }
    ),200
