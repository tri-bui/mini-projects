// Original data
const tableData = data;

// Table element on web page
var tbody = d3.select("tbody");


/**
 * This function clears the table currently being displayed on the page, and 
 * displays the data that is passed in.
 * @param {arr[obj]} data - data to display in the table
 */
function displayTable(data) {

    // Clear the table currently being displayed
    tbody.html("");

    // Unique values for each feature
    let cities = [];
    let states = [];
    let countries = [];
    let shapes = [];

    // Iterate through every object in the data
    data.forEach(dataObj => {

        // Unique values for each feature
        if (!cities.includes(dataObj['city'])) {
            cities.push(dataObj['city']);
        }
        if (!states.includes(dataObj['state'])) {
            states.push(dataObj['state']);
        }
        if (!countries.includes(dataObj['country'])) {
            countries.push(dataObj['country']);
        }
        if (!shapes.includes(dataObj['shape'])) {
            shapes.push(dataObj['shape']);
        }

        // Add a row to the HTML table
        let row = tbody.append("tr");

        // Iterate through the current object's values
        for (let key in dataObj) {
            let val = dataObj[key];

            // Title-case cities
            if (key == "city") {
                val = val.split(" ").map(
                    w => w[0].toUpperCase() + w.slice(1)
                ).join(" ");
            }

            // Upper-case states and countries
            if (["state", "country"].includes(key)) {
                val = val.toUpperCase();
            }

            // Add a data cell to the HTML row with the current object value
            let cell = row.append("td");
            cell.text(val);
        }
    });
    
    // Unique values for each feature
    console.log(cities);
    console.log(states);
    console.log(countries);
    console.log(shapes);
}


/**
 * This function filters the data based on user input.
 * @param {arr[obj]} data - data to filter
 * @param {str} filter - name of column to filter
 * @return {arrr[obj]} filtered data
 */
function filterData(data, filter) {
    let filteredData = data;

    // Extract user input
    let filterVal = d3.select("#" + filter).property("value").toLowerCase();

    // Filter the data based on input
    if (filterVal) {
        filteredData = filteredData.filter(row => row[filter] === filterVal);
    }

    return filteredData;
}


/**
 * This function defines what happens when the filter button is clicked. The 
 * data is filtered based on the selected date and this filtered data is then 
 * displayed in the table on the page.
 */
function filterButtonHandler() {
    // Initialize the filtered data to full data
    let filteredData = tableData;

    // Filter data
    filteredData = filterData(filteredData, "datetime");
    filteredData = filterData(filteredData, "city");
    filteredData = filterData(filteredData, "state");
    filteredData = filterData(filteredData, "country");
    filteredData = filterData(filteredData, "shape");

    // Display the filtered data on the page
    displayTable(filteredData);
}


// When the filter button is clicked, call its handler
d3.select("#filter-btn").on("click", filterButtonHandler);

// Display full table on load
displayTable(tableData);