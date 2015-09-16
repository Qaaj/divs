module.exports = function(input) {
    var info = input.replace(/['"]/g, ''),
        lines = info.split('\n'),
        firstLine = lines.shift().split('\t'),
        json = [];

    // Helper function to remove quotes
    // and parse numeric values
    var removeQuotes = function(string) {
        string = string.replace(/(['"])/g, "\\$1");
        if (!isNaN(string)) {
            string = parseFloat(string);
        }
        return string;
    };

    for (var i = 0; i < lines.length; i++) {
        var item = lines[i];
        var index = i;
         var lineItem = item.split('\t'),
            jsonLineEntry = {};

            for (var j = 0; j < lineItem.length; j++) {
                var item2 = lineItem[j]
                var index2 = j;
                jsonLineEntry[firstLine[index2]] = removeQuotes(item2);
            };
       
        json.push(jsonLineEntry);

    };

   

    return json;

};