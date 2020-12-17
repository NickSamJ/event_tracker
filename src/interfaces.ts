export interface IClickData {
    x: number
    y: number
    target: string
    link: string
    type: string
}
export interface ISessionData {
    clicks: IClickData[]
    device: string
    userIp: string
    startTime: string
    sessionId: string
    finishTime: string
    userAgent: string
    screenWidth: number
    screenHeight: number
    pageUrl: string
}

export interface INavigationLink {
    title: string,
    path: string
}