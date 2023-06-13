import chalk from 'chalk'

const mapToChalk = (msg,color) => {
    return msg.map(m=>chalk[color](m)).join(' ')
}
export const DEV_MODE = process.env.NODE_ENV === 'development'
export const err = function ()  {
    DEV_MODE && console.log(mapToChalk(arguments,'red'    ))
}
export const warn = function ()  {
    DEV_MODE && console.log(mapToChalk(arguments,'yellow' ))
}
export const info = function ()  {
    DEV_MODE && console.log( mapToChalk(arguments,'blue'   )  )
}
export const debug = (...msg) => {
    DEV_MODE && console.log( mapToChalk(msg,'green'))
}
export const log =function ()  {
    DEV_MODE && console.log(...arguments)
}

