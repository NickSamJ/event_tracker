import { Typography } from '@material-ui/core'
import React from 'react'
import CommonStats from '../components/CommonStats'
import testData from '../data/data.json'
import { ISessionData } from '../interfaces'

const Homepage = () => {
    return (
        <>
            <Typography variant="h1" component="h2">
                Welcome to Dashboard!
            </Typography>
            <CommonStats data={testData as ISessionData[]} />
        </>
    )
}

export default Homepage
