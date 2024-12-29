// import and configure
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import { Client, GatewayIntentBits} from 'discord.js';

// configure openai with api key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// configure permissions for discord bot(intents)
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
	]
});

// log successful login
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// respond to messages using different models depending on keywords
client.on("messageCreate", async function (message) {
try{

  // ignore messages from bots
  if (message.author.bot) return;

  // natural style (Image Generation)
  else if (message.content.toLowerCase().startsWith('imaginenatural')) {
    try {
      const image = await openai.images.generate({
        model: "dall-e-3", 
        prompt: `${message}`,
        size: "1024x1024",
        style: "natural"
      });
      message.reply(`${image.data[0].url}`)
      console.log(image.data[0].url);
    }
    // log errors for imagine
    catch (error) {
    message.reply(`${error}`);
    console.log(`${data, error}`)
    }
  }

    //vivid style (Image Generation)
  else if (message.content.toLowerCase().startsWith('imaginevivid')) {
    try {
      const image = await openai.images.generate({
        model: "dall-e-3", 
        prompt: `${message}`,
        size: "1024x1024",
        style: "vivid"
      });
      message.reply(`${image.data[0].url}`)
      console.log(image.data[0].url);
    }
    //Log errors for imagine
    catch (error) {
    message.reply(`${error}`);
    console.log(`${data, error}`)
    }
  }
 
}
// error logging for entire program
catch (error) {
  message.reply(`${error}`);
  console.log(`${error}`)
}
// the end
});

// bot login using token from .env file
client.login(process.env.TOKEN);
