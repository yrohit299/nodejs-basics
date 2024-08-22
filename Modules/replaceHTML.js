module.exports = function replaceHTML(template, item) {
    let output = template.replace('{{%IMAGE%}}', item.thumbnail);
  output = output.replace('{{%TITLE%}}', item.title);
  output = output.replace('{{%DESCRIPTION%}}', item.description);
  output = output.replace('{{%PRICE%}}', item.price);
  output = output.replace('{{%DISCOUNT%}}', item.discountPercentage);
  output = output.replace('{{%CATEGORY%}}', item.category);
  output = output.replace('{{%BRAND%}}', item.brand);
  output = output.replace('{{%RATING%}}', item.rating);
  output = output.replace('{{%ID%}}', item.id);
  output = output.replace('{{%PRODUCT_IMAGE%}}', item.images[0]);
  output = output.replace('{{%IN_STOCKS%}}', item.availabilityStatus);
  output = output.replace('{{%STOCKS%}}', item.stock);

  return output;
}