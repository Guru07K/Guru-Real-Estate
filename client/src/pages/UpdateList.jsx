import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createList, updateList, uploadImage } from '../Actions/listingAction'
import { listImageUploading, listImageUploadSuccess } from '../slices/listSlice'
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';



const UpdateList = () => {

 const {loading, message, imageUploded} =  useSelector(state => state.listState )
 const [uploadeimageBefore, setUploadeimageBefore] = useState('')
 const {user} =  useSelector(state => state.authState )
 const {listId} = useParams()

 const dispatch = useDispatch()
 const navigate = useNavigate()


  const [listingData, setListingData] = useState({
    name: '',
    description: '',
    address: '',
    images : [],
    regularPrice: 1,
    discountedPrice: 0,
    type : '',
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    offer: false,
    parking: false,
    user: user._id
  })
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [oldImageInList, setOldImageInList] = useState([]);

  

  const handleChange = (e) => {
    // Handle radio button behavior for sale and rent
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setListingData({ ...listingData, type: e.target.id });
    }else if (e.target.id === 'furnished'  || e.target.id === 'offer'|| e.target.id === 'parking'){
         // Toggle the boolean vlaue
        setListingData({ ...listingData, [e.target.id]: !listingData[e.target.id] });
    } else {
      setListingData({ ...listingData, [e.target.id]: e.target.value });
    }
  };


  const handleFileSelect = (e) => {
    setSelectedFiles(e.target.files);
  };


  const handleImages = async(e) => {
    dispatch(listImageUploading())
    
    const up_image = []
    for (let i = 0; i <selectedFiles.length; i++) {
     const uploadedImage = await uploadImage(selectedFiles[i])
     up_image.push({
       public_id: uploadedImage.public_id,
       url: uploadedImage.url
     })
    }
    setListingData({
      ...listingData, 
      images: [...listingData.images, ...up_image],
    })

    dispatch(listImageUploadSuccess())
  }

const handleSubmit = (e) => {
  e.preventDefault()
  if(imageUploded){
    dispatch(updateList(listingData._id, listingData, navigate, setSelectedFiles)) 
  }else{
    setUploadeimageBefore("uploade image before create list")
  }
}

const deletePreviewImage = (index) =>{
   const deletedImages = Array.from(selectedFiles).filter(( _, i) => i !== index)
   setSelectedFiles(deletedImages)
}

 const deletePreviewImageOnDB = async (listId, imageId)=> {
    await fetch(`/api/listing/deleteuserlist/${listId}/${imageId}`,{
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => setOldImageInList(data.list.images))
  }

 
useEffect(()=>{
    const fetchList = async (listId) => { 
        const res = await fetch(`/api/listing/getListbyId/${listId}`)
        if(res.ok){
            const data = await res.json()
            setListingData(data)
            setOldImageInList(data.images)
        }
    }
    fetchList(listId)
},[])


  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          {/* left div */}
            <div className="flex flex-col gap-5 flex-1">
              <input className='border p-3 rounded-lg focus:outline-none' onChange={handleChange} value={listingData.name} type="text" id='name' placeholder='Name' required />
              <textarea className='border p-3 rounded-lg focus:outline-none'  onChange={handleChange} value={listingData.description} type="text" id='description' placeholder='description' required />
              <input className='border p-3 rounded-lg focus:outline-none'  onChange={handleChange}value={listingData.address} type="text" id='address' placeholder='Address' required />

              <div className="flex gap-6 flex-wrap">
                  <div className="flex gap-2">
                    <input className='w-6'  onChange={handleChange} checked={listingData.type === 'sale'} value={listingData.sale} type="checkbox"  id='sale' />
                    <span>Sale</span>
                  </div>

                  <div className="flex gap-2">
                    <input className='w-6'  onChange={handleChange} checked={listingData.type === 'rent'} value={listingData.rent} type="checkbox" id='rent' />
                    <span>Rent</span>
                  </div>

                  <div className="flex gap-2">
                    <input className='w-6'  onChange={handleChange} value={listingData.parking} type="checkbox" id='parking' />
                    <span>Parking spot</span>
                  </div>

                  <div className="flex gap-2">
                    <input className='w-6' onChange={handleChange} value={listingData.furnished} type="checkbox" id='furnished' />
                    <span>Furnished</span>
                  </div>

                  <div className="flex gap-2">
                    <input className='w-6' onChange={handleChange}  value={listingData.offer} type="checkbox" id='offer' />
                    <span>Offer</span>
                  </div>
              </div>

              <div className="flex flex-wrap gap-6 ">
                  <div className="flex items-center gap-2">
                    <input className='p-3 border-gray-500 rounded-lg ' onChange={handleChange}  value={listingData.bedrooms} type="number" id='bedrooms' min={1} max={10} required/>
                    <p>Beds</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input className='p-3 border-gray-500 rounded-lg ' onChange={handleChange} value={listingData.bathrooms} type="number" id='bathrooms' min={1} max={10} required/>
                    <p>Baths</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input className='p-3 border-gray-500 rounded-lg ' onChange={handleChange} value={listingData.regularPrice} type="number" id='regularPrice'  required/>
                    <div className="flex flex-col items-center">
                        <p>Regular price</p>
                        <span className='text-sm'>($ / month)</span>
                    </div>
                  </div>

                  { listingData.offer && (
                      <div className="flex items-center gap-2">
                        <input className='p-3 border-gray-500 rounded-lg ' onChange={handleChange} value={listingData.discountedPrice} type="number" id='discountedPrice' required/>
                        <div className="flex flex-col items-center">
                            <p>Dicounted price</p>
                            <span className='text-sm'>($ / month)</span>
                        </div>
                      </div>
                    )
                  }

              </div>
            </div>

            {/* right div */}
            <div className="flex flex-col flex-1 gap-4">
                <p className='font-semibold'>Images :
                   <span className='font-normal text-gray-600 ml-2'>The image will be cover (max 6) </span>
                </p>

                <div className="flex gap-4">
                  <input className='p-3 rounded-lg border-gray-300 w-full' onChange={handleFileSelect} type="file" id='images' accept='image/*' multiple />
                  <button disabled={loading} type='button' className='p-3 text-green-700 border  border-green-800 rounded hover:bg-green-600 hover:text-white disabled:opacity-70'onClick={handleImages}>Upload</button>
                </div>
                
                {
                  selectedFiles && (
                    Array.from(selectedFiles).map((file, index) => (
                      <div key={index} className="flex items-center gap-2 justify-between">
                        <img src={URL.createObjectURL(file)} alt={file.name} className='w-16 h-16 rounded-full' />
                        <span>{file.name}</span>
                        <button onClick={() => deletePreviewImage(index)} type='button'>
                               <MdDelete className='w-9 h-9'></MdDelete>
                        </button>
                      </div>
                    ))
                  )
                }
                  
                { oldImageInList  && (
                    oldImageInList.map((file, index) => (
                        
                      <div key={index} className="flex items-center gap-2 justify-between">
                           <img src={file.url} alt={file.name} className='w-16 h-16 rounded-full' />
                        <span>{file.name}</span>
                        <button onClick={() => deletePreviewImageOnDB(listingData._id, file._id) } type='button'>
                            <MdDelete className='w-9 h-9'></MdDelete>
                        </button>
                      </div>
                    ))
                  )
                }

             <button disabled={loading} className='p-3 bg-slate-700 rounded-lg text-white hover:opacity-90 disabled:opacity-70'>
              {
                loading ? message : 'Update list'
              }</button>
              
              <div>
                { uploadeimageBefore && <p className='text-red-600'>{uploadeimageBefore}</p>}
              </div>
            </div>
  
              
  
          
        </form>

    </main>
  )
}

export default UpdateList