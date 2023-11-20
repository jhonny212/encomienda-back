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