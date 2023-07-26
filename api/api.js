// api.js
import Express from "express";
import axios from "axios";
import { jobPostSchema, API_KEY, MODEL } from "../constants/constants.js";
import removeUnwantedChars from "../helpers/removeUnwantedChars.js";
import checkForEmptyRequiredFields from "../helpers/checkForEmpty.js";
import middleware from "../middlewares/middleware.js";
import { body, validationResult } from "express-validator";
import Ajv from "ajv";

const app = Express();

// Apply middlewares
app.use(middleware);

// Validate the request body against the JSON schema
const validateJobPost = (req, res, next) => {
  const ajv = new Ajv();
  const validate = ajv.compile(jobPostSchema);
  const valid = validate(req.body);

  if (!valid) {
    return res.status(400).json({ errors: validate.errors });
  }

  const errors = checkForEmptyRequiredFields(jobPostSchema, req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// API endpoint to handle the POST request
app.post(
  "/proposal",
  [
    body("job_details").isObject(),
    body("client_information").isObject(),
    body("proposed_solution").isObject(),
    body("tone").isString(),
  ],
  validateJobPost,
  (req, res) => {
    // Handle the validated request here
    // req.body contains the validated JSON object
    const jobPostData = req.body;
    console.log(jobPostData);

    // Process the data or save it to a database, etc.
    // ...

    res.status(200).json({ message: "Job post successfully received!" });
  }
);

// app.post("/proposal", async (req, res) => {
//   // route handler code for "/"
//   const TIME = req.query.time || 30;
//   const LOCATION = req.query.location || "none";
//   const EQUIPMENT = req.query.equipment || "none";
//   const MUSCLE = req.query.muscle || "none";

//   const key = `${MUSCLE}-${TIME}-${LOCATION}-${EQUIPMENT}`;

//   try {
//     // checking if data already exists
//     const db = client.db("test");
//     const workouts = db.collection("workouts");
//     const workoutPlanData = await workouts.findOne({ key });

//     if (workoutPlanData) {
//       res.send(workoutPlanData);
//     } else {
//       const Prompt = `
//   Give me a ${TIME} minute workout plan for ${MUSCLE} at ${LOCATION} with ${EQUIPMENT}. Please include a warmup and cooldown. Also specify the time period for each exercise. Give the result in following json format:${FORMAT}. Only JSON and no extra text and strictly follow the format. All these keys have array entry and please provide a valid json object. If you cannot generate plan, please give a valid json object explaining the error according to this schema {error:"description of error"}.`;
//       const headers = {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       };

//       const data = {
//         model: MODEL,
//         messages: [{ role: "user", content: Prompt }],
//       };
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         data,
//         { headers }
//       );
//       const cleanedRes = removeUnwantedChars(
//         response.data.choices[0].message.content
//       );
//       const workoutPlan = JSON.parse(cleanedRes);

//       // inserting data into db
//       workoutPlan.key = `${key}`;
//       await workouts.insertOne(workoutPlan);

//       console.log("Data Logged.");

//       res.send(workoutPlan);
//     }
//   } catch (error) {
//     throw error;
//   }
// });

app.get("/hello", async (req, res) => {
  res.send("Hello World");
});

export default app;
