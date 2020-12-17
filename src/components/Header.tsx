import * as React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Container,
} from '@material-ui/core'
import { Home } from '@material-ui/icons'
import NavigationLinks from '../config/navigation'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`,
    },
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
    },
})

const Header: React.FC = () => {
    const classes = useStyles()
    return (
        <AppBar position="static">
            <Toolbar>
                <Container className={classes.navbarDisplayFlex}>
                    <IconButton color="inherit" aria-label="home" href="/">
                        <Home fontSize="large" />
                    </IconButton>

                    <List
                        component="nav"
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex}
                    >
                        {NavigationLinks.map(({ title, path }) => (
                            <Link
                                to={path}
                                key={title}
                                className={classes.linkText}
                            >
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
export default Header
