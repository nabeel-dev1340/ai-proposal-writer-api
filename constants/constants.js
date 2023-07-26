import dotenv from "dotenv";
dotenv.config();

export const MODEL = "gpt-3.5-turbo";
export const PORT = process.env.PORT || 3030;
export const API_KEY = process.env.OPENAI_API_KEY;
export const jobPostSchema = {
  type: "object",
  properties: {
    job_details: {
      type: "object",
      properties: {
        job_title: { type: "string" },
        job_description: { type: "string" },
        qualification_required: { type: "string" },
        skills_required: { type: "string" },
        budget: { type: "number" },
        deadline: { type: "string" },
      },
      required: ["job_title", "job_description", "budget", "deadline"],
    },
    client_information: {
      type: "object",
      properties: {
        client_name: { type: "string" },
        client_background: { type: "string" },
      },
      required: ["client_name"],
    },
    proposed_solution: {
      type: "object",
      properties: {
        approach: { type: "string" },
        deliverables: { type: "string" },
        timeline: { type: "string" },
      },
      required: ["approach", "deliverables", "timeline"],
    },
    relevant_experience: {
      type: "object",
      properties: {
        company_individual_experience: { type: "string" },
        past_work_examples: { type: "string" },
      },
    },
    unique_selling_point: {
      type: "string",
    },
    tone: {
      type: "string",
      enum: ["formal", "casual", "professional"],
    },
  },
  required: ["job_details", "client_information", "proposed_solution", "tone"],
};
