import React from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import NavComponent from './architecture/nav-bar-component/nav-bar.component';
import { UserComponent } from './content/ers-user.component';
import { LoginComponent } from './content/login-component/login.component';
import { ErsSubmitForm } from './content/ers-submit-form/ers-submit-form.component';

export const MainComponent: React.FC = () => {
    return <div>
        <BrowserRouter>
            <NavComponent></NavComponent>
            <main>
                <Switch>
                    <Route path = "/login">
                        <LoginComponent></LoginComponent>
                    </Route>
                    <Route path='/user'>
                        <UserComponent></UserComponent>
                    </Route>
                    <Route path='/form'>
                        <ErsSubmitForm></ErsSubmitForm>
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    </div>
}