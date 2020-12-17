/**
 *  Click types:
 * - EXTERNAL_LINK
 * - INTERNAL_LINK(category/ archive etc.)
 * - FORM_CLICK
 * - OTHER
 *
 */

const POST_URL = 'http://localhost:5000/api/sessions'
const getIp = async () => {
    let data = {}
    try {
        res = await fetch('https://ipapi.co/json/')
        data = await res.json()
    } finally {
        return data.ip || '000.000.000.000'
    }
}

const isTagClick = (e, tagName) => {
    return e
        .composedPath()
        .some((node) => node.tagName == tagName.toUpperCase())
}

const run = async () => {
    let device = window.matchMedia('only screen and (max-width: 760px)').matches
        ? 'mobile'
        : 'computer'
    const userAgent = window.navigator.userAgent
    const startTime = new Date()
    const userIp = await getIp()
    const screenWidth = window.screen.height
    const screenHeight = window.screen.width
    const pageUrl = window.location.href

    // const sessionId
    const sessionId = Date.now() + '_' + userIp

    // create array to store clicks
    const clicks = []

    // handle link clicks
    const anchors = document.querySelectorAll('a')
    const handleAnchorLinks = (e) => {
        e.preventDefault()
        link = e.currentTarget.href
        type = link.includes(e.currentTarget.hostname)
            ? 'EXTERNAL_LINK'
            : 'INTERNAL_LINK'
        target = e.currentTarget.tagName

        const res = {
            x: e.x,
            y: e.y,
            target,
            link,
            type,
        }
        clicks.push(res)

        onClose()
    }
    anchors.forEach((lnk) => {
        lnk.addEventListener('click', handleAnchorLinks)
    })

    // handle clicks on page and add them to array
    document.addEventListener('click', (e) => {
        let link = ''
        let type = 'OTHER'
        let target = ''
        if (isTagClick(e, 'A')) {
            console.log('prevent link click')
            return
        }

        // ## processing form click
        if (isTagClick(e, 'form')) {
            type = 'FORM_CLICK'
        }

        const res = {
            x: e.x,
            y: e.y,
            target: e.target.tagName,
            link,
            type,
        }

        clicks.push(res)
    })

    // ## sending data function
    const onClose = async () => {
        const finishTime = new Date()

        const res = {
            clicks,
            device,
            startTime,
            userIp,
            sessionId,
            finishTime,
            userAgent,
            screenWidth,
            screenHeight,
            pageUrl,
        }
        console.log(JSON.stringify(res, null, 2))

        try {
            fetch(POST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ content: res }),
            })
        } catch (e) {
            console.error(e)
            console.log(res)
        }
    }

    // ## send data
    window.onunload = onClose
}

run()
