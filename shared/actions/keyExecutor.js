// shared/actions/keyExecutor.js
import keySender from "node-key-sender";

export async function pressKey(keyName) {
    try {
        await keySender.sendKey(keyName.toLowerCase());
        console.log(`[Action] Key ${keyName} pressed`);
    } catch (err) {
        console.error("[KeyExecutor Error]", err);
    }
}
