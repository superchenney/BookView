/**
 * Wechaty - Wechat for Bot. Connecting ChatBots
 *
 * Licenst: ISC
 * https://github.com/wechaty/wechaty
 *
 */
import {
    Contact,
    FriendRequest,
    Room
} from 'wechaty'

export async function onFriend(contact, request) {
    try {
        if (!request) {
            console.log('New friend ' + contact.name() + ' relationship confirmed!')
            return
        }
        /********************************************
         *
         * 从这里开始修改 vvvvvvvvvvvv
         *
         */
        await request.accept()

        setTimeout(function() {
            contact.say(`你好呀！ O(∩_∩)O哈哈~
      我就是
      >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      玉树临风,风流倜傥,英俊潇洒,
      举世无双,风华绝代,才高八斗
      人见人爱，花见花开，车见车爆胎，
      一支梨花压海棠,宇宙超级无敌 的
      北漂程序猿 -- 东伟   ♪(^∇^*)
      <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      主页' http://www.yangdongwei.com/
      朋友圈' https://github.com/dfsq1311
      很高兴认识你!  (*^__^*) 嘻嘻……`)
        }, 3000)

        if (request.hello === 'ding') {
            const myRoom = await Room.find({ topic: 'ding' })
            setTimeout(function() {
                myRoom.add(contact)
                myRoom.say('welcome ' + contact.name())
            }, 3000)
        }

        /**
         *
         * 到这里结束修改 ^^^^^^^^^^^^
         *
         ********************************************/
    } catch (e) {
        console.log(e)
    }
}
