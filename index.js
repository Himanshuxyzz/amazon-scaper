const express = require("express");
const request = require("request-promise");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 4001; //this means if there are no specified ports then PORT WILL be 8080
//api
// const apiKey = "657d3567ca978b6b4c80ef84017a68a5";
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScrapperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// console.log(app)

app.use(express.json());
//root route
app.get("/", (req, res) => {
  res.send("Welcome To Amazon Scrapper Api");
});

//get product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.in/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//get product reveiws
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.in/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//get product offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.in/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//search products
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.in/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));

//curl "http://api.scraperapi.com?api_key=657d3567ca978b6b4c80ef84017a68a5&autoparse=ture&url=https://www.amazon.com/dp/B07DQWXVHC"
//with api_key "http://localhost:4001/products/B085J1DRPF?api_key=657d3567ca978b6b4c80ef84017a68a5"
//link- "https://ht-amazon-scraper.herokuapp.com/"
