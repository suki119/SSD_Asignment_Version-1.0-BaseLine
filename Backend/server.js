const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const apiRoutes = require('./ApiRoutes/routes')
const app = express()
dotenv.config()
require('./Database/DbConnection')
const helmet = require('helmet');


const allowedOrigins = [
    'http://localhost:3000', // Allow requests from  local development environment
    'https://main--taupe-shortbread-314b46.netlify.app', // Allow requests from  Netlify-hosted frontend
];

//middle wares
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"], // Allow resources to be loaded from the same origin
            scriptSrc: ["'self'"], // Define allowed script sources
            styleSrc: ["'self'", 'https://fonts.googleapis.com'], // Define allowed style sources (e.g., Google Fonts)
            fontSrc: ["'self'", 'https://fonts.gstatic.com'], // Define allowed font sources (e.g., Google Fonts)
            imgSrc: ["'self'"], // Define allowed image sources
            // Add other directives as needed for your application
        },
    })
);

// Enable the "X-Content-Type-Options" header
app.use(helmet({ contentSecurityPolicy: false, noSniff: true }));


// Configure CORS middleware with allowed origins
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));


// Middleware to set X-Frame-Options header to DENY
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});


// Remove the "X-Powered-By" header
app.disable('x-powered-by');


app.use(express.json())
app.use("/api", apiRoutes)



const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Admin backend service one started on port ${port}`)
})
