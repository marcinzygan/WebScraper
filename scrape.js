const axios = require("axios");
const cheerio = require("cheerio");
const url =
  "https://www.amazon.co.uk/Apple-24-inch-8%E2%80%91core-7%E2%80%91core-ports/dp/B0932Y7SLQ?ref_=ast_slp_dp&th=1";

async function scrape() {
  //fetch data
  const { data } = await axios.get(url);
  console.log(data);
}

scrape();
