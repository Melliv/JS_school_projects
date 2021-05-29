
import { Redirect, Route, Switch } from 'react-router-dom'

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
import BloodDonateIndex from './containers/bloodDonate/Index'
import BloodDonateDetails from './containers/bloodDonate/Details'
import BloodDonateCreate from './containers/bloodDonate/Create'

import BloodDonateStatistics from './containers/statistics/BloodDonate'
import BloodTransfusionStatistics from './containers/statistics/BloodTransfusion'
import GeneralStatistics from './containers/statistics/General'


const App = () => {
    const setAuthInfo = (token: string | null, firstName: string, lastName: string): void => {
        setAppState({ ...appState, token, firstName, lastName });
    }

    const [appState, setAppState] = useState({ ...initialAppState, setAuthInfo });

    return (
        <>
            <AppContextProvider value={appState} >
                    <Switch>

                        <Route path='/Identity' >
                            <LoginLayout>
                                <Switch>
                                    <Route path='/Identity/Login' exact component={Login} />
                                    <Route path='/Identity/Register' exact component={Register} />
                                    {appState.token != null ? 
                                        <Switch>
                                            <Route path='/Identity/Profile' exact component={Profile} />
                                        </Switch>
                                        :
                                        <Redirect to='/Identity/Login' />
                                    }
                                </Switch>
                            </LoginLayout>
                        </Route>

                        <Route>
                            <MainLayout>
                                {appState.token != null ?
                                    <Switch>
                                        <Route path='/' exact component={Home} />
                                        <Route path='/Privacy' exact component={Privacy} />
                                        <Route path='/Statistics/BloodDonate' exact component={BloodDonateStatistics} />
                                        <Route path='/Statistics/BloodTransfusion' exact component={BloodTransfusionStatistics} />
                                        <Route path='/Statistics/General' exact component={GeneralStatistics} />
                                        <Route path='/BloodDonate' exact component={BloodDonateIndex} />
                                        <Route path='/BloodDonate/personId=:personId' exact component={BloodDonateIndex} />
                                        <Route path='/BloodDonate/Create' exact component={BloodDonateCreate} />
                                        <Route path='/BloodDonate/Create/personId=:personId' exact component={BloodDonateCreate} />
                                        <Route path='/BloodDonate/:id' exact component={BloodDonateDetails} />
                                    </Switch>
                                    :
                                    <Redirect to='/Identity/Login' />
                                }
                            </MainLayout>
                        </Route>

                    </Switch>
            </AppContextProvider>
        </>
    )

};

export default App;