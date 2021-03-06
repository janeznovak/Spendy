import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HtmlBreakLinesPipe } from "./shared/pipes/html-break-lines.pipe";
import { FirstPageComponent } from "./shared/components/first-page/first-page.component";
import { ChartsModule } from "ng2-charts";
import { FrameComponent } from "./shared/components/frame/frame.component";
import { NavbarMainComponent } from "./shared/components/navbars/navbar-main/navbar-main.component";
import { NavbarLoginSignupComponent } from "./shared/components/navbars/navbar-login-signup/navbar-login-signup.component";
import { NavbarAvatarAndChooseGroupComponent } from "./shared/components/navbars/navbar-avatar-and-choose-group/navbar-avatar-and-choose-group.component";
import { HomepageComponent } from "./shared/components/homepage/homepage.component";
import { FirstPageNavbarComponent } from "./shared/components/navbars/navbar-first-page/navbar-first-page.component";
import { OverviewComponent } from "./shared/components/overview/overview.component";
import { GraphsComponent } from "./shared/components/graphs/graphs.component";
import { AnalysisComponent } from "./shared/components/analysis/analysis.component";
import { SearchComponent } from "./shared/components/search/search-main/search.component";
import { GroupsMainComponent } from "./shared/components/groups/groups-main/groups-main.component";
import { LoginComponent } from "./shared/components/login/login.component";
import { SignupComponent } from "./shared/components/signup/signup.component";
import { AddExpensesComponent } from "./shared/components/add-expenses/add-expenses.component";
import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { MapDictToArrayPipe } from "./shared/pipes/map-dict-to-array.pipe";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingsComponent } from "./shared/components/settings/settings.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxPaginationModule } from "ngx-pagination";
import { GroupsModalSettingsComponent } from "./shared/components/groups/groups-modal-settings/groups-modal-settings.component";
import { GroupsModalUserAddComponent } from "./shared/components/groups/groups-modal-user-add/groups-modal-user-add.component";
import { GroupsModalGroupAddComponent } from "./shared/components/groups/groups-modal-group-add/groups-modal-group-add.component";
import { ProfileComponent } from "./shared/components/profile/profile.component";
import { ExpenseComponent } from "./shared/components/search/expense/expense.component";
import { DbImportDropComponent } from "./shared/components/db-import-drop/db-import-drop.component";

import { NgToggleModule } from "@nth-cloud/ng-toggle";
import { FormatirajDatumPipe } from "./shared/pipes/formatiraj-datum.pipe";
import { ShortenDescriptionPipe } from "./shared/pipes/shorten-description.pipe";
import { ChangeColorPipe } from "./shared/pipes/change-color.pipe";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DetailModalComponent } from "./shared/components/search/modals/detail-modal/detail-modal.component";
import { DetailModalUpdateComponent } from "./shared/components/search/modals/detail-modal-update/detail-modal-update.component";
import { FormatirajZnesekPipe } from "./shared/pipes/formatiraj-znesek.pipe";
import { ErrorComponent } from "./shared/components/error/error.component";
import { TokenInterceptor } from "./shared/services/token.interceptor";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
    declarations: [
        HtmlBreakLinesPipe,
        FirstPageComponent,
        FirstPageNavbarComponent,
        FrameComponent,
        NavbarMainComponent,
        NavbarLoginSignupComponent,
        NavbarAvatarAndChooseGroupComponent,
        HomepageComponent,
        OverviewComponent,
        GraphsComponent,
        AnalysisComponent,
        SearchComponent,
        GroupsMainComponent,
        LoginComponent,
        SignupComponent,
        MapDictToArrayPipe,
        ProfileComponent,
        SettingsComponent,
        AddExpensesComponent,
        GroupsModalSettingsComponent,
        GroupsModalUserAddComponent,
        GroupsModalGroupAddComponent,
        ExpenseComponent,
        DbImportDropComponent,
        FormatirajDatumPipe,
        ShortenDescriptionPipe,
        ChangeColorPipe,
        DetailModalComponent,
        DetailModalUpdateComponent,
        FormatirajZnesekPipe,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        NgToggleModule,
        BrowserAnimationsModule,
        ChartsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        NgSelectModule,
        MatListModule,
        MatExpansionModule,
        MatDialogModule,
        NgxPaginationModule,
        NgbModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
            registrationStrategy: "registerImmediately",
        }),
    ],
    entryComponents: [DetailModalComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [FrameComponent],
})
export class AppModule {}
