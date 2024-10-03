import ListingItem from '../components/ListingItem'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const Home = () => {

  const [offerLists, setOfferList] = useState([])
  const [saleLists, setSaleList] = useState([])
  const [rentLists, setRentList] = useState([])

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 3000,
   
  };



  useEffect(()=>{
    const fetchOffers = async () => {
        const response = await fetch(`/api/listing/search?offer=true`)
        const data = await response.json()
        setOfferList(data.lists)
      
        
    }
    const fetchSale= async () => {
        const response = await fetch(`/api/listing/search?type=sale`)
        const data = await response.json()
        setSaleList(data.lists)
    }
    const fetchRent = async () => {
        const response = await fetch(`/api/listing/search?type=rent`)
        const data = await response.json()
        setRentList(data.lists)
    }
    fetchOffers()
    fetchSale()
    fetchRent()
  },[])


  return (
    <div className='w-full overflow-hidden'>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span> <br />
         place here</h1>

         <div className="text-gray-400 file:text-xs sm:text-sm">
          Guru's Estate is the place to fins your next perfect place to live <br />
          we have a wide range of properties for you to choose from
         </div>
         
         <Link to={'/search'} className='text-xs sm:text-sm text-blue-700 font-bold  hover:underline'>
          Let's get start......
         </Link>
      </div>
      
      <Slider {...settings}>
          { offerLists && 
            offerLists.map((offer, i) => (
              offer.images.map(offerImage => (
                <div key={i}>
                <img
                  className="h-[500px]  w-full"
                  src={offerImage.url}
                  alt='Property image'
                />
              </div>
              ))
            ))
          }
      </Slider>

     {/* listing results for offer, sale and rent */}

     <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerLists && offerLists.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerLists.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
         {saleLists && saleLists.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleLists.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentLists && rentLists.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentLists.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
       
      </div>
    </div>
  )
}

export default Home