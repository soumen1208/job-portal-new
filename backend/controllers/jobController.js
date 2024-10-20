import { Job } from './../models/jobModel.js';

//----------------------------------------------------------JOB_POST------------------------------------------------------------------------
//only admin can post
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId, experience } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experience) {
            return res.status(400).json({
                message: "Please find you have missed something",
                success: false,
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            position,
            company: companyId,
            experienceLevel: experience,
            created_by: userId,
        });
        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }

}

//----------------------------------------------------------GET_ALL_JOBS------------------------------------------------------------------------
//for student or job seekers
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "We have no jobs that keyword",
                success: false,
            })
        };
        return res.status(200).json({
            jobs,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

//----------------------------------------------------------GET_JOB_FIND_BY_ID------------------------------------------------------------------------
//for student and job seekers
export const getJobsFindById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications'
        });
        if (!job) {
            return res.status(404).json({
                message: "We have no jobs that id or job not found",
                success: false,
            })
        };
        return res.status(200).json({
            job,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

//----------------------------------------------------------ADMIN_HOW_MUCH_JOB_POSTING------------------------------------------------------------------------

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company'
        });
        if (!jobs) {
            return res.status(404).json({
                message: "You are not create any job",
                success: false,
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


