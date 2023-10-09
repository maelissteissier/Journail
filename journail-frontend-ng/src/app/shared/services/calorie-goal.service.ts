import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CalorieGoal} from "../models/calorie-goal";

@Injectable({
    providedIn: 'root'
})
export class CalorieGoalService {
    apiURL: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

     saveCalorieGoal(calorieGoal: CalorieGoal) {
        return this.http.post(`${this.apiURL}/api/calorie-goal`, calorieGoal);
    }

    fetchLastCalorieGoal(){
        return this.http.get(`${this.apiURL}/api/calorie-goal/latest`)

    }
}
