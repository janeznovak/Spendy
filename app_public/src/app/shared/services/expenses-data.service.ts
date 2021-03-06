import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Expense } from "../classes/expense";
import { addExpense } from "../classes/addExpense";
import { Group } from "../classes/group";

@Injectable({
    providedIn: "root",
})
export class ExpensesDataService {
    constructor(private http: HttpClient) {}

    private API_URL = environment.apiUrl;
    private API_URL_EXPENSES = environment.apiUrl + "/expenses";

    public addExpenseToGroup(idGroup: string, expense: addExpense): Promise<Expense[]> {
        const url: string = `${this.API_URL}/groups/${idGroup}/expenses`;
        return this.http
            .post(url, expense)
            .toPromise()
            .then(odgovor => odgovor as Expense)
            .catch(this.proccesError);
    }

    public getExpensesByGroupId(idGroup: string): Promise<Expense[]> {
        const url: string = `${this.API_URL}/groups/${idGroup}/expenses?date=desc`;
        return this.http
            .get(url)
            .toPromise()
            .then(odgovor => odgovor["expenses"] as Expense[])
            .catch(this.proccesError);
    }

    public getExpensesByGroupIdQuery(idGroup: string, query: string): Promise<Expense[]> {
        const url: string = `${this.API_URL}/groups/${idGroup}/expenses?${query}`;
        return this.http
            .get(url)
            .toPromise()
            .then(odgovor => odgovor["expenses"] as Expense[])
            .catch(this.proccesError);
    }

    public getExpensesByGroupIdPaginated(idGroup: string, queryParams: any): Promise<Expense[]> {
        //const url: string = `${this.API_URL}/groups/${idGroup}/expenses/page/${page}?${query}${search}`;

        const url: string = `${this.API_URL}/groups/${idGroup}/expenses/pages`;
        return this.http
            .get(url, {
                params: queryParams,
            })
            .toPromise()
            .then(odgovor => {
                let result = {
                    aktivnosti: odgovor["docs"],
                    count: odgovor["totalDocs"],
                };
                console.log(result);
                return result as any;
            })
            .catch(this.proccesError);
    }

    public deleteExpenseByGroupId(idGroup: string, idExpense: string): Promise<string> {
        const url: string = `${this.API_URL}/groups/${idGroup}/expenses/${idExpense}`;
        return this.http
            .delete(url)
            .toPromise()
            .then(odgovor => odgovor as string)
            .catch(this.proccesError);
    }

    public updateExpenseInGroup(idGroup: string, idExpense: string, expense: Expense): Promise<string> {
        const url: string = `${this.API_URL}/groups/${idGroup}/expenses/${idExpense}`;
        return this.http
            .put(url, expense)
            .toPromise()
            .then(odgovor => odgovor as string)
            .catch(this.proccesError);
    }

    private proccesError(napaka: any): Promise<any> {
        console.error(
            "There has been an error",
            napaka.error["message"] || napaka.error.errmsg || napaka.message || napaka
        );
        return Promise.reject(napaka.error["message"] || napaka.error.errmsg || napaka.message || napaka);
    }
}
