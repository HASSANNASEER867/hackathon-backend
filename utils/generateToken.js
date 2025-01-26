const { v4: uuidv4 } = require('uuid');

// Function to generate a unique token (UUID)
function generateToken() {
    return uuidv4(); // Generate a UUID
}

module.exports = generateToken;
