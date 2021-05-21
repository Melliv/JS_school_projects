
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import LoginLayout from './LoginLayout'
import MainLayout from './MainLayout'

// views
import Home from './containers/home/HomeIndex'
import Login from './containers/identity/Login'
import Register from './containers/identity/Register'
import Profile from './containers/identity/Profile'
import Privacy from './components/Privacy'

import { AppContextProvider, initialAppState } from './context/AppContext'
import { useState } from 'react'
import BloodTestIndex from './containers/bloodTest/Index'
import BloodTestDetails from './containers/bloodTest/Details'
import BloodTestCreate from './containers/bloodTest/Create'
import BloodDonateIndex from './containers/bloodDonate/Index'
import BloodDonateDetails from './containers/bloodDonate/Details'
import BloodDonateCreate from './containers/bloodDonate/Create'
import BloodTransfusionIndex from './containers/bloodTransfusion/Index'
import BloodTransfusionDetails from './containers/bloodTransfusion/Details'
import BloodTransfusionCreate from './containers/bloodTransfusion/Create'
import PersonIndex from './containers/person/Index'
import PersonDetails from './containers/person/Details'
import PersonCreate from './containers/person/Create'
import ContactIndex from './containers/contact/Index'



const App = () => {
    const setAuthInfo = (token: string | null, firstName: string, lastName: string): void => {
        setAppState({ ...appState, token, firstName, lastName });
    }

    const [appState, setAppState] = useState({ ...initialAppState, setAuthInfo });

    return (
        <>
            <AppContextProvider value={appState} >
                <Router>
                    <Switch>

                        <Route path='/Identity' >
                            <LoginLayout>
                                <Switch>
                                    <Route path='/Identity/Login' exact component={Login} />
                                    <Route path='/Identity/Register' exact component={Register} />
                                    <Route path='/Identity/Profile' exact component={Profile} />
                                </Switch>
                            </LoginLayout>
                        </Route>

                        <Route>
                            <MainLayout>
                                {appState.token != null ?
                                    <>
                                        <Switch>
                                            <Route path='/' exact component={Home} />
                                            <Route path='/Privacy' exact component={Privacy} />
                                            <Route path='/Person' exact component={PersonIndex} />
                                            <Route path='/Person/Create' exact component={PersonCreate} />
                                            <Route path='/Contact/:id' exact component={ContactIndex} />
                                            <Route path='/Person/:id' exact component={PersonDetails} />
                                            <Route path='/BloodTest' exact component={BloodTestIndex} />
                                            <Route path='/BloodTest/Create' exact component={BloodTestCreate} />
                                            <Route path='/BloodTest/:id' exact component={BloodTestDetails} />
                                            <Route path='/BloodDonate' exact component={BloodDonateIndex} />
                                            <Route path='/BloodDonate/Create' exact component={BloodDonateCreate} />
                                            <Route path='/BloodDonate/:id' exact component={BloodDonateDetails} />
                                            <Route path='/BloodTransfusion' exact component={BloodTransfusionIndex} />
                                            <Route path='/BloodTransfusion/Create' exact component={BloodTransfusionCreate} />
                                            <Route path='/BloodTransfusion/:id' exact component={BloodTransfusionDetails} />
                                        </Switch>
                                    </>
                                    :
                                    <Redirect to='/Identity/Login' />
                                }
                            </MainLayout>
                        </Route>

                    </Switch>
                </Router>
            </AppContextProvider>
        </>
    )

};

export default App;