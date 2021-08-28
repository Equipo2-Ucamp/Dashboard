import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());

const port = process.env.PORT;
const apiBaseUrl = process.env.API_BASE_URL;
const apiUrl = process.env.API_URL;

const buildGetDataCOVID19 = function ( apiBaseUrl, apiUrl, type ) {
    switch ( type ) {
      case 1:
            return `${apiBaseUrl}${apiUrl}`.replace('%value%', 'cases');
      break;
      case 2:
            return `${apiBaseUrl}${apiUrl}`.replace('%value%', 'history');
      break;
      case 3:
            return `${apiBaseUrl}${apiUrl}`.replace('%value%', 'vaccines');
      break;
      default:
      break;
    }
}

const url = buildGetDataCOVID19( apiBaseUrl, apiUrl, 1 );
const urlHistory = buildGetDataCOVID19( apiBaseUrl, apiUrl, 2 );
const urlVaccines = buildGetDataCOVID19( apiBaseUrl, apiUrl, 3 );

const params = {};
const paramsHist = {};
const paramsVaccines = {};

app.get('/stats', async (req, res) => {
  const { country } = req.query
  params.country = country;
  try {
      const response = await axios({
        method: 'get',
        url: url,
        params
      }).then( (result) => {
        return result.data;
      }).catch( (err) => {
        throw err;
      })
      
      res.send(response)
  } catch (error) {
      console.error(error);
  }
})

app.get('/hist', async (req, res) => {
  const { country, status, initialDate, finalDate } = req.query
  paramsHist.country = country;
  paramsHist.status = status;

  try {
      const response = await axios({
        method: 'get',
        url: urlHistory,
        params: paramsHist
      }).then( (result) => {
        return result.data
      }).catch( (err) => {
        throw err;
      })
      
      res.send(response)
  } catch (error) {
      console.error(error);
  }
})

app.get('/vac', async (req, res) => {
  const { country } = req.query
  paramsVaccines.country = country;
  
  try {
      const response = await axios({
        method: 'get',
        url: urlVaccines,
        params: paramsVaccines
      }).then( (result) => {
        return result.data
      }).catch( (err) => {
        throw err;
      })
      
      res.send(response)
  } catch (error) {
      console.error(error);
  }
})

app.listen(port, function () {
  console.log(`listening at http://localhost:${port}`)
})
