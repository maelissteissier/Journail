import {Component} from '@angular/core';
import {faBook, faCirclePlus, faPen, faHouseChimney} from '@fortawesome/free-solid-svg-icons'
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(private router: Router) {
    }

    title = 'jourNailing-frontend-ng';
    faBook = faBook;
    faCirclePlus = faCirclePlus;
    faPen = faPen;
    faHouseChimney = faHouseChimney;

    goToAddFoodJournalEntry() {
        this.router.navigate(["add-food-journal-entry"])
    }

    goToFoodJournal(){
        this.router.navigate(["food-journal"])
    }

    goToHome(){
            this.router.navigate([""])
    }

    goToFoodRefList(){
            this.router.navigate(["food-ref-management"])
    }
}
