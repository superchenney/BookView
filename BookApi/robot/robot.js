const {
    Config,
    Contact,
    FriendRequest,
    IoClient,
    Message,
    MediaMessage,
    MsgType,
    Puppet,
    PuppetWeb,
    Room,
    Sayable,
    UtilLib,
    VERSION,
    Wechaty,
    log
} = require('wechaty')

var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try { step(generator.next(value)); } catch (e) { reject(e); }
        }

        function rejected(value) {
            try { step(generator["throw"](value)); } catch (e) { reject(e); }
        }

        function step(result) { result.done ? resolve(result.value) : new P(function(resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const bot = Wechaty.instance({
    profile: 'my-bot'
})

const QrcodeTerminal = require('qrcode-terminal');


const fs_1 = require("fs");

bot.on('scan', (url, code) => {
        if (!/201|200/.test(String(code))) {
            let loginUrl = url.replace(/\/qrcode\//, '/l/');
            console.log(loginUrl); //登陆的扫描接口地址
            QrcodeTerminal.generate(loginUrl);
        }
        //code为图片地址
        console.log(`${url}\n[${code}] Scan QR Code in above url to login: `);
    })
    .on('login', user => {
        console.log(`User ${user} logined`)
        main()

        const contactList = Contact.findAll()
        console.log(contactList.length);
    })
    .on('friend', (contact, request) => {
        if (request) {
            request.accept().then(function() {
                console.log(`Contact: ${contact.name()} send request ${request.hello}`)
            })
        }
    })
    .on('message', m => {
        const contact = m.from();
        const content = m.content();
        const room = m.room();
        const type = m.type();

        const contact_name = contact.name();
        // const contact_remark = contact.remark();
        // contact.say('test');
        // const contact_id = contact.id();
        // const contact_city = contact.city();
        // const contact_province = contact.province();
        const contact_gender = contact.gender();
        // const contact_avatar = contact.avatar();
        const contact_alias = contact.alias();
        // const contact_weixin = contact.weixin();
        const contact_star = contact.star();
        // const contact_stranger = contact.stranger();

        // console.log('====');
        // console.log(contact); /////内部数据结构！！！！
        // console.log('====');


        console.log('contact_name:' + contact_name);
        console.log('contact_alias:' + contact_alias);
        // console.log('contact_id:' + contact_id);
        // console.log('contact_city:' + contact_city);
        // console.log('contact_province:' + contact_province);
        console.log('contact_gender:' + contact_gender);
        // console.log('contact_avatar:' + contact_avatar);
        // console.log('contact_weixin:' + contact_weixin);
        console.log('contact_star:' + contact_star);
        // console.log('contact_stranger:' + contact_stranger);

        if (room) {
            console.log(`Room:${ room.topic()}  Contact:${contact.name()} Content:${content}\n type${type}`);
        } else {
            console.log(`Contact:${contact.name()} Content:${content}\n type${type}`);
        }

        if (m.self()) {
            return;
        }
        //关键词回复
        if (/hello/.test(content)) {
            m.say('hello how are you')
        }
        //通过关键词拉到群里面
        if (/room/.test(content)) {
            Room.find({ topic: "test" }).then(function(keyroom) {
                if (keyroom) {
                    keyroom.add(contact).then(function() {
                        keyroom.say("welcome!", contact)
                    })
                }
            })
        }
        //通过关键词在群里面踢人
        if (/out/.test(content)) {
            Room.find({ topic: "test" }).then(function(keyroom) {
                if (keyroom) {
                    keyroom.del(contact).then(function() {
                        keyroom.say("Remove from the room", contact)
                    })
                }
            })
        }
    })
    // .on('room-join', (inviter) => {})
    // .on('room-leave', (inviter) => {})
    .on('error', e => {
        console.log.info('Bot', 'error: %s', e);
        bot.say('Wechaty error: ' + e.message);
    })
    .on('logout', user =>
        console.log(`User ${user} logouted`)
    )
    .init()
    .catch(e => {
        console.error('Bot', 'init() fail:' + e);
        bot.quit();
        process.exit(-1);
    });




function main() {
    return __awaiter(this, void 0, void 0, function*() {
        const contactList = yield Contact.findAll();
        log.info('Bot', '#######################');
        log.info('Bot', 'Contact number: %d\n', contactList.length);
        const MAX = 17;
        for (let i = 0; i < contactList.length; i++) {
            const contact = contactList[i];

            // console.log('====');
            // console.log(contact);
            // console.log('====');

            if (!contact.weixin()) {
                yield contact.refresh();
            }
            /**
             * Save avatar to file like: "1-name.jpg"
             */
            const avatarFileName = `${i}-${contact.name()}.jpg`;
            const avatarReadStream = yield contact.avatar();
            const avatarWriteStream = fs_1.createWriteStream(avatarFileName);
            avatarReadStream.pipe(avatarWriteStream);
            log.info('Bot', 'Contact: %s: %s with avatar file: %s', contact.weixin(), contact.name(), avatarFileName);
            
        }
        const SLEEP = 7;
        log.info('Bot', 'I will re-dump contact weixin id & names after %d second... ', SLEEP);
        setTimeout(main, SLEEP * 1000);
    });
}
