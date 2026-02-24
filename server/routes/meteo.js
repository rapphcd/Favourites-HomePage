const fs = require("fs");
const axios = require('axios');

module.exports = function(app){

    app.get("/meteo", async (req, res) => {
        const plon = req.query.lon;
        const plat = req.query.lat;
        const key = process.env.WEATHER_KEY;

        fs.readFile('./meteo.json', 'utf8', async (err, json) => {
            if (err) throw err;
            const meteos = JSON.parse(json);

            const lon = Math.round(plon * 1000) / 1000;
            const lat = Math.round(plat * 1000) / 1000;

            const currentTimestamp = Date.now();

            let newMeteo = [];
            let isCached = false;
            let cachedMeteo = null;

            for (let meteo in meteos) {
                if (currentTimestamp - meteos[meteo].timestamp <= 7200000) {
                    newMeteo.push(meteos[meteo]);
                    if (meteos[meteo].lon === lon && meteos[meteo].lat === lat) {
                        isCached = true;
                        cachedMeteo = meteos[meteo];
                        break;
                    }
                }
            }

            if (isCached) {
                res.json({meteo: cachedMeteo});
            } else {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${plat}&units=metric&lon=${plon}&appid=${key}`)

                if (response.data.cod !== 200) {

                    res.json({
                        meteo: {
                            success: false,
                            temp: "",
                            main: "",
                            description: "",
                            city: "",
                            country: "",
                            icon: "",
                            timestamp: Date.now(),
                            lon: lon,
                            lat: lat
                        }
                    });
                } else {
                    let meteoToCache = {
                        success: true,
                        temp: response.data.main.temp,
                        main: response.data.weather[0].main,
                        description: response.data.weather[0].description,
                        city: response.data.name,
                        country: response.data.sys.country,
                        icon: response.data.weather[0].icon,
                        timestamp: Date.now(),
                        lon: lon,
                        lat: lat
                    };

                    newMeteo.push(meteoToCache);

                    res.json({
                        meteo: meteoToCache
                    });
                }
            }

            fs.writeFile('./meteo.json', JSON.stringify(newMeteo), (err) => {
                if (err) throw err;
            })
        });
    })

}
