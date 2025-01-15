const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { connectToMongoDB } = require('./server'); 

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB with improved error handling
connectToMongoDB()
    .then(db => {
        const userRoutes = require('./routes/userRoutes')(db); 
        app.use('/api/users', userRoutes);

        app.get('/', (req, res) => {
            res.send('API is working!');
        });
    })
    .catch(err => {
        console.error('Critical error: Failed to connect to MongoDB. Exiting.', err);
        process.exit(1); //Exit process with error code.
    });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
