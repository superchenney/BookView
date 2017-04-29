'use strict'

export async function onlogin(user) {
    if (user.name == '小丹') {
        console.log(`(*^__^*) 嘻嘻……`)
            // emit()
    }
    console.log(`User ${user} logined`)

}
