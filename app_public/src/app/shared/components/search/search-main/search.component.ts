import { Component, OnDestroy, OnInit } from "@angular/core";
import { Expense } from "../../../classes/expense";
import { ExpensesDataService } from "../../../services/expenses-data.service";
import { GroupsDataService } from "../../../services/groups-data.service";
import { Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailModalComponent } from "../modals/detail-modal/detail-modal.component";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConnectionService } from "src/app/shared/services/connection.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit, OnDestroy {
    sub: Subscription;
    constructor(
        private expensesData: ExpensesDataService,
        private groupsDataService: GroupsDataService,
        private modalService: NgbModal,
        private titleService: Title,
        private _route: ActivatedRoute,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private connectionService: ConnectionService
    ) {
        this.titleService.setTitle("Stroški");
    }

    private groupSelectionSub: Subscription;
    public groupSelected = "";

    public expenses: Expense[];
    public message: string;
    public p: number = 1;
    public count: number;

    public queryParams: any = {};
    public query: boolean = null;
    public search: string = "";
    public searchq: string = "";
    public date: string = "";

    loading = true;
    apiError = "";

    ngOnInit(): void {
        this.groupSelectionSub = this.groupsDataService.getGroupSelectionUpdateListener().subscribe((data: string) => {
            this.groupSelected = data;
            //if (data != null && data != undefined && data != "") {
            //console.log(data);
            this.getExpensesByGroupId(this.groupSelected);
            //}
        });
        this.sub = this._route.queryParams.subscribe(params => {
            // Defaults to 0 if no query param provided.
            this.p = +params["page"] || 1;
            this.query = params["isExpenditure"] || null;
            this.search = params["search"] || "";
            this.date = params["date"] || "";

            if (this.query != null) this.queryParams.isExpenditure = this.query;
            if (this.search) this.queryParams.search = this.search;
            if (this.date) this.queryParams.date = this.date;
            this.queryParams.page = this.p;

            if (this.groupSelected) this.getExpensesByGroupId(this.groupSelected);
        });

        // this.groupsDataService.getCurrentGroup();
    }

    ngOnDestroy(): void {
        this.groupSelectionSub.unsubscribe();
        this.sub.unsubscribe();
    }

    private getExpensesByGroupId = (idGroup: string): void => {
        this.loading = true;
        this.message = "Fetching expenses data";
        console.log(this.queryParams);
        this.expensesData
            .getExpensesByGroupIdPaginated(idGroup, this.queryParams)
            .then(expenses => {
                console.log(expenses);
                this.message = expenses.length > 0 ? "" : "There are no expenses";
                this.expenses = expenses["aktivnosti"];
                this.count = expenses["count"];
                this.loading = false;
                this.apiError = "";
            })
            .catch(error => {
                this.showError(error);
                this.apiError = "Prislo je do napake pri pridobivanju podatkov";
            });
    };

    public inc(page) {
        this.p = page;
        this.navigateToPageNumberWithNavigation();
        //this.getExpensesByGroupId(this.groupSelected);
        console.log(page);
    }

    public filterActivities(page, query, search, date) {
        this.p = page;
        this.query = query;
        this.date = date;
        this.p = 1;

        /*
        if (search != "") {
            this.searchq = query != "" ? `&search=${search}` : `search=${search}`;
        } else {
            this.search = "";
            this.searchq = "";
        }

        if (this.searchq == "search=" || this.searchq == "&search=") this.searchq = "";
        */
        this.navigateToPageNumberWithNavigation();
        //this.getExpensesByGroupId(this.groupSelected);
    }

    public openModal(activityData) {
        const modalRef = this.modalService.open(DetailModalComponent, {
            centered: true,
            size: "lg",
            backdrop: "static",
        });
        modalRef.componentInstance.activity = activityData;

        modalRef.result
            .then(result => {
                if (result != null && result != undefined) {
                    if (result.message === "Deleting was successful") {
                        this.expenses = this.expenses.filter(item => item._id !== result.item);
                    } else if (result.message === "Updating was successful") {
                        const idExpense = result.expense._id;

                        this.expenses = this.expenses.map(item => {
                            if (item._id == idExpense) {
                                return result.expense;
                            } else return item;
                        });
                    }
                }
            })
            .catch(err => {
                this.showError(err);
                this.openSnackBar("Prišlo je do napake");
            });
    }

    navigateToPageNumberWithNavigation() {
        // changes the route without moving from the current view or
        // triggering a navigation event,
        if (this.query != null) this.queryParams.isExpenditure = this.query;
        if (this.search) this.queryParams.search = this.search;
        if (this.date) this.queryParams.date = this.date;
        this.queryParams.page = this.p;

        this._router.navigate([], {
            relativeTo: this._route,
            queryParams: this.queryParams,
            queryParamsHandling: "merge",
            // preserve the existing query params in the route
            skipLocationChange: false,
            // do not trigger navigation
        });
    }

    navigateToPageNumberWithoutNavigation() {
        // changes the route without moving from the current view or
        // triggering a navigation event,
        if (this.query != null) this.queryParams.isExpenditure = this.query;
        if (this.search) this.queryParams.search = this.search;
        if (this.date) this.queryParams.date = this.date;
        this.queryParams.page = this.p;

        this._router.navigate([], {
            relativeTo: this._route,
            queryParams: this.queryParams,
            queryParamsHandling: null,
            // preserve the existing query params in the route
            skipLocationChange: true,
            // do not trigger navigation
        });
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 10000,
        });
    }

    jePovezava(): boolean {
        return this.connectionService.isOnline;
    }

    private showError = (napaka: any): void => {
        this.message = napaka.message || napaka;
    };
}
