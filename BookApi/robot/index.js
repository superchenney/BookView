/**
 *
 * Wechaty - Wechat for Bot
 *
 * Connecting ChatBots
 * https://github.com/wechaty/wechaty
 *
 * demo for modulize code for logic
 */

import {
    Config,
    Wechaty,
    log
} from 'wechaty'
import _ from 'lodash'
import { onMessage } from './on-message'
import { onFriend } from './on-friend'
import { onRoomJoin } from './on-room-join'

const welcome = `
=============== Powered by Wechaty ===============
-------- https://github.com/wechaty/wechaty --------

Please wait... I'm trying to login in...

`

console.log(welcome)

let wechaty = Wechaty.instance({ profile: Config.DEFAULT_PROFILE })
    // global._anti = []
    // global.db.collection('anti-bot').find({}).toArray((err, rows) => {
    //     console.log(err)
    //     _.forEach(rows, (item) => {
    //         global._anti.push(item.topic)
    //     })
    // })

wechaty.on('scan', (url, code) => {
    if (!/201|200/.test(String(code))) {
        let loginUrl = url.replace(/\/qrcode\//, '/l/')
        require('qrcode-terminal').generate(loginUrl)
    }
    console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
})

.on('login', (user) => {
    log.info('Bot', `${user.name()} logined`)
    wechaty.say(`wechaty logined`)
})

.on('logout', user => log.info('Bot', `${user.name()} logouted`))
    .on('error', error => log.info('Bot', 'error: %s', error))

.on('message', onMessage)
    .on('friend', onFriend)
    .on('room-join', onRoomJoin)

.init()

.catch(e => console.error(e))
