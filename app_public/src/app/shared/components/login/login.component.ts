import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { HistoryService } from "../../services/history.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: [
        "./login.component.css",
        "../../../../assets/stylesheets/style.css",
        "../../../../assets/stylesheets/style-profil.css",
    ],
})
export class LoginComponent implements OnInit {
    public napakaNaObrazcu = "";

    public prijavniPodatki = {
        mail: "",
        pass: "",
    };

    // public vsebinaStrani = {
    //     glava: {
    //         naslov: "Kreiranje novega uporabniškega računa",
    //         podnaslov: ""
    //     },
    //     stranskaOrodnaVrstica: ""
    // }

    constructor(
        private usmerjevalnik: Router,
        private authenticationService: AuthenticationService,
        private historyService: HistoryService
    ) {}
    public posiljanjePodatkov(): void {
        this.napakaNaObrazcu = "";
        if (!this.prijavniPodatki.mail || !this.prijavniPodatki.pass) {
            // console.log(this.prijavniPodatki);
            this.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
        } else {
            this.izvediPrijavo();
        }
    }

    private izvediPrijavo(): void {
        this.authenticationService
            .prijava(this.prijavniPodatki)
            .then(() => this.usmerjevalnik.navigateByUrl("/overview"))
            .catch(sporocilo => (this.napakaNaObrazcu = sporocilo));
    }

    ngOnInit() {}
}
