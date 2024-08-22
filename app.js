const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceHTML = require('./Modules/replaceHTML');

const html = fs.readFileSync('./templates/index.html', 'utf-8');
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
const productListingHtml = fs.readFileSync(
  './templates/products-listing.html',
  'utf-8'
);
const productDetailsHtml = fs.readFileSync(
  './templates/product-details.html',
  'utf-8'
);

// function replaceHTML(template, item) {
//     let output = template.replace('{{%IMAGE%}}', item.thumbnail);
//   output = output.replace('{{%TITLE%}}', item.title);
//   output = output.replace('{{%DESCRIPTION%}}', item.description);
//   output = output.replace('{{%PRICE%}}', item.price);
//   output = output.replace('{{%DISCOUNT%}}', item.discountPercentage);
//   output = output.replace('{{%CATEGORY%}}', item.category);
//   output = output.replace('{{%BRAND%}}', item.brand);
//   output = output.replace('{{%RATING%}}', item.rating);
//   output = output.replace('{{%ID%}}', item.id);
//   output = output.replace('{{%PRODUCT_IMAGE%}}', item.images[0]);
//   output = output.replace('{{%IN_STOCKS%}}', item.availabilityStatus);
//   output = output.replace('{{%STOCKS%}}', item.stock);

//   return output;
// }

// const productHtmlArray = products.data.map((item) => {
//   let output = productListingHtml.replace('{{%IMAGE%}}', item.thumbnail);
//   output = output.replace('{{%TITLE%}}', item.title);
//   output = output.replace('{{%DESCRIPTION%}}', item.description);
//   output = output.replace('{{%PRICE%}}', item.price);
//   output = output.replace('{{%DISCOUNT%}}', item.discountPercentage);
//   output = output.replace('{{%CATEGORY%}}', item.category);
//   output = output.replace('{{%BRAND%}}', item.brand);
//   output = output.replace('{{%RATING%}}', item.rating);
//   output = output.replace('{{%ID%}}', item.id);

//   return output;
// });
const server = http.createServer((request, response) => {
  let { query, pathname } = url.parse(request.url, true);
  if (pathname === '/' || pathname.toLocaleLowerCase() === '/home') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html.replace('{{%content%}}', 'You are in home page!'));
  } else if (pathname.toLocaleLowerCase() === '/about') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html.replace('{{%content%}}', 'You are in about page!'));
  } else if (pathname === '/products') {
    if (!query.id) {
        let productHtmlArray = products.data.map((product) => {
            return replaceHTML(productListingHtml, product);
        })
      let productResponseHTML = html.replace(
        '{{%content%}}',
        productHtmlArray.join(',')
      );
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(productResponseHTML);
    } else {
        let product = products.data[query.id-1];
        let productResponseHTML = replaceHTML(productDetailsHtml, product);
      response.end(html.replace('{{%content%}}',productResponseHTML));
    }
  } else {
    response.writeHead(404);
    response.end(html.replace('{{%content%}}', 'Error 404: page not found'));
  }
  // console.log('request received......');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server started');
});
