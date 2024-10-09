const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
require('dotenv').config();
const Property = require('./models/Property'); // Adjust the path if needed

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();

    const properties = [];

    fs.createReadStream('./dataset.csv') // Adjust the path if needed
        .pipe(csv())
        .on('data', (row) => {
            // Transform data types as necessary
            properties.push({
                Name: row.Name,
                Bedrooms: Number(row.Bedrooms), // Convert to number
                Price: Number(row.Price),
                Location: row.Location,
                Total_Area: Number(row.Total_Area), // Convert to number
                Description: row.Description,
                Baths: Number(row.Baths), // Convert to number
                Balcony: row.Balcony.toLowerCase() === 'true', // Convert string to boolean
            });
        })
        .on('end', async () => {
            try {
                await Property.insertMany(properties);
                console.log('Data Imported Successfully!');
            } catch (error) {
                console.error(`Error importing data: ${error.message}`);
            } finally {
                mongoose.connection.close(); // Close the connection
            }
        });
};

importData();
