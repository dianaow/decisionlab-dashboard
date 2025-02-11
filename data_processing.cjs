const fs = require('fs');
const path = require('path');

const fileInputName = path.join(__dirname, 'src/data/data1.tsv'); 
const fileOutputName = path.join(__dirname, 'src/data/data2.json');

fs.readFile(fileInputName, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const flatData = flattenData(data)

    const aggregatedResults = calculateAggregations(flatData);

    // Convert JSON array to string
    const jsonString = JSON.stringify(aggregatedResults, null, 2);

    // Write the JSON string to a file
    fs.writeFile(fileOutputName, jsonString, 'utf-8', err => {
        if (err) {
            console.error('Error writing the JSON file:', err);
        } else {
            console.log('JSON file created successfully:', fileOutputName);
        }
    });
});

function flattenData(dataString) {
    // Split the data into lines
    const lines = dataString.trim().split('\n');

    // Extract headers (first two rows)
    const provinceHeaders = lines[0].split('\t');
    const urbanicityHeaders = lines[1].split('\t').slice(4);

    // Ensure proper alignment of province names
    const provinces = [];
    for (let i = 0; i < provinceHeaders.length; i++) {
        provinces.push({
            province: provinceHeaders[i].trim(),
            urbanicity: urbanicityHeaders[i].trim()
        });
    }

    // Initialize array to store the flattened data
    const flattenedData = [];

    // Process each row after the header rows
    lines.slice(2).forEach(line => {
        const values = line.split('\t');
        
        // Extract base values
        const index = values[0].trim();
        const attribute = values[1].trim();
        const innovation = values[2].trim();
        const adoption = values[3].trim();

        // Process each province-urbanicity pair
        for (let i = 0; i < provinces.length; i++) {
            const { province, urbanicity } = provinces[i];
            const value = values[i + 4]?.trim(); // Adjust column index

            if (value) {
                flattenedData.push({
                    index,
                    attribute,
                    innovation,
                    adoption,
                    province,
                    urbanicity,
                    value: parseFloat(value) || value
                });
            }
        }
    });

    return flattenedData;
}

function calculateAggregations(flatData) {
    // Helper function to create a key from attributes
    const makeKey = (row, level) => {
        switch(level) {
            case 'level0': // Province+Urbanicity+Innovation+Adoption+Attribute+Index
                return `${row.province}_${row.urbanicity}_${row.innovation}_${row.adoption}_${row.attribute}_${row.index}`;
            case 'level1': // Province+Urbanicity+Innovation+Adoption+Attribute
                return `${row.province}_${row.urbanicity}_${row.innovation}_${row.adoption}_${row.attribute}`;
            case 'level2': // Province+Urbanicity+Innovation+Attribute
                return `${row.province}_${row.urbanicity}_${row.innovation}_${row.attribute}`;
            case 'level3': // Province+Urbanicity+Attribute
                return `${row.province}_${row.urbanicity}_${row.attribute}`;
            case 'level4': // Province+Attribute
                return `${row.province}_${row.attribute}`;
            case 'level5': // Attribute
                return row.attribute;
        }
    };

    // Initialize aggregation objects
    const aggregations = {
        level0: {},
        level1: {},
        level2: {},
        level3: {},
        level4: {},
        level5: {}
    };

    // Calculate sums for each level
    flatData.forEach(row => {
        const value = parseFloat(row.value) || 0;

        // Level 0: Province+Urbanicity+Innovation+Adoption+Attribute+Index
        const key0 = makeKey(row, 'level0');
        aggregations.level0[key0] = (aggregations.level0[key0] || 0) + value;

        // Level 1: Province+Urbanicity+Innovation+Adoption+Attribute
        const key1 = makeKey(row, 'level1');
        aggregations.level1[key1] = (aggregations.level1[key1] || 0) + value;

        // Level 2: Province+Urbanicity+Innovation+Attribute
        const key2 = makeKey(row, 'level2');
        aggregations.level2[key2] = (aggregations.level2[key2] || 0) + value;

        // Level 3: Province+Urbanicity+Attribute
        const key3 = makeKey(row, 'level3');
        aggregations.level3[key3] = (aggregations.level3[key3] || 0) + value;

        // Level 4: Province+Attribute
        const key4 = makeKey(row, 'level4');
        aggregations.level4[key4] = (aggregations.level4[key4] || 0) + value;

        // Level 5: Attribute
        const key5 = makeKey(row, 'level5');
        aggregations.level5[key5] = (aggregations.level5[key5] || 0) + value;
    });

    // Calculate percentages and format results
    const results = [];

    // Helper function to parse key components
    const parseKey = (key, level) => {
        const parts = key.split('_');
        switch(level) {
            case 'level0':
                return {
                    province: parts[0],
                    urbanicity: parts[1],
                    innovation: parts[2],
                    adoption: parts[3],
                    attribute: parts[4],
                    index: parts[5]
                };
            case 'level1':
                return {
                    province: parts[0],
                    urbanicity: parts[1],
                    innovation: parts[2],
                    adoption: parts[3],
                    attribute: parts[4]
                };
            case 'level2':
                return {
                    province: parts[0],
                    urbanicity: parts[1],
                    innovation: parts[2],
                    attribute: parts[3]
                };
            case 'level3':
                return {
                    province: parts[0],
                    urbanicity: parts[1],
                    attribute: parts[2]
                };
            case 'level4':
                return {
                    province: parts[0],
                    attribute: parts[1]
                };
            case 'level5':
                return {
                    attribute: parts[0]
                };
        }
    };

    // Process each level
    Object.entries(aggregations).forEach(([level, data]) => {
        Object.entries(data).forEach(([key, value]) => {
            const components = parseKey(key, level);

            // Use the next level up for `attributeTotal`
            let parentLevel = {
                level0: 'level1',
                level1: 'level2',
                level2: 'level3',
                level3: 'level4',
                level4: 'level5',
                level5: null // No higher level
            }[level];

            const parentKey = parentLevel ? makeKey(components, parentLevel) : null;
            const attributeTotal = parentKey ? aggregations[parentLevel][parentKey] : value;

            const percentage = attributeTotal ? (value / attributeTotal) * 100 : 100;

            results.push({
                level,
                ...components,
                value,
                percentage: parseFloat(percentage.toFixed(2)),
                attributeTotal
            });
        });
    });

    return results.sort((a, b) =>
        a.attribute.localeCompare(b.attribute) ||
        (a.province || '').localeCompare(b.province || '') ||
        (a.urbanicity || '').localeCompare(b.urbanicity || '')
    );
}
