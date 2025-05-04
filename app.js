const express = require('express');
const setRoutes = require('./src/routes/taskRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

app.use(express.json());
setRoutes(app);
app.use(errorHandler);

// Start the server only if this file is run directly
if (require.main === module) {
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
}
module.exports = app;