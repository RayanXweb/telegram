const { sleep, rand, saveJSON, log } = require("./utils");

async function invite(client, channel, users, resume, config) {
    let count = 0;

    for (let user of users) {

        if (resume[user.id]) continue;
        if (!user.username) continue;

        try {
            log(`➕ Add ${user.username}`);

            await client.invoke({
                _: "channels.inviteToChannel",
                channel,
                users: [user.id]
            });

            resume[user.id] = true;
            count++;

            if (count >= config.maxAddPerDay) break;

            await sleep(rand(config.delayMin, config.delayMax));

        } catch (e) {
            log(`❌ ${e.message}`);

            if (e.message.includes("FLOOD_WAIT")) {
                let w = parseInt(e.message.match(/\d+/)[0]);
                await sleep(w * 1000);
            } else break;
        }
    }

    saveJSON("data/resume.json", resume);
}

module.exports = invite;
