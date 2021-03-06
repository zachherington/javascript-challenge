// from data.js
var tableData = data;

//// Using D3 to select objects in the HTML code ////

// HMTL Script references
var output_table = d3.select("tbody"); 
var filter_button = d3.select("#filter-btn");
var date_criteria = d3.select("#datetime");

//// Retrieve all Keys from JSON ////
var key_list = Object.keys(tableData[0])
    // console.log(key_list);


//// Default fill HTML Table with All Data ////
var input_data = (data_source) => {
    data_source.forEach(sighting => {
        var new_row = output_table.append("tr");
        
        key_list.forEach(key => {
            new_row.append("td").text(sighting[key]);
    });
});
}
input_data(tableData);



//// Button Select Function ////
filter_button.on("click", function() {
    d3.event.preventDefault();

    var input_date = date_criteria.property("value").trim();
    var date_filter = tableData.filter(tableData => tableData.datetime === input_date);

    output_table.html("");

    if (date_filter.length !== 0){
        input_data(date_filter);
    }
    else if (date_filter.length === 0){
        input_data(tableData);
    }
    else {
        output_table.append("tr").append("td").text("No results found.");
    }
});
