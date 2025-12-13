import cloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";
export const createListing = async (req, res, next) => {
  try {
    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    const imagePublicIds = req.files ? req.files.map(file => file.filename) : [];
    const listing = await Listing.create({
      ...req.body,
      imageUrls,
      imagePublicIds,
      userRef: req.user.id
    });
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
      return next(errorHandler(404, 'Listing not found'))
    }
    if (req.user.id != listing.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings'))
    }
    if (listing.imagePublicIds && listing.imagePublicIds.length > 0) {
      try {
        const deletePromises = listing.imagePublicIds.map(async (publicId) => {
          return await cloudinary.uploader.destroy(publicId)
        })
        await Promise.all(deletePromises)
      } catch (error) {
        next(error)
      }
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Listing delete successfully',
      success: false
    })
  } catch (error) {
    next(error)
  }
}

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found'))
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You only edit if u are autherized'))
    }
    if (req.files && req.files.length > 0) {
      if (listing.imagePublicIds && listing.imagePublicIds.length > 0) {
        const deletePromises = listing.imagePublicIds.map(async (publicId) => {
          return await cloudinary.uploader.destroy(publicId)
        })
        await Promise.all(deletePromises)
      }
      const newImageUrls = req.files.map(file => file.path)
      const newImagePublicIds = req.files.map(file => file.filename);
      const updateListing = await Listing.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          imageUrls: newImageUrls,
          imagePublicIds: newImagePublicIds
        },
        { new: true }
      )
      return res.status(200).json(updateListing)
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      id.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedListing)

  } catch (error) {
    next(error)
  }
}