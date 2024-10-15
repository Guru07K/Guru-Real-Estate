import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOwnerDetails, getUserListDetails, sendEmailToNodemailer } from '../Actions/listingAction';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdLocationOn, MdMarkEmailRead } from 'react-icons/md';
import { FaBed, FaBath, FaCouch, FaCarAlt, FaPhoneAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import Backbutton from './Backbutton';
import { Helmet } from 'react-helmet-async';

const ListDetails = () => {
  const { listId } = useParams();
  const { user } = useSelector(state => state.authState)
  const [owner , setOwner] = useState()
  const [listDetails, setListDetails] = useState({});

 	const sendEmail = async ()=>{

     const { value: text } = await Swal.fire({
       input: "textarea",
       inputLabel: "Message",
       inputPlaceholder: "Type your message here...",
       inputAttributes: {
         "aria-label": "Type your message here"
       },
       showCancelButton: true,
       inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      }
     });
     if (text) {
      window.location.href =`mailto:${owner.email}?subject=${encodeURIComponent(listDetails.name)}&body=${encodeURIComponent(text)}`;
      //  const response = await sendEmailToNodemailer({
      //     from : user.email,
      //     email: owner.email,
      //     message : text,
      //     subject : listDetails.name
      //   })
       Swal.fire("Success",response.message,'success');
     }
  }

  useEffect(() => {
    const fetchListData = async () => {
      const listData = await getUserListDetails(listId);
      setListDetails(listData);
    };

    fetchListData();

  }, [listId]);

    useEffect(() => {
      if (listDetails.user) {
        const fetchOwner = async () => {
          const ownerDetail =await getOwnerDetails(listDetails.user);
          setOwner(ownerDetail);
        }
        fetchOwner()
      }
    }, [listDetails]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <>
    <Helmet title={listDetails.name}/>
    <Backbutton/>
      <div className="flex flex-col items-center p-8">

        {/* Image Slider */}
        <Slider {...settings} className="w-full md:w-3/4 lg:w-2/3 mb-8">
          {listDetails.images &&
            listDetails.images.map((file, i) => (
              <div key={i} className='px-4 w-full'>
                <img
                  className="h-[300px] object-cover "
                  src={file.url}
                  alt='Property image'
                />
              </div>
            ))}
        </Slider>



        {/* Property and User Information Section */}
        <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-2/3 gap-8 text-center">

          {/* Left: Property Details */}
          <div className="md:w-3/4 p-6 bg-white rounded-lg shadow-lg">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">{listDetails.name}</h1>

            {/* Description */}
            <p className="mb-6 text-gray-700">{listDetails.description}</p>

            {/* Address */}
            <div className="flex justify-center items-center mb-6 text-lg">
              <MdLocationOn className="text-red-600 mr-2" />
              <span>{listDetails.address}</span>
            </div>

            {/* Pricing */}
            <div className="flex justify-center gap-8 mb-6">           
              <p className="text-xl font-bold text-gray-800">
                Regular Price: Rs.{listDetails.regularPrice} 
                <span className='text-slate-500'> {listDetails.type === 'rent' && '/month'}</span>
              
              </p>
              {listDetails.offer && (
                <p className="text-xl text-green-600 font-bold">
                  Discounted Price: Rs.{listDetails.discountedPrice} 
                  {listDetails.type === 'rent' && ' / month'}
                </p>
              )}
            </div>

            {/* Features with Icons */}
            <div className="grid grid-cols-2 gap-8 text-lg text-gray-600">
              <div className="flex flex-col items-center">
                <FaBed className="text-4xl mb-2 text-blue-500" />
                <span>{listDetails.bedrooms} Bedrooms</span>
              </div>
              <div className="flex flex-col items-center">
                <FaBath className="text-4xl mb-2 text-blue-500" />
                <span>{listDetails.bathrooms} Bathrooms</span>
              </div>
              <div className="flex flex-col items-center">
                <FaCouch className="text-4xl mb-2 text-blue-500" />
                <span>{listDetails.furnished ? 'Furnished' : 'Not Furnished'}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaCarAlt className="text-4xl mb-2 text-blue-500" />
                <span>{listDetails.parking ? 'Parking Available' : 'No Parking'}</span>
              </div>
            </div>

            {/* Type of Listing (For Sale or Rent) */}
            <div className="mt-6">
              <p className={`text-2xl font-bold ${listDetails.type === 'sale' ? 'text-red-500' : 'text-green-500'}`}>
                {listDetails.type === 'sale' ? 'For Sale' : 'For Rent'}
              </p>
            </div>
          </div>

          {/* Right: User Information Section */}
        {
          owner && (<div className="md:w-1/4 p-6 my-20 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
            <h1 className="text-2xl font-semibold mb-7">Contact</h1>
            <img
              src={owner.avatar.url}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
            />
            <h2 className="text-xl font-bold">{owner.name}</h2>
            
            {/* Email with Icon */}
            <div className='flex flex-col gap-3 mt-8'>

            
                <div onClick={()=> sendEmail()} className="flex items-center text-gray-600 ">
                    <MdMarkEmailRead className="mr-2" style={{ width: '24px' }} />
                    <button type='button'  className="text-blue-600 hover:underline">
                      {owner.email} 
                    </button>
                </div>
            

              {/* Phone with Icon */}
              <div className="flex items-center text-gray-600 mt-2">
                <FaPhoneAlt className="mr-2" style={{ width: '24px' }} />
                <p>+91 9**********</p>
              </div>
            </div>

          </div>)
        }
          

        </div>
      </div>
    </>
  );
};

export default ListDetails;
