import {RouterConfig} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {UserApartmentComponent} from "./apartment/user.apartment.component";
import {UserBillComponent} from "./bills/user.bill.component";
import {TicketComponent} from "./ticket/ticket.component";
import {MessageComponent} from "./ticket/single_ticket/single.ticket.component";
import {UserCalendarComponent} from "./calendar/user.calendar.component";
import {UserReportComponent} from "./report/user.report.component";
import {ProviderComponent} from "./provider/provider.component";
import {ContractComponent} from "./contract/contract.component";
import {ApartmentProfileComponent} from "./ApartmentProfile/apartment.profile";
import {ProviderInfoComponent} from "./provider/provider-info";
import {ProfileComponent} from "./profile/profile.component";
import {ProviderUserPageComponent} from "./provider/provider_home/provider-user-page.component";
import {OsbbBillComponent} from "./bills/osbb/osbb.bill.component";
import {SettingsComponent} from "./settings/settings.component";


 
export const userRoutes: RouterConfig = [
    {
        path: 'home/user',
        children: [
            {path: 'main', component: ProfileComponent},
            {path: '', redirectTo: 'main', pathMatch: 'full'},
            {path: 'apartment', component: UserApartmentComponent},
            {path: 'calendar', component: UserCalendarComponent},
            {path: 'bill', component: UserBillComponent},
            {path: 'osbb/bill', component: OsbbBillComponent},
            {path: 'ticket', component: TicketComponent},
            {path: 'ticket/:id', component: MessageComponent},
            {path: 'report', component: UserReportComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'provider', component: ProviderComponent},
            {path: 'provider/info/:id', component: ProviderInfoComponent},
            {path: 'provider/info', component: ProviderUserPageComponent},
            {path: 'contract', component: ContractComponent},
            {path: 'apartment/apartmentprofile/:id', component: ApartmentProfileComponent},
            {path: 'settings', component: SettingsComponent}
            

        ],
        component: UserComponent,
    }
];