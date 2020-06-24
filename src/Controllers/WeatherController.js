const City = require('../Models/City');
const axios = require('axios');

module.exports = {
    async get(req, res) {
        try {
            let { city } = req.params, status = 200;
            const key = process.env.OPEN_WEATHER_KEY;
            
            city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //remove acentos

            const { data } = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${key}`
            );

            const { weather, main, wind, name, sys } = data;
            const response = {
                feelsLike: main.feels_like,
                tempNow: main.temp,
                tempMin: main.temp_min,
                tempMax: main.temp_max,
                humidity: main.humidity,
                windSpeed: wind.speed,
                weather: weather[0].description,
                city: name,
                country: sys.country,
                updatedAt: new Date(),
                icon: `http://openweathermap.org/img/w/${weather[0].icon}.png`
            }

            //Verifica se a cidade já foi buscada anteriormente
            const query = await City.findOne({ name });
            
            //incrementa contador e data de atualização se a cidade já tiver cido buscada antes
            if(query) {
                await City.updateOne(
                    { _id: query.id }, { $set: { count: query.count +1, updatedAt: new Date() }}
                );
            }
            //cria novo registro da cidade buscada
            else {
                status = 201;
                await City.create({ name, count: 1});
            }
            
            req.io.emit('reloadHistory', {reload: true});

            res.status(status).send({ status: true, response });

        } catch (error) {
            let err = error.stack || error.errors || error.message || error.response || error;
            
            let status = 500;
            if(error.response.data.cod) {
                status = error.response.data.cod;
                err = error.response.data.message;
            }
            console.log('Error Search City', status, err);
            
            res.status(status).send({ status: false, response: err });
        }
    },

    async history(req, res) {
        try {
            const query = await City.find().sort({ updatedAt: 'desc'});

            res.status(200).send({ status: true, response: query });
            
        } catch (error) {
            const err = error.stack || error.errors || error.message || error;
            console.log(err);

            res.status(500).send({ status: false, response: err });
        }
    },

    async top(req, res) {
        try {
            const query = await City.find().sort({ count: 'desc' }).limit(5);

            res.status(200).send({ status: true, response: query });
            
        } catch (error) {
            const err = error.stack || error.errors || error.message || error;
            console.log(err);

            res.status(500).send({ status: false, response: err });
        }
    }
}