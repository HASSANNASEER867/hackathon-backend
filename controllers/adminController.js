const LoanApplication = require('../models/LoanApplication');
const generateToken = require('../utils/generateToken'); // Import the token generation utility
const moment = require('moment');

// 1. View all loan applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await LoanApplication.find(); // Fetch all loan applications
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
};

// 2. Filter applications by city and country
const filterApplications = async (req, res) => {
    const { city, country } = req.query;

    try {
        const filterCriteria = {};
        if (city) filterCriteria.city = city;
        if (country) filterCriteria.country = country;

        const filteredApplications = await LoanApplication.find(filterCriteria);
        res.status(200).json(filteredApplications);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering applications', error });
    }
};

// 3. Add a token number to an application
const addTokenNumber = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await LoanApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Generate a new token number for this application
        const tokenNumber = generateToken();

        // Update the application with the token number
        application.tokenNumber = tokenNumber;
        await application.save();

        res.status(200).json({
            message: 'Token number added successfully',
            tokenNumber,
            application
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding token number', error });
    }
};

// 4. Update application status (e.g., approved, rejected)
const updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    try {
        const application = await LoanApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Update the application status
        application.status = status;
        await application.save();

        res.status(200).json({
            message: 'Application status updated successfully',
            application
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating application status', error });
    }
};

module.exports = {
    getAllApplications,
    filterApplications,
    addTokenNumber,
    updateApplicationStatus
};
