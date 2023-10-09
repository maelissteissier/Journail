from flask import Blueprint, jsonify, request, abort
from sqlalchemy import desc
from journail_api.database.database import db, CalorieGoal
from datetime import datetime

calorieGoal_bp = Blueprint('CalorieGoal', __name__)


@calorieGoal_bp.route('/api/calorie-goal/latest', methods=['GET'])
def get_latest_calorie_goal():
    # Latest calorie goal from db
    latest_goal = CalorieGoal.query.order_by(desc(CalorieGoal.date)).first()

    if latest_goal:
        return jsonify({
            'id': latest_goal.id,
            'calorie_goal': latest_goal.calorie_goal,
            'date': latest_goal.date.strftime("%Y-%m-%dT%H:%M:%SZ")
        })
    else:
        return jsonify({'error': 'no calorie goal found'}), 404


# CREATE new calorie Goal
@calorieGoal_bp.route('/api/calorie-goal', methods=['POST'])
def post_calorie_goal():
    if not request.json:
        abort(400)

    data = request.json

    if data.get("calorie_goal", None) is None:
        return jsonify({"error": "Should be a calorie_goal in object"}), 400

    calorie_goal = CalorieGoal(calorie_goal=data["calorie_goal"],
                               date=datetime.today())

    db.session.add(calorie_goal)
    db.session.commit()

    return jsonify(calorie_goal.to_json()), 201



