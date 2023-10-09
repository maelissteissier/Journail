export class CalorieGoal {
  id?: number;
  calorie_goal: number;
  date?: string;


  constructor(calorie_goal: number, id?: number, date?: string) {
    this.id = id;
    this.calorie_goal = calorie_goal;
    this.date = date;
  }



  static fromJson(json: any): CalorieGoal {
    return new CalorieGoal(
      json.id,
      json.calorie_goal,
      json.date
    );
  }

  toJson(): any {
    return {
      'calorie_goal': this.calorie_goal,
    };
  }
}
