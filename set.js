const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE41eEtEQStkaGFjU1QzdmdWbWltSzlBT0E4OHZqOG5OYVhiSTl1S0hVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDRHUFcyTm1UbHFFK3VVSEt5WlVqUkRrSWlhTUY3WlV2ai81Rms5dDUzMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RmpxL3dmVUg5enU2Q2EyOTBVNGlCR05WMU4vQ0UxTW1VK2R2amFoUVZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEWG5OemRxMEJHRW5pNjY2dHJRc0R0eUpOcDdqL29INVFYa3VmMGtmUUNRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRLaTJoTlZaR0tZZ0cwQUNraDl1UW9EL004NW5DaGdFbzFxKy83dmJhVkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlR4R0VETzdMSlRBenJqUTNJclorUWQzT091U1F3Vk1QRExialc4Z1labUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUpWTFkvWnV6eGp6K2syVVhHUUJ5ajBPRmpwUnFaZEc4VFdlMXorT25Wcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2Eya1NZckZkVDg0dEhIWTlKUzhqUnpVRjU5ODJvNUlodnF0UE85MGxVST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF3WnJqd1lVMDFWeTdVYTEwV09JdXh1K3ZCS0IrZnFRYVNZQ050NVhLVWFpcU5ZWVE5dlk4bFF0YlAweWI4RGdJazJrQWpSZmQxdFBKTm9YamI1WGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODgsImFkdlNlY3JldEtleSI6ImwwZGVxaFRQQ2g1MFdIZmwwK3RqMmpjTjZsZjcreVR5K2tLN0lHSWExMW89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJnSEtRV3daUUVXMTNDRmpIZFhxRHciLCJwaG9uZUlkIjoiOGM1MTdmZjYtNDE5YS00YzhiLTljMzQtM2IxZjYyMjRkN2JhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ1czlFU2J0WHdCV2ZXTnAwQlVNVWJVMUd0bz0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ3VsOVMydHlycHFCYXpwNWNJQS9LdWpLSlFBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVBNdkk4RUVKbi9pcmtHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidmQyMERZSkcyNkpwWVpmR1pBclJGZXpxL3dmbGRNNWx2ZmpyMyt1SEdRRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoieTlxbXA0K2lvMWZqYkFWcHlMblFkbDNySS9qYVk4Tmlvanl0a3JKZHVtL3ZtK2dDaVBnNmN3aWFoVTZWbFdVZlJzVXJMNHUwemt0MjFzYkQybFFJRGc9PSIsImRldmljZVNpZ25hdHVyZSI6ImlWQmwzeUkwanBNY2hFQ2VxWnNsdVlNOG81MzJsWVFPeGtEQXRIZlZEekg5elJsWURFQzdDWGh0bFZBL0ZFN1dUMTdHMld0N3pMU0FEd3hSTmhzVWh3PT0ifSwibWUiOnsiaWQiOiIyMjM5MDc2NTkzMTo3QHMud2hhdHNhcHAubmV0In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyMzkwNzY1OTMxOjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYjNkdEEyQ1J0dWlhV0dYeG1RSzBSWHM2djhINVhUT1piMzQ2OS9yaHhrQiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMDMzMDUyNH0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "CULPHYS",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "22502331988", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NARUTO-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://iili.io/2nNeV14.jpg,https://telegra.ph/file/085c4b1068f0f4f8db970.mp4',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
