// Import required modules
const axios = require('axios'); // For making HTTP requests
const cheerio = require('cheerio'); // For parsing HTML
const fs = require('fs'); // For file operations

// Define the URL you want to scrape
const url = 'https://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&dfecha=17%2F10%2F2023&hfecha=17%2F11%2F2023#gsc.tab=0';

// Create an instance of axios with a custom agent that trusts SSL certificates
const axiosInstance = axios.create({
  httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) // Trust SSL certificates (not recommended for production)
});

// Function to fetch the HTML content of the URL
const fetchHTML = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to scrape and format data as JSON
const scrapeAndFormatAsJSON = (html) => {
  const $ = cheerio.load(html); // Load HTML content into Cheerio
  const result = [];

  // Assuming the table you want to scrape has a specific ID or class,
  // replace 'table-selector' with the appropriate selector
  const table = $('#tdcontent > table > tbody > tr > td:nth-child(1) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table');

  // Process each row of the table
  table.find('tr').each((index, row) => {
    const columns = $(row).find('td'); // Find all <td> elements in the row
    const dof_date = $(columns[0]).text().trim(); // Extract text from the first column
    const dof_exchange = $(columns[1]).text().trim(); // Extract text from the second column

    // Create an object for each row and store the data
    result.push({ dof_date, dof_exchange });
  });

  return result;
};

// Function to save JSON data to a file
const saveJSONToFile = (data, filename) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2)); // Write JSON data to a file
  console.log(`Data saved to ${filename}`);
};

// Main function to initiate the scraping and saving process
const main = async () => {
  try {
    const html = await fetchHTML(url); // Fetch HTML content from the URL
    const jsonData = scrapeAndFormatAsJSON(html); // Scrape and format data as JSON

    // Define the filename where you want to save the JSON data
    const filename = 'scraped-data.json';

    // Save the JSON data to the file
    saveJSONToFile(jsonData, filename);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Call the main function to start scraping and saving as JSON
main();