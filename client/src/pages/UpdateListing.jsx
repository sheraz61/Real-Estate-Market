import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateListing() {
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const params = useParams()
    const [files, setFiles] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
        imageUrls: []
    })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)
    const [uploadingNewImages, setUploadingNewImages] = useState(false)

    // Fetch listing data on component mount
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setFetchLoading(true)
                const listingId = params.id
                const res = await fetch(`/api/listing/get/${listingId}`)
                const data = await res.json()
                
                if (data.success === false) {
                    setError(data.message)
                    setFetchLoading(false)
                    return
                }
                
                setFormData(data)
                setFetchLoading(false)
            } catch (error) {
                setError('Failed to fetch listing')
                setFetchLoading(false)
            }
        }
        
        fetchListing()
    }, [params.id])

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files)
        
        if (selectedFiles.length > 6) {
            setError('You can only upload maximum 6 images')
            return
        }

        setFiles(selectedFiles)
        setUploadingNewImages(true)
        
        // Create preview URLs for new selected images
        const previews = selectedFiles.map(file => URL.createObjectURL(file))
        setImagePreviews(previews)
        setError(false)
        
        e.target.value = ''
    }

    const handleRemoveNewImage = (index) => {
        const newFiles = files.filter((_, i) => i !== index)
        setFiles(newFiles)
        
        URL.revokeObjectURL(imagePreviews[index])
        const newPreviews = imagePreviews.filter((_, i) => i !== index)
        setImagePreviews(newPreviews)
        
        if (newFiles.length === 0) {
            setUploadingNewImages(false)
        }
    }

    const handleCancelNewImages = () => {
        imagePreviews.forEach(url => URL.revokeObjectURL(url))
        setImagePreviews([])
        setFiles([])
        setUploadingNewImages(false)
    }

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            })
        }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!uploadingNewImages && formData.imageUrls.length < 1) {
                return setError('You must have at least one image')
            }
            if (+formData.regularPrice < +formData.discountPrice) {
                return setError('Discount price must be lower than regular price')
            }
            
            setLoading(true)
            setError(false)

            // Create FormData to send files + data
            const data = new FormData()
            
            // Only append images if user selected new ones
            if (uploadingNewImages && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    data.append('images', files[i])
                }
            }
            
            // Append all form fields
            data.append('name', formData.name)
            data.append('description', formData.description)
            data.append('address', formData.address)
            data.append('type', formData.type)
            data.append('bedrooms', formData.bedrooms)
            data.append('bathrooms', formData.bathrooms)
            data.append('regularPrice', formData.regularPrice)
            data.append('discountPrice', formData.discountPrice)
            data.append('offer', formData.offer)
            data.append('parking', formData.parking)
            data.append('furnished', formData.furnished)
            
            const res = await fetch(`/api/listing/update/${params.id}`, {
                method: 'POST',
                body: data,
            })
            
            const result = await res.json()
            setLoading(false)
            
            if (result.success === false) {
                setError(result.message)
            } else {
                imagePreviews.forEach(url => URL.revokeObjectURL(url))
                // navigate(`/listing/${result._id}`)
                navigate('/profile')
            }
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Update Listing</h1>
            
            {fetchLoading ? (
                <p className='text-center my-7 text-2xl'>Loading...</p>
            ) : (
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type="text"
                        placeholder='Name'
                        className='border p-3 bg-white rounded-lg'
                        id='name'
                        maxLength="62"
                        minLength='10'
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        type="text"
                        placeholder='Description'
                        className='border bg-white p-3 rounded-lg'
                        id='description'
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type="text"
                        placeholder='Address'
                        className='border p-3 rounded-lg bg-white'
                        id='address'
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id='rent'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id='furnished'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id='offer'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input
                                type="number"
                                id='bedrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg bg-white'
                                onChange={handleChange}
                                value={formData.bedrooms}
                            />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type="number"
                                id='bathrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg bg-white'
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type="number"
                                id='regularPrice'
                                min='50'
                                max='10000000'
                                required
                                className='p-3 border border-gray-300 rounded-lg bg-white'
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                {formData.type === 'rent' && (
                                    <span className='text-xs'>($ / month)</span>
                                )}
                            </div>
                        </div>
                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                                <input
                                    type="number"
                                    id='discountPrice'
                                    min='0'
                                    max='10000000'
                                    required
                                    className='p-3 border border-gray-300 rounded-lg bg-white'
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                />
                                <div className='flex flex-col items-center'>
                                    <p>Discount price</p>
                                    {formData.type === 'rent' && (
                                        <span className='text-xs'>($ / month)</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>
                            The first image will be the cover (max 6)
                        </span>
                    </p>

                    {/* Show current images if not uploading new ones */}
                    {!uploadingNewImages && formData.imageUrls.length > 0 && (
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm text-green-700'>Current Images:</p>
                            {formData.imageUrls.map((url, index) => (
                                <div key={url} className='flex justify-between p-3 border items-center'>
                                    <img
                                        src={url}
                                        alt='listing image'
                                        className='w-20 h-20 object-contain rounded-lg'
                                    />
                                    <span className='text-sm text-gray-600'>
                                        {index === 0 && '(Cover)'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Upload new images section */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-semibold'>
                            {uploadingNewImages ? 'New Images Selected:' : 'Upload New Images:'}
                        </p>
                        <div className='flex gap-4'>
                            <input
                                onChange={handleImageChange}
                                className='p-3 bg-white border border-gray-300 rounded w-full'
                                type="file"
                                id='images'
                                accept='image/*'
                                multiple
                                disabled={uploadingNewImages}
                            />
                        </div>
                        {uploadingNewImages && (
                            <p className='text-amber-600 text-sm'>
                                ⚠️ Uploading new images will replace all current images
                            </p>
                        )}
                    </div>

                    {/* New image previews */}
                    {imagePreviews.length > 0 &&
                        imagePreviews.map((url, index) => (
                            <div
                                key={url}
                                className='flex justify-between p-3 border items-center bg-green-50'
                            >
                                <img
                                    src={url}
                                    alt='new image'
                                    className='w-20 h-20 object-contain rounded-lg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveNewImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                    {uploadingNewImages && (
                        <button
                            type='button'
                            onClick={handleCancelNewImages}
                            className='p-3 bg-gray-500 text-white rounded-lg uppercase hover:opacity-95'
                        >
                            Cancel New Images
                        </button>
                    )}

                    <button
                        disabled={loading}
                        className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        {loading ? 'Updating...' : 'Update Listing'}
                    </button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
                </div>
            </form>
            )}
        </main>
    )
}

export default UpdateListing