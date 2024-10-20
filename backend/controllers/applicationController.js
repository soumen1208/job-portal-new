import { Job } from '../models/jobModel.js';
import { Application } from './../models/applicationModel.js';

//---------------------------------------------------------------APPLY_JOB-----------------------------------------------------------

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false,
            })
        };
        // check user for if he apply or already applied 
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this Job",
                success: false,
            })
        };

        // check the job exisrt or not 
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        };

        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

//------------------------------------------------------------GET_APPLIED_JOB-----------------------------------------------------------

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        }).sort({ createdAt: -1 });

        if (!application) {
            return res.status(404).json({
                message: "No application found",
                success: false,
            })
        };

        return res.status(200).json({
            application,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}


//---------------------------------------------------only admin can see how many people applied-----------------------------------------------------------

export const getApplicant = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: -1 } }
            }
        }).sort({ createdAt: -1 });

        if (!job) {
            return res.status(404).json({
                message: "Thare are no any Job and applicant",
                success: false,
            })
        };

        return res.status(200).json({
            job,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}

//---------------------------------------------------update status the applicant is selected or not-----------------------------------------------------------

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false,
            })
        };

        // find the application by applicationId
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "application not found",
                success: false,
            })
        };

        //update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated sucessfully",
            application,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

