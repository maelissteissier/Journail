from flask import Blueprint, jsonify, request, abort
from journail_api.database.database import db, FoodRef
from journail_api.num_utils import is_number
from journail_api.database.food_ref_service import save_food_ref_from_json

foodref_bp = Blueprint('foodref', __name__)


@foodref_bp.route('/api/foodref', methods=['POST'])
def create_food_ref():
    if not request.json:
        abort(400)

    data = request.get_json()

    saved_food_ref, errs = save_food_ref_from_json(data, db)
    if errs is None:
        return jsonify(saved_food_ref.to_json()), 201
    else:
        return jsonify({'errors': errs}), 400


@foodref_bp.route('/api/foodrefs', methods=['GET'])
def get_all_food_refs():
    try:

        food_refs = FoodRef.query.all()

        food_refs_json = None if food_refs is None else [food_ref.to_json() for food_ref in food_refs]

        return jsonify(food_refs_json), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@foodref_bp.route('/api/foodref/<food_ref_id>', methods=['GET'])
def get_food_ref(food_ref_id):
    try:

        food_ref = FoodRef.query.get(food_ref_id)

        if food_ref is None:
            return jsonify({'error': 'FoodRef not found'}), 404

        food_ref_json = food_ref.to_json()

        return jsonify(food_ref_json), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@foodref_bp.route('/api/foodref/<int:food_ref_id>', methods=['PUT'])
def edit_food_ref(food_ref_id):
    data = request.get_json()

    food_ref = FoodRef.query.get(food_ref_id)

    if not food_ref:
        return jsonify({'error': 'FoodRef not found'}), 404

    if not request.json:
        abort(400)

    food_ref.name = data.get('name')
    food_ref.original_calory = data.get('original_calory')
    food_ref.original_quantity = data.get('original_quantity')
    food_ref.quantity_type = data.get('quantity_type')

    # Ensure fields are integers
    if not is_number(food_ref.original_calory) or not is_number(food_ref.original_quantity):
        return jsonify({'error': 'original_calory or original_quantity not a number'}), 400

    try:
        db.session.commit()

        return jsonify(food_ref.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


