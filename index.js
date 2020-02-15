// The  script here generates random proxies which is updated every 10minutes, you can get a proxy to reuse 
// in the app.js and index.js in future

// The script here scrapes a sample website (foxnews.com in this case)
// run node index.js

const request = require('request')
const cheerio = require('cheerio')

function proxyRotator(){
let ip_addresses = [];
let port_numbers = [];

request("https://sslproxies.org/", function(error, response, html) {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $("td:nth-child(1)").each(function(index, value) {
      ip_addresses[index] = $(this).text();
    });

    $("td:nth-child(2)").each(function(index, value) {
      port_numbers[index] = $(this).text();
    });
  } else {
    console.log("Error loading proxy, please try again");
  }

  ip_addresses.join(", ");
  port_numbers.join(", ");

  console.log("IP Addresses:", ip_addresses);
  console.log("Port Numbers:", port_numbers);
  let random_number = Math.floor(Math.random() * 100)
  console.log(random_number)
  let proxy = `http://${ip_addresses[random_number]}:${port_numbers[random_number]}`;
  console.log(proxy);
});
 }
 const options = {
    url:
      "https://www.foxnews.com/",
    method: "GET",
    proxy: proxyRotator()
  };
  
  request(options, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let article_headings = $("h2").text();
      console.log(article_headings);
    } else {
      console.log("Error scraping site, please try again");
    }
  });

module.exports = proxyRotator;
  

