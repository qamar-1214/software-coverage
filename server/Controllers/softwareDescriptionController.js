const SoftwareDescription = require("../models/softwareDescriptionModel");

// @desc Add Software Description
// @route POST /admin/software-description
// @access Private
exports.addSoftwareDescription = async (req, res) => {
    try {
        const { name, description, category, features } = req.body;

        // Create a new software description document
        const newSoftware = new SoftwareDescription({
            name,
            description,
            category,
            features,
        });

        await newSoftware.save();

        res.status(201).json({
            success: true,
            message: "Software description added successfully!",
            data: newSoftware,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
