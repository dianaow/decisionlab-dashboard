const fs = require('fs');
const path = require('path');

const fileInputName = path.join(__dirname, 'src/data/data.csv'); 
const fileOutputName = path.join(__dirname, 'src/data/data.json');

fs.readFile(fileInputName, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    const jsonArray = convertCSVToJSON(data)

    // Convert JSON array to string
    const jsonString = JSON.stringify(jsonArray, null, 2);

    // Write the JSON string to a file
    fs.writeFile(fileOutputName, jsonString, 'utf-8', err => {
        if (err) {
            console.error('Error writing the JSON file:', err);
        } else {
            console.log('JSON file created successfully:', fileOutputName);
        }
    });
});

function convertCSVToJSON(csvData) {
    // Split CSV into lines and remove empty lines
    const lines = csvData.split('\n').filter(line => line.trim());
    
    // Extract headers
    const headers = lines[0].split(',').map(h => h.trim());
    const subHeaders = lines[1].split(',').map(h => h.trim());
    
    // Initialize result object
    const result = {};
    
    // Get unique regions (excluding empty, "Total" and first two columns)
    const regions = headers.slice(2, -1).filter(h => h && h !== "Total");
    const uniqueRegions = [...new Set(regions)];
    
    // Initialize region structure with groupTotals
    const groupTotals = {};
    uniqueRegions.forEach(region => {
        result[region] = {
            Urban: {
                gender: [],
                ageGroup: [],
                householdIncome: [],
                householdComposition: [],
                housing: [],
                barriers: [],
                drivers: [],
                keyInformation: []
            },
            Rural: {
                gender: [],
                ageGroup: [],
                householdIncome: [],
                householdComposition: [],
                housing: [],
                barriers: [],
                drivers: [],
                keyInformation: []
            },
            Total: {
                gender: [],
                ageGroup: [],
                householdIncome: [],
                householdComposition: [],
                housing: [],
                barriers: [],
                drivers: [],
                keyInformation: []
            }
        };
        
        groupTotals[region] = {
            Urban: {},
            Rural: {},
            Total: {}
        };
    });

    // Initialize Total region structure
    result["Total"] = {
        Urban: {
            gender: [],
            ageGroup: [],
            householdIncome: [],
            householdComposition: [],
            housing: [],
            barriers: [],
            drivers: [],
            keyInformation: []
        },
        Rural: {
            gender: [],
            ageGroup: [],
            householdIncome: [],
            householdComposition: [],
            housing: [],
            barriers: [],
            drivers: [],
            keyInformation: []
        },
        Total: {
            gender: [],
            ageGroup: [],
            householdIncome: [],
            householdComposition: [],
            housing: [],
            barriers: [],
            drivers: [],
            keyInformation: []
        }
    };
    groupTotals["Total"] = {
        Urban: {},
        Rural: {},
        Total: {}
    };

    // First pass: Calculate group totals
    let currentSection = '';
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(',').map(v => v.trim());
        const type = values[1];

        // Determine current section based on type
        if (type === 'Gender') currentSection = 'gender';
        else if (type === 'Age Group') currentSection = 'ageGroup';
        else if (type === 'Household Income') currentSection = 'householdIncome';
        else if (type === 'Household Composition') currentSection = 'householdComposition';
        else if (type === 'Type of Housing') currentSection = 'housing';
        else if (type === 'Barriers') currentSection = 'barriers';
        else if (type === 'Drivers') currentSection = 'drivers';
        else if (type === 'Key Pieces of Information') currentSection = 'keyInformation';

        // Calculate totals for each region and section
        let totalUrban = 0;
        let totalRural = 0;
        
        uniqueRegions.forEach(region => {
            const regionIndex = headers.indexOf(region);
            if (!groupTotals[region].Urban[currentSection]) {
                groupTotals[region].Urban[currentSection] = 0;
                groupTotals[region].Rural[currentSection] = 0;
                groupTotals[region].Total[currentSection] = 0;
            }
            
            const urbanValue = parseInt(values[regionIndex]) || 0;
            const ruralValue = parseInt(values[regionIndex + 1]) || 0;
            
            totalUrban += urbanValue;
            totalRural += ruralValue;
            
            groupTotals[region].Urban[currentSection] += urbanValue;
            groupTotals[region].Rural[currentSection] += ruralValue;
            groupTotals[region].Total[currentSection] += urbanValue + ruralValue;
        });

        // Add to Total region totals
        if (!groupTotals["Total"].Urban[currentSection]) {
            groupTotals["Total"].Urban[currentSection] = 0;
            groupTotals["Total"].Rural[currentSection] = 0;
            groupTotals["Total"].Total[currentSection] = 0;
        }
        groupTotals["Total"].Urban[currentSection] += totalUrban;
        groupTotals["Total"].Rural[currentSection] += totalRural;
        groupTotals["Total"].Total[currentSection] += (totalUrban + totalRural)
    }

    // Second pass: Add data with correct percentages
    currentSection = '';
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(',').map(v => v.trim());
        const category = values[0].replace(/"/g, '');
        const type = values[1];
        const totalColumnValue = parseInt(values[values.length - 1]) || 0;

        // Determine current section
        if (type === 'Gender') currentSection = 'gender';
        else if (type === 'Age Group') currentSection = 'ageGroup';
        else if (type === 'Household Income') currentSection = 'householdIncome';
        else if (type === 'Household Composition') currentSection = 'householdComposition';
        else if (type === 'Type of Housing') currentSection = 'housing';
        else if (type === 'Barriers') currentSection = 'barriers';
        else if (type === 'Drivers') currentSection = 'drivers';
        else if (type === 'Key Pieces of Information') currentSection = 'keyInformation';

        // Process each region
        let totalUrban = 0;
        let totalRural = 0;

        uniqueRegions.forEach(region => {
            const regionIndex = headers.indexOf(region);
            const urbanValue = parseInt(values[regionIndex]) || 0;
            const ruralValue = parseInt(values[regionIndex + 1]) || 0;
            const totalValue = urbanValue + ruralValue;

            totalUrban += urbanValue;
            totalRural += ruralValue;

            // Add to each location with correct group-based percentages
            const addToSection = (location, value, groupTotal) => {
                if (groupTotal > 0) {
                    result[region][location][currentSection].push({
                        label: category,
                        value: value,
                        percentage: parseFloat(((value / groupTotal) * 100).toFixed(2))
                    });
                }
            };

            // Add to urban, rural, and total sections with their respective group totals
            addToSection('Urban', urbanValue, groupTotals[region].Urban[currentSection]);
            addToSection('Rural', ruralValue, groupTotals[region].Rural[currentSection]);
            addToSection('Total', totalValue, groupTotals[region].Total[currentSection]);
        });

        // Add to Total region
        const addToTotalSection = (location, value, groupTotal) => {
            if (groupTotal > 0) {
                result["Total"][location][currentSection].push({
                    label: category,
                    value: value,
                    percentage: parseFloat(((value / groupTotal) * 100).toFixed(2))
                });
            }
        };

        addToTotalSection('Urban', totalUrban, groupTotals["Total"].Urban[currentSection]);
        addToTotalSection('Rural', totalRural, groupTotals["Total"].Rural[currentSection]);
        addToTotalSection('Total', totalColumnValue, groupTotals["Total"].Total[currentSection]);
    }

    return result;
}