import { Company } from "../models/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";


// ----------------------------------------------------- REGISTER_COMPANY --------------------------------------------------------------

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            })
        };
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can not register same company, please thinking other name of the company ",
                success: false,
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id,
        })

        return res.status(201).json({
            message: "company registered successfully",
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// ----------------------------------------------------- GET_COMPANY --------------------------------------------------------------

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logedin userID
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false,
            })
        };
        return res.status(200).json({
            companies,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

// ----------------------------------------------------- GET_COMPANY_BY_ID --------------------------------------------------------------

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company is not found",
                success: false,
            })
        };

        return res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// ----------------------------------------------------- UPDATE_COMPANY--------------------------------------------------------------

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        //cloudinary
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        // update all information
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        };
        return res.status(200).json({
            message: "You successfully updated the company",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
