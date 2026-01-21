import { Request, Response } from "express";

const uploadPdf = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Upload endpoint ready"
  });
};

module.exports = { uploadPdf };
