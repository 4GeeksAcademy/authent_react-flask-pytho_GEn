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

@api.route('/signup', methods=['POST'])
def Signup():
     data = request.json
     respuesta = app.Signup(data)
     return jsonify(respuesta),200


@api.route('/login', methods=['POST'])
def Login1():
     data = request.json
     respuesta = app.Login(data)
     return jsonify(respuesta),201

@api.route('/private', methods=['GET'])
@jwt_required()
def Private1():
    valor = app.Private()
    return jsonify(valor),200

