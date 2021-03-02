// Original data
const tableData = data;

// Table element on web page
var tbody = d3.select("tbody");


/**
 * Clear the table currently being displayed on the page and display the data 
 * that is passed in.
 * @param {arr[obj]} data - data to display in the table
 */
function displayTable(data) {
    tbody.html(""); // clear the table

    // Iterate through every object in the data
    data.forEach(obs => {
        let row = tbody.append("tr"); // add a row to the table

        // Fill row with data
        Object.entries(obs).forEach(([key, val]) => {

            // Title-case cities
            if (key == 'city') {
                val = val.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
            }

            // Uppercase states and countries
            if (['state', 'country'].includes(key)) {
                val = val.toUpperCase();
            }

            // Add value to cell
            row.append("td").text(val)
        });
    });
}


/**
 * Filter the data based on user input.
 * @param {arr[obj]} data - data to filter
 * @return {arr[obj]} filtered data
 */
function filterData(data) {
    let filtered = data;
    let inputTypes = ["input", "select"]; // 4 `input` elements and 1 `select` element

    // For each input type
    inputTypes.forEach(type => { // for each input type
        d3.selectAll(type).nodes().forEach(input => { // for each input of the given type
            let inputId = input.id; // input ID
            let inputVal = input.value.toLowerCase(); // input val

            // Filter data if there was an input value
            if (inputVal) {filtered = filtered.filter(row => row[inputId] === inputVal);};
        });
    });

    return filtered;
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
    filteredData = filterData(filteredData);

    // Display the filtered data on the page
    displayTable(filteredData);
}


// When the filter button is clicked, call its handler
d3.select("#filter-btn").on("click", filterButtonHandler);

// Display full table on load
displayTable(tableData);