import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from './ListingItem';

const Search = () => {
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc',
      });

      const [listings, setListings] = useState([]);
      const navigate = useNavigate();


      const handleChange = (e) => {

        if (e.target.id === 'all' || e.target.id === 'rent' ||  e.target.id === 'sale'  ) 
            setSidebardata({ ...sidebardata, type: e.target.id });
        
        if (e.target.id === 'searchTerm') 
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
            
        if ( e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') 
            setSidebardata({ ...sidebardata,  [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false, });
          

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';
            console.log(sort, order);
            
      
            setSidebardata({ ...sidebardata, sort, order });
          }
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };


      useEffect(()=>{

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(searchTermFromUrl || sortFromUrl || orderFromUrl || offerFromUrl || parkingFromUrl || typeFromUrl ||furnishedFromUrl){
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc', });
        }

        const fetchListings = async () => {
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/search?${searchQuery}`);
            const data = await res.json();
            setListings(data.lists);
          };
      
          fetchListings();
      },[location.search])

     

  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>

                <div className="flex items-center flex-col gap-2">
                    <label> Search items</label>
                    <input id='searchTerm' className='w-full border-gray-600 p-3 rounded-lg' type="text" placeholder='Search...' value={sidebardata.searchTerm}onChange={handleChange} />
                </div>

                <div className="flex gap-2 flex-wrap items-center my-4">
                    <label> Type:</label>
                    <div className="flex gap-2">
                        <input id='all'className='w-5' type="checkbox" checked={sidebardata.type === 'all'}    onChange={handleChange} />
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='rent'className='w-5' type="checkbox" checked={sidebardata.type === 'rent'}    onChange={handleChange} />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='sale'className='w-5' type="checkbox" checked={sidebardata.type === 'sale'}    onChange={handleChange} />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='offer'className='w-5' type="checkbox" checked={sidebardata.offer}    onChange={handleChange} />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

                <div className="flex items-center gap-2">
                    <label className='font-semibold'>Sort:</label>
                    <select  className='border rounded-lg p-3' id="sort_order" onChange={handleChange}>
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to hight</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                    Search
                 </button>

            </form>
        </div>


        <div className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
            <h1>Search Result</h1>
            <div className='p-7 flex flex-wrap gap-4'>
                { listings &&
                    listings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default Search