/**
 * Wechaty - Wechat for Bot. Connecting ChatBots
 *
 * Licenst: ISC
 * https://github.com/wechaty/wechaty
 */
import request from 'co-request'
import { TU_LING } from '../config'
import _ from 'lodash'

let wishes = [
        `鸡年好!
喜鹊登枝贺佳节，傲雪红梅把春闹。
天涯海角同聚首，团团圆圆皆欢笑。
腊尽春归新万象，紫燕衔泥筑家巢。
美满幸福浴春风，卯年更上一层楼。`, `
新年新气象，新年新生机，新年新机遇，新年新契机，新年新希望，新年新业绩。
祝您鸡年好运，步步高升。`, `
辞旧迎新歌盛世金鸡报喜贺新年、
值2017新春佳节来临之际、
东伟在此感谢我的朋友们、
感谢过去一年您在生活上给予我的关心和爱护、
感谢您在工作上给予我的支持和理解感谢各位在朋友圈里相伴的日日夜夜、
在此我衷心的祝您及您的家人新年快乐、身体安康！
`, `
[福][福][福][福][][福][福][福][福]
[福][福][福][福][][福][福][福][福]
[福][福][福][福][恭][福][福][福][福]
[福][福][福][福][祝][福][福][福][福]
[福][福][福][福][您][福][福][福][福]
[福][福][福][福][新][福][福][福][福]
[福][福][福][福][年][福][福][福][福]
[福][福][福][福][快][福][福][福][福]
[福][福][福][福][乐][福][福][福][福]
[福][福][福][福][福][福][福][福][福]
[福][福][福][福][福][福][福][福][福]
[福]福从天降[福]福满全家
[福][福][福][福][福][福][福][福][福][福]`, `
[福][福][福][福][提][福][福][福][福]
[福][福][福][福][前][福][福][福][福]
[福][福][福][福][在][福][福][福][福]
[福][福][福][福][此][福][福][福][福]
[福][福][福][福] [抱拳][福][福][福][福]
[福][福][福][福][恭][福][福][福][福]
[福][福][福][福][祝][福][福][福][福]
[福][福][福][福][大][福][福][福][福]
[福][福][福][福][家][福][福][福][福]
[福][福][福][福][春][福][福][福][福]
[福][福][福][福][节][福][福][福][福]
[福][福][福][福][快][福][福][福][福]
[福][福][福][福][乐][福][福][福][福]
[福][福][福][福][福][福][福][福][福]
[福]福从天降[福]福满全群
[福][福][福][福][福][福][福][福][福]
[福][鸡][鸡][鸡][鸡][鸡][鸡][鸡][鸡]
[鸡][鸡][鸡][鸡]鸡年大吉[鸡][鸡][鸡][鸡]
[鸡][鸡][鸡][鸡][鸡][鸡][鸡][鸡]`, `
东伟祝您:     
  新年快乐！     
  身体健康！     
  合家幸福！     
  步步高升！     
  事业有成！     
  财源广进！     
  心想事成！     
  万事如意！……… 
    
  鸡年大吉大利
  感谢一路有你们…………                       
祝身体健康、事业上升，合家欢乐`,
        `
东伟在这里提前祝您..  
2017..  ..  
新的一年..  ..   
 十全十美..  ..  ..
百事亨通..  ..  ..   
千事吉祥..  
..   
萬事如意..  ..    ..  ..  
鸡年大吉，新年快乐[拥抱][拥抱][拥抱]
`,
        `
祝     
    幸福快乐 
    身体健康 
    财源滚滚 
    心想事成 
    万事如意！
/玫瑰/玫瑰/玫瑰/玫瑰/玫瑰/玫瑰[玫瑰][玫瑰]`
    ]
    /**
     * @param message: Message
     */
export async function onMessage(message) {

    try {
        const room = message.room()
        const sender = message.from()
        const receiver = message.to()
        const content = message.content()

        if (room) {
            await room.ready()
        }
        await sender.ready()

        console.log((room ? '[' + room.topic() + ']' : '') + '<' + sender.name() + '>' + ':' + message.toStringDigest())

        /*******************************************
         * 自定义聊天内容
         */
        // 记录消息
        let topic = room ? room.topic() : message.self() ? receiver.name() : sender.name()
        global.db.collection(`message@${topic}`).insertOne(message)

        // 开启、关闭机器人
        if (content == ':\\\\bot down') {
            global.db.collection('anti-bot').insertOne({ topic: topic })
            global._anti.push(topic)
        } else if (content === ':\\\\bot up') {
            global.db.collection('anti-bot').deleteOne({ topic: topic })
            _.remove(global._anti, function(item) {
                return item == topic
            })
        }

        let index = global._anti.indexOf(topic)
        if (index !== -1) {
            return
        }

        if (message.self()) {

            return console.log('message is sent from myself')
        }

        if (room) {
            return
        }
        // if (room && content.indexOf('@东伟') != -1) {
        //   console.log(`room chat && @me`)
        //   let body = { userid: 'test', info: content, key: TU_LING.APIkey }
        //   let result = await request.post(TU_LING.url, { form: body })
        //   return room.say(`@${sender.name()} ${JSON.parse(result.body).text}`)
        // }

        if (content.indexOf('我通过了你的朋友验证请求') !== -1 || content.indexOf('东伟') !== -1 || content.indexOf('自我介绍') !== -1) {
            return sender.say(`
你好呀！ O(∩_∩)O哈哈~
我就是
>>>>>>>>>>>>>>>>>>>>>>>>>>>
玉树临风,风流倜傥,英俊潇洒,
举世无双,风华绝代,才高八斗
人见人爱，花见花开，车见车爆胎，
一支梨花压海棠,宇宙超级无敌
      的
          -- 东伟   ♪(^∇^*)
<<<<<<<<<<<<<<<<<<<<<<<<<<<
主页' http://www.yangdongwei.com/
朋友圈' https://github.com/dfsq1311
很高兴认识你!  (*^__^*) 嘻嘻……
`)
        }

        if (content.indexOf('年') !== -1 || content.indexOf('祝') !== -1 || content.indexOf('鸡') !== -1 || content.indexOf('福') !== -1 || content.indexOf('家') !== -1) {
            return sender.say(wishes[parseInt(Math.random() * wishes.length)] + `
    -- 此消息由AI自动回复（本人在玩贪吃蛇(*^__^*) 嘻嘻……）`)
        }

        let body = { userid: 'test', info: content, key: TU_LING.APIkey }
        let result = await request.post(TU_LING.url, { form: body })
        return sender.say(JSON.parse(result.body).text)

        /**
         *
         * 到这里结束修改^^^^^^^^^^^^
         *
         *********************************************/

    } catch (e) {
        console.log(e)
    }
}
