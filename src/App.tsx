import React from 'react'
import TestChart from './components/DayStats'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import testData from './data/data.json'
import { ISessionData } from './interfaces'
import Header from './components/Header'
import Homepage from './pages/Homepage'
import { Container } from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from './components/Loader'

function App() {
    const [testData, setTestdata] = useState<ISessionData[]>()

    useEffect(() => {
        // Here we will fetch data from API
        setTimeout(async () => {
            const data = (await import('./data/data.json')) as ISessionData[]
            setTestdata(data)
        }, 3000)
    }, [])
    return (
        <>
            {testData ? (
                <Router>
                    <Header />
                    <Container>
                        <Switch>
                            <Route
                                path="/dayStats"
                                component={() => (
                                    <TestChart
                                        data={testData as ISessionData[]}
                                    />
                                )}
                            />
                            <Route path="/" component={Homepage} />
                        </Switch>
                    </Container>
                </Router>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default App
