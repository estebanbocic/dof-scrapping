# Web Scraping with Node.js Dollar exchange MEXICO from DOF

This is a Node.js script for web scraping and saving data from a website's table as JSON.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine. You can download it from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/estebanbocic/dof-scrapping
2. Get inside the project folder

    ```bash
    cd dof-scrapping
3. Install project dependencies using npm:

    ```bash
    npm install
## Usage
1. Open the scraper.js file in your code editor.
2. Edit the following variables to customize the scraping process:
2.1 'url': Replace with 'https://yourURL.com. (This is the URL you want to scrape)
2.2 table-selector: Replace 'table-selector' with the appropriate CSS selector for the table you want to scrape. (you may use the table selector given by Chrome inspect element)
2.3 filename: Replace 'scraped-data.json' with the desired filename for the JSON output.
3. Save your changes.
4. Run the scraping script using the following command:

    ```bash
    node dof-scrapping.js
5. scraped-data.json will have the scraped data from the URL.
