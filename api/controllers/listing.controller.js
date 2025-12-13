import Listing from "../models/listing.model.js"
export const createListing = async (req, res, next) => {
  try {
    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    const listing = await Listing.create({
      ...req.body,
      imageUrls,
      userRef: req.user.id
    });
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}