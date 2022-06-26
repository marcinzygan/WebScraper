const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myPhoneNumber = process.env.PHONE_NUMBER;
const client = require("twilio")(accountSID, authToken);
const url =
  "https://www.amazon.co.uk/Apple-24-inch-8%E2%80%91core-7%E2%80%91core-ports/dp/B0932Y7SLQ?ref_=ast_slp_dp&th=1";

//Set interval
const handle = setInterval(scrape, 20000);

const product = { name: "", price: "", link: "" };
async function scrape() {
  //fetch data
  const { data } = await axios.get(url);
  //Load HTML
  const $ = cheerio.load(data);
  const item = $("div#dp-container");
  //Extract data that we need
  product.name = $(item).find("h1 span#productTitle").text();
  product.link = url;
  const price = $(item)
    .find("span .a-price-whole")
    .first()
    .text()
    .replace(/[,.]/g, "");
  const priceNum = parseInt(price);
  product.price = priceNum;
  console.log(product);

  // Send sms

  if (priceNum < 1000) {
    client.messages
      .create({
        body: `The price of ${product.name} went below ${product.price}. Purchase it from ${url}`,
        from: "+19784945479",
        to: `${myPhoneNumber}`,
      })
      .then((message) => {
        console.log(message);
        clearInterval(handle);
      });
  }
}

scrape();
