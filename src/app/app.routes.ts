import { Routes } from '@angular/router';
import { AdminRoutingModule } from './admin/admin.routes';
import { ClientRoutingModule } from './client/client.route';


export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => AdminRoutingModule
    },
    {
        path: '',
        loadChildren: () => ClientRoutingModule
    },
];
