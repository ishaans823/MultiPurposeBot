import fetch from "node-fetch";
import { Client, Intents, UserFlags } from "discord.js";
import apiKeys from './config.json' assert {type: 'json'};
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});


client.once('ready', () => {
    console.log('Ready!');
})

client.login(apiKeys.discToken);

//Botterson Welcome
client.on("messageCreate", (message) => {
    if(message.author.id == client.user.id) return;
    if(message.content === "bot") {
        message.reply("Hi! I'm Botterson, how may I assist you?")
    }
})

//Help (List Commands)
client.on("messageCreate", (message) => {
    if(message.author.id == client.user.id) return;
    if(message.content === "bot help") {
        message.reply("Help Menu: ")
    }
})

//Commands 


//Botterson Weather
client.on("messageCreate", (message) => {
    if(message.author.id == client.user.id) return;
    if(message.content.includes("$!weather")) {
        //possibly split by comma
        var location = message.content.slice(10);
        var locationSplit = location.split(",")
        var cityName = locationSplit[0]
        var stateCode = locationSplit[1]
        var countryCode = locationSplit[2]
        message.reply("Fetching weather for " + cityName + ", " + stateCode + ", " + countryCode + "...")
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +","+ stateCode + "," + countryCode + "&appid=" + apiKeys.weatherToken;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(weatherResult => {
                if(weatherResult.cod === "404") {
                    message.reply("Please try again. Something is not quite right." + "\n"
                                 + "Please follow the format of $!weather {City}, {State Abbreviation}, {Country Abbreviation}" + "\n"
                                 + "You may omit state name if N/A or unknown. In this case the format is: " + "\n"
                                 + "$!weather {City}, {Country Abbreviation}")
                }
                else {
                    message.reply("Current Weather: \n"
                                + "Location: " + weatherResult.name + ", " + weatherResult.sys.country + "\n"
                                + "Forecast: " + weatherResult.weather[0].main + ", " + weatherResult.weather[0].description + "\n"
                                + "Current Temperature: " + Math.round((((weatherResult.main.temp - 273.15) * 9) / 5) + 32) + "°F\n"
                                + "Feels Like: " + Math.round((((weatherResult.main.feels_like - 273.15) * 9) / 5) + 32) + "°F\n"
                                + "Low Temperature: " + Math.round((((weatherResult.main.temp_min - 273.15) * 9) / 5) + 32) + "°F\n"
                                + "High Temperature: " + Math.round((((weatherResult.main.temp_max - 273.15) * 9) / 5) + 32) + "°F\n"
                                + "Humidity: " + weatherResult.main.humidity
                    );
                }
            })
    }
})



//Botterson Stocks



  