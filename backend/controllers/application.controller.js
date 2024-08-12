import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
      const userId = req.id;
      const jobId = req.params.id;
      if (!jobId) {
        return res.status(400).json({
          message: "Job is required",
          success: false,
        });
      }
  
      // Check if user already applied for this job
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: userId,
      });
  
      if (existingApplication) {
        return res.status(400).json({
          message: "You have already applied for this job",
          success: false,
        });
      }
  
      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          message: "Job not found",
          success: false,
        });
      }
  
      // Create a new application
      const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
      });
  
      // Ensure job.applications is an array
      if (!Array.isArray(job.applications)) {
        job.applications = [];
      }
      job.applications.push(newApplication._id);
      await job.save();
  
      return res.status(200).json({
        message: "Job applied successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error', success: false });
    }
  };
  

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        messsage: "Applications not found",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(401).json({
        messsage: "Status is required",
        success: false,
      });
    }

    //find the aplication by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        messsage: "Application not found",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      messsage: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
