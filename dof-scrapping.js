const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs'); // Import the fs module for file operations


// Define the URL you want to scrape
const url = 'https://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&dfecha=17%2F11%2F2023&hfecha=17%2F11%2F2023#gsc.tab=0'; // Replace with the URL you want to scrape

// Create an instance of axios with custom agent that trusts SSL certificates
const agent = new https.Agent({
  rejectUnauthorized: false // Trust SSL certificates (not recommended for production)
});

const axiosInstance = axios.create({
  httpsAgent: agent
});

// Function to fetch the HTML content of the URL
async function fetchHTML(url) {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to scrape and format data as JSON
function scrapeAndFormatAsJSON(html) {
    const $ = cheerio.load(html);
    const result = [];
  
    // Assuming the table you want to scrape has a specific ID or class,
    // replace 'table-selector' with the appropriate selector
    const table = $('#tdcontent > table > tbody > tr > td:nth-child(1) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table'); // Replace with your table selector
  
    // Process the table data here
    table.find('tr').each((index, row) => {
      const columns = $(row).find('td'); // Assuming table cells are in <td> elements
  
      // Extract data from each column as needed
      const data1 = $(columns[0]).text().trim(); // Replace [0] with the appropriate column index
      const data2 = $(columns[1]).text().trim(); // Replace [1] with the appropriate column index
  
      // Create an object for each row and store the data
      const rowData = {
        data1,
        data2
      };
  
      // Push the row data to the result array
      result.push(rowData);
    });
  
    return result;
  }
  
  // Function to save JSON data to a file
  function saveJSONToFile(data, filename) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filename}`);
  }
  
  // Main function to initiate the scraping and saving process
  async function main() {
    try {
      const html = await fetchHTML(url);
      const jsonData = scrapeAndFormatAsJSON(html);
  
      // Define the filename where you want to save the JSON data
      const filename = 'scraped-data.json';
  
      // Save the JSON data to the file
      saveJSONToFile(jsonData, filename);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  // Call the main function to start scraping and saving as JSON
  main();