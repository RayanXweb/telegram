const { log, saveJSON } = require("./utils");

async function scrape(client, group) {
    log("🔍 Scraping member...");

    const participants = await client.getParticipants(group);

    const users = participants.map(u => ({
        id: u.id,
        username: u.username,
        name: u.firstName
    }));

    saveJSON("data/users.json", users);

    log(`✔️ Total user: ${users.length}`);
    return users;
}

module.exports = scrape;
