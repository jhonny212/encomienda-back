type orderType = {
    type: 'asc' | 'desc'
}

type costSum = {
    totalcost: number
    brachOfficeId: number
    routeId: number
}

type averageTime = {
    brachOfficeId: number
    originId: number
    averageTime: number
    total: number
}

type routeMetric = {
    brachOfficeId: number
    originId: number
    passedTrack: number
    unpassedTrack: number
}

type seriesType = {
    name: string
    data: number[]
}

type dashboard = {
    item: string
    series: seriesType[]
    categories: any[]
    colors: ["rgba(0,0,0,0.1)"]
    min: number
    max: number
}