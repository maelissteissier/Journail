from datetime import datetime
from journail_api.database.database import db, Weight
from flask import Blueprint, request, jsonify, abort

weight_bp = Blueprint('weight', __name__)


# GET method to retrieve a single weight record by ID
@weight_bp.route('/api/weight/<int:weight_id>', methods=['GET'])
def get_weight(weight_id):
    weight = Weight.query.get(weight_id)
    if weight is None:
        abort(404)
    return jsonify(weight.to_json())


# GET method to retrieve all weight records
@weight_bp.route('/api/weight', methods=['GET'])
def get_all_weights():
    weights = Weight.query.all()
    weight_list = [weight.to_json() for weight in weights]
    return jsonify(weight_list)


# PUT method to update an existing weight record by ID
@weight_bp.route('/api/weight/<int:weight_id>', methods=['PUT'])
def put_weight(weight_id):
    if not request.json:
        abort(400)

    data = request.json
    weight = Weight.query.get(weight_id)
    if weight is None:
        abort(404)
    if data.get('unit', "").upper() != "LBS" and data.get('unit', "").upper() != "KG":
        return jsonify({"errors": "The unit should be LBS or KG (case insensitive)"})

    weight.weight = data.get('weight', weight.weight)
    weight.unit = data.get('unit', weight.unit)
    weight.date = datetime.today()

    db.session.commit()
    return jsonify(weight.to_json())


# POST method to create a new weight record
@weight_bp.route('/api/weight', methods=['POST'])
def post_weight():
    if not request.json:
        abort(400)

    data = request.json
    if data.get('unit', "").upper() != "LBS" and data.get('unit', "").upper() != "KG":
        return jsonify({"errors": "The unit should be LBS or KG (case insensitive)"})

    weight = Weight(weight=data.get('weight'), unit=data.get('unit'), date=datetime.today())

    db.session.add(weight)
    db.session.commit()
    return jsonify(weight.to_json()), 201