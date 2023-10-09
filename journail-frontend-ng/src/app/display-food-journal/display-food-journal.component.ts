import {Component, OnInit} from '@angular/core';
import {FoodJournalEntryService} from "../shared/services/food-journal-entry.service";
import DateUtils from "../shared/DateUtils";
import {FoodJournalEntry} from "../shared/models/food-journal-entry";
import {faCheck, faChevronLeft, faChevronRight, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-regular-svg-icons"
import {Router} from "@angular/router";
import {Page} from "../shared/models/page";
import {CalorieGoalService} from "../shared/services/calorie-goal.service";
import {CalorieGoal} from "../shared/models/calorie-goal";
import {FormControl, FormGroup} from "@angular/forms";

interface LunchType {
    timeMin: string;
    timeMax: string;
    tag: string;
}

const LUNCH_TYPE: { [key: string]: LunchType } = {
    MORNING: {timeMin: '00:00', timeMax: '11:30', tag: 'Matin'},
    NOON: {timeMin: '11:30', timeMax: '14:30', tag: 'Midi'},
    AFTERNOON: {timeMin: '14:30', timeMax: '17:45', tag: 'Après-midi'},
    EVENING: {timeMin: '17:45', timeMax: '23:59', tag: 'Soir'},
}

@Component({
    selector: 'app-display-food-journal',
    templateUrl: './display-food-journal.component.html',
    styleUrls: ['./display-food-journal.component.scss']
})
export class DisplayFoodJournalComponent implements OnInit {
    constructor(private foodJournalEntryService: FoodJournalEntryService, private calorieGoalService: CalorieGoalService, private router: Router) {
        this.calorieGoalForm = new FormGroup({
            calorieGoal: new FormControl()
        });
    }

    day: Date = new Date();
    displayDay = DateUtils.getDateStringFromDatetime(this.day);
    foodEntries: FoodJournalEntry[] = [];
    lunchInfos: { "lunchType": LunchType, "entries": FoodJournalEntry[], "totalLunchCals": number }[] = [];
    totalCalories: number = 0;
    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;
    faCirclePlus = faCirclePlus;
    faEye = faEye;
    deleteModalShow: boolean = false;
    deletingFoodEntry!: FoodJournalEntry;
    isEditingFoodEntryQuick: boolean = false;
    page: Page = Page.JOURNAL;
    calorieGoal!: CalorieGoal ;
    calorieGoalEdit = false;
    calorieGoalForm: FormGroup;
    faCheck = faCheck;

    ngOnInit() {
        this.setFoodJournalInfos(new Date());
    }

    reloadCurrentComponent() {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
    }

    editCalorieGoal() {
        this.calorieGoalEdit = true;
        console.log("calorie goal in edit mode : ", this.calorieGoalEdit);

    }

    onSubmitCalorieGoal() {
        const goal = parseInt(this.calorieGoalForm.value.calorieGoal);
        console.log("calorie goal try to fetch :", goal, "value input :", this.calorieGoalForm.value.calorieGoal);
        if (!isNaN(goal)){
            this.calorieGoalService.saveCalorieGoal(new CalorieGoal(this.calorieGoalForm.value.calorieGoal)).subscribe({
            next: (response) => {
                console.log('Calorie goal posted successfully :', response);
                this.displayCalorieGoal();
            },
            error: (error) => {
                console.error('Error fetching calorie goal:', error);
            }
        });
        } else{
            console.log("Calorie goal must be an int");
        }
    }

    displayCalorieGoal() {
        this.calorieGoalEdit = false;
        this.fetchLatestCalorieGoal();
    }


    getFoodEntriesByLunchType(lunchType: LunchType, day: Date): FoodJournalEntry[] {
        const lunchTypeMinDate = DateUtils.changeTimeOfDatetime(day, lunchType.timeMin);
        const lunchTypeMaxDate = DateUtils.changeTimeOfDatetime(day, lunchType.timeMax);

        return this.foodEntries.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA > dateB) {
                return 1
            } else if (dateA < dateB) {
                return -1
            } else {
                return 0
            }
        })
            .filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= lunchTypeMinDate && entryDate < lunchTypeMaxDate
            });
    }

    getEntryTime(datestring: string): string {
        let date = new Date(datestring);
        return DateUtils.getTimeStringFromDatetime(date);
    }

    getCellCaloriesByLunchType(lunchType: LunchType, day: Date) {
        const lunchTypeMinDate = DateUtils.changeTimeOfDatetime(day, lunchType.timeMin);
        const lunchTypeMaxDate = DateUtils.changeTimeOfDatetime(day, lunchType.timeMax);

        return this.foodEntries
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .filter((entry) => {
                const entryDate = new Date(entry.date);
                return entryDate >= lunchTypeMinDate && entryDate < lunchTypeMaxDate;
            })
            .reduce((acc, currVal) => acc + currVal.calories, 0);
    }

    getTotalCalories() {
        return this.foodEntries.reduce((acc, currVal) => acc + currVal.calories, 0);
    }

    addOneDaytoDay() {
        this.day.setDate(this.day.getDate() + 1);
        this.setFoodJournalInfos(this.day)
    }

    subOneDaytoDay() {
        this.day.setDate(this.day.getDate() - 1);
        this.setFoodJournalInfos(this.day);
    }

    setFoodJournalInfos(newDay: Date) {
        this.day = newDay;
        this.displayDay = DateUtils.getDateStringFromDatetime(this.day);
        this.foodJournalEntryService.fetchFoodJournalEntries(this.day).subscribe({
            next: (response) => {
                console.log('Food entries retrieved:', response);
                this.foodEntries = response as FoodJournalEntry[];
                const lunchTypes = Object.keys(LUNCH_TYPE);
                this.lunchInfos = [];
                lunchTypes.forEach((lunchType) => {
                    let entries = this.getFoodEntriesByLunchType(LUNCH_TYPE[lunchType], this.day);
                    let calories = this.getCellCaloriesByLunchType(LUNCH_TYPE[lunchType], this.day)
                    this.lunchInfos.push({
                        "lunchType": LUNCH_TYPE[lunchType],
                        "entries": entries,
                        "totalLunchCals": calories
                    });
                });
                this.totalCalories = this.getTotalCalories();
            },
            error: (error) => {
                console.error('Error fetching Food Journal Entries:', error);
            }
        });
        this.fetchLatestCalorieGoal()
    }

    fetchLatestCalorieGoal(){
                this.calorieGoalService.fetchLastCalorieGoal().subscribe({
            next: (response) => {
                console.log('Calorie goal fetches :', response);
                this.calorieGoal = response as CalorieGoal;
            },
            error: (error) => {
                console.error('Error fetching calorie goal:', error);
            }
        })
    }

    closeEditModal() {
        this.deleteModalShow = false;
    }

    onRowClick(entry: FoodJournalEntry) {
        console.log(entry);
        this.deletingFoodEntry = entry;
        this.deleteModalShow = true;
    }
}
