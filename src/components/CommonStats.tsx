import React from 'react'
import Paper from '@material-ui/core/Paper'
// import _ from 'lodash'
import { ISessionData } from '../interfaces'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography, Container } from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from './Loader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

interface ICommonProps {
    data: ISessionData[]
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

const CommonStats: React.FC<ICommonProps> = ({ data }: ICommonProps) => {
    const [totalClicks, setTotalClicks] = useState<number>()
    const [avgSessionDuration, setAvgSessionDuration] = useState<number>()
    const [mostClickedLinks, setMostClickedLinks] = useState<
        [string, number][]
    >()
    const findPopularLinks = (): [string, number][] => {
        let links: any = {}
        data.forEach((data) => {
            const tmp = data.clicks.find((click) => click.link !== '')
            if (tmp && tmp.link) {
                links[tmp.link] = links[tmp.link] ? links[tmp.link] + 1 : 1
            }
        })
        const res = Object.entries(links).sort(
            (a, b) => (b[1] as number) - (a[1] as number)
        )
        return (res.length > 5 ? res.slice(0, 6) : res) as [string, number][]
    }
    useEffect(() => {
        setTotalClicks(data.reduce((acc, curr) => acc + curr.clicks.length, 0))

        const allSessionsSumTime = data.reduce((acc, curr) => {
            const startTime = new Date(curr.startTime)
            const finishTime = new Date(curr.finishTime)
            return acc + (finishTime.getTime() - startTime.getTime()) / 1000
        }, 0)
        setAvgSessionDuration(Math.round(allSessionsSumTime / data.length))
        setMostClickedLinks(findPopularLinks())
    }, [data])
    const classes = useStyles()

    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4">
                                clicks: <span>{totalClicks || <Loader />}</span>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography>Most popular userAgent:</Typography>

                            <span>
                                Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like
                                Mac OS X) AppleWebKit/603.1.30 (KHTML, like
                                Gecko) Version/10.0 Mobile/14E304 Safari/602.1
                            </span>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography>
                                Average time user spend on the page:
                            </Typography>

                            <span>{avgSessionDuration} sec.</span>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <Typography variant="h4">
                                Most clicked links:
                            </Typography>
                            <List
                                component="nav"
                                aria-label="secondary mailbox folders"
                            >
                                {mostClickedLinks &&
                                    mostClickedLinks.map((link, index) => (
                                        <div key={index}>
                                            <ListItem>
                                                <ListItemText>
                                                    <strong>{link[0]}: </strong>{' '}
                                                    {link[1]}clicks
                                                </ListItemText>
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default CommonStats
