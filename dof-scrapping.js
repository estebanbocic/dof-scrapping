const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&dfecha=17%2F10%2F2023&hfecha=17%2F11%2F2023#gsc.tab=0';

const axiosInstance = axios.create({
  httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
});

const fetchHTML = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const scrapeAndFormatAsJSON = (html) => {
  const $ = cheerio.load(html);
  const result = [];

  const table = $('#tdcontent > table > tbody > tr > td:nth-child(1) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table');

  table.find('tr').each((index, row) => {
    const columns = $(row).find('td');
    const dof_date = $(columns[0]).text().trim();
    const dof_exchange = $(columns[1]).text().trim();

    result.push({ dof_date, dof_exchange });
  });

  return result;
};

const saveJSONToFile = (data, filename) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filename}`);
};

const main = async () => {
  try {
    const html = await fetchHTML(url);
    const jsonData = scrapeAndFormatAsJSON(html);
    saveJSONToFile(jsonData, 'scraped-data.json');
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
