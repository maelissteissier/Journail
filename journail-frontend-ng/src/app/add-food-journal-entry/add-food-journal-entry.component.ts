import {Component} from '@angular/core';
import {FoodJournalEntry} from "../shared/models/food-journal-entry";
import {FoodJournalEntryService} from "../shared/services/food-journal-entry.service";
import {TOAST_LONG_TIMEOUT, TOAST_SHORT_TIMEOUT} from "../shared/timeouts-config";
import {Page} from "../shared/models/page";


@Component({
    selector: 'app-add-food-journal-entry',
    templateUrl: './add-food-journal-entry.component.html',
    styleUrls: ['./add-food-journal-entry.component.scss'],
})

export class AddFoodJournalEntryComponent {
    constructor(private foodJournalEntryService: FoodJournalEntryService) {
    }

    quickAdd: boolean = false;
    isFoodEntrySentSuccessToastShow: boolean = false;
    isFoodEntrySentFailToastShow: boolean = false;
    failMessage: string = "";
    saveFoodSucceeded: boolean = false;
    page: Page = Page.ADD_JOURNAL_ENTRY;

    enableQuickAdd(): void {
        this.quickAdd = true;
    }

    disableQuickAdd(): void {
        this.quickAdd = false;
    }

    saveFoodEntry(foodEntryData: FoodJournalEntry) {
        this.foodJournalEntryService.saveFoodEntry(foodEntryData).subscribe(
            {
                next: (response) => {
                    this.isFoodEntrySentSuccessToastShow = true;
                    setTimeout(() => {
                        this.isFoodEntrySentSuccessToastShow = false;
                    }, TOAST_SHORT_TIMEOUT);

                },
                error: (error) => {
                    this.isFoodEntrySentFailToastShow = true;
                    if (error.error.errors) {
                        this.failMessage = error.error.errors.reduce((acc: string, str: string) => {
                            return `${acc}\n${str}`;
                        });
                    } else {
                        this.failMessage = error.error.toString();
                    }

                    setTimeout(() => {
                        this.isFoodEntrySentFailToastShow = false;
                    }, TOAST_LONG_TIMEOUT);
                }
            }
        );
    }
}
