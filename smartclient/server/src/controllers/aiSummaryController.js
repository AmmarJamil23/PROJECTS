const Project = require("../models/Project");
const Task = require("../models/Task");
const AIInteraction = require("../models/AIInteraction");
const logActivity = require("../utils/logActivity");
const AppError = require("../utils/appError");
const model = require("../utils/gemini");

const verifyProjectOwner = async (projectId, userId) => {
  return await Project.findOne({ _id: projectId, owner: userId });
};

exports.generateProjectSummary = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await verifyProjectOwner(projectId, req.user._id);
    if (!project) return next(new AppError("Project not found", 404));

    const tasks = await Task.find({ project: projectId });

    const prompt = `
      You are an expert AI project assistant.

      Project: ${project.name}
      Description: ${project.description}

      Tasks:
      ${tasks.map(t => `- ${t.title} [${t.status}]`).join("\n")}

      Generate a clear, structured project status summary including:
      - Overall progress
      - Completed tasks
      - Pending work
      - Risks/blockers
      - Next recommended steps
    `;

    // ---- Gemini Call ----
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: prompt }] }
      ],
    });

    const aiText = result.response.text();

    // ---- Save AI record ----
    const aiRecord = await AIInteraction.create({
      project: projectId,
      user: req.user._id,
      type: "summary",
      prompt,
      response: aiText,
      metadata: {
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",   // FIXED
      },
    });

    await logActivity({
      req,
      userId: req.user._id,
      action: "AI_SUMMARY_CREATED",
      targetType: "ai",
      targetId: aiRecord._id,
    });

    res.json({
      success: true,
      summary: aiText,
      record: aiRecord,
    });

  } catch (err) {
    next(err);
  }
};
