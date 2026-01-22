import React, { useState } from 'react';
import { IoFilter } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaWifi, FaSwimmingPool, FaParking, FaUtensils } from "react-icons/fa";
import { MdLocalLaundryService, MdOutlineAir } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";

function FilterPanel({ onFilterChange, onClose, showFilter }) {
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [guestCount, setGuestCount] = useState(1);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState({ bedrooms: 0, bathrooms: 0 });
    const [sortBy, setSortBy] = useState('');

    const amenitiesList = [
        { name: 'WiFi', icon: <FaWifi /> },
        { name: 'Pool', icon: <FaSwimmingPool /> },
        { name: 'Air Conditioning', icon: <MdOutlineAir /> },
        { name: 'Kitchen', icon: <FaUtensils /> },
        { name: 'Free Parking', icon: <FaParking /> },
        { name: 'TV', icon: <PiTelevisionSimpleBold /> },
        { name: 'Washing Machine', icon: <MdLocalLaundryService /> },
    ];

    const handleAmenityToggle = (amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const handleApplyFilters = () => {
        onFilterChange({
            priceRange,
            guestCount,
            amenities: selectedAmenities,
            bedrooms: selectedRooms.bedrooms,
            bathrooms: selectedRooms.bathrooms,
            sortBy
        });
        if (onClose) onClose();
    };

    const handleReset = () => {
        setPriceRange([0, 50000]);
        setGuestCount(1);
        setSelectedAmenities([]);
        setSelectedRooms({ bedrooms: 0, bathrooms: 0 });
        setSortBy('');
        onFilterChange({
            priceRange: [0, 50000],
            guestCount: 1,
            amenities: [],
            bedrooms: 0,
            bathrooms: 0,
            sortBy: ''
        });
    };

    if (!showFilter) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-30 flex items-start justify-center pt-[100px] overflow-auto'>
            <div className='w-[90%] max-w-[600px] bg-white rounded-lg p-6 relative mb-[50px]'>
                {/* Header */}
                <div className='flex items-center justify-between mb-6 border-b pb-4'>
                    <h2 className='text-2xl font-semibold flex items-center gap-2'>
                        <IoFilter /> Filters
                    </h2>
                    <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full'>
                        <MdClose className='w-6 h-6' />
                    </button>
                </div>

                {/* Price Range */}
                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-3'>Price Range (per night)</h3>
                    <div className='flex items-center gap-4 mb-2'>
                        <div className='flex-1'>
                            <label className='text-sm text-gray-600'>Min Price</label>
                            <input
                                type='number'
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className='w-full border rounded-lg px-3 py-2 mt-1'
                                placeholder='₹0'
                            />
                        </div>
                        <div className='flex-1'>
                            <label className='text-sm text-gray-600'>Max Price</label>
                            <input
                                type='number'
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className='w-full border rounded-lg px-3 py-2 mt-1'
                                placeholder='₹50000'
                            />
                        </div>
                    </div>
                    <input
                        type='range'
                        min='0'
                        max='50000'
                        step='1000'
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className='w-full'
                    />
                    <div className='flex justify-between text-sm text-gray-600 mt-1'>
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>

                {/* Guests */}
                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-3'>Number of Guests</h3>
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                            className='w-10 h-10 border rounded-full hover:bg-gray-100 text-xl font-semibold'
                        >
                            -
                        </button>
                        <span className='text-lg font-semibold w-12 text-center'>{guestCount}</span>
                        <button
                            onClick={() => setGuestCount(guestCount + 1)}
                            className='w-10 h-10 border rounded-full hover:bg-gray-100 text-xl font-semibold'
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Rooms */}
                <div className='mb-6 grid grid-cols-2 gap-4'>
                    <div>
                        <h3 className='text-lg font-semibold mb-3'>Bedrooms</h3>
                        <select
                            value={selectedRooms.bedrooms}
                            onChange={(e) => setSelectedRooms({ ...selectedRooms, bedrooms: Number(e.target.value) })}
                            className='w-full border rounded-lg px-3 py-2'
                        >
                            <option value={0}>Any</option>
                            <option value={1}>1+</option>
                            <option value={2}>2+</option>
                            <option value={3}>3+</option>
                            <option value={4}>4+</option>
                            <option value={5}>5+</option>
                        </select>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold mb-3'>Bathrooms</h3>
                        <select
                            value={selectedRooms.bathrooms}
                            onChange={(e) => setSelectedRooms({ ...selectedRooms, bathrooms: Number(e.target.value) })}
                            className='w-full border rounded-lg px-3 py-2'
                        >
                            <option value={0}>Any</option>
                            <option value={1}>1+</option>
                            <option value={2}>2+</option>
                            <option value={3}>3+</option>
                            <option value={4}>4+</option>
                        </select>
                    </div>
                </div>

                {/* Amenities */}
                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-3'>Amenities</h3>
                    <div className='grid grid-cols-2 gap-3'>
                        {amenitiesList.map((amenity) => (
                            <button
                                key={amenity.name}
                                onClick={() => handleAmenityToggle(amenity.name)}
                                className={`flex items-center gap-2 px-4 py-3 border rounded-lg hover:border-red-500 transition ${selectedAmenities.includes(amenity.name)
                                        ? 'bg-red-50 border-red-500'
                                        : 'border-gray-300'
                                    }`}
                            >
                                <span className='text-xl'>{amenity.icon}</span>
                                <span className='text-sm'>{amenity.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort By */}
                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-3'>Sort By</h3>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='w-full border rounded-lg px-3 py-3'
                    >
                        <option value=''>Recommended</option>
                        <option value='price-low'>Price: Low to High</option>
                        <option value='price-high'>Price: High to Low</option>
                        <option value='rating'>Highest Rated</option>
                        <option value='newest'>Newest First</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 pt-4 border-t'>
                    <button
                        onClick={handleReset}
                        className='flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold'
                    >
                        Clear All
                    </button>
                    <button
                        onClick={handleApplyFilters}
                        className='flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold'
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterPanel;
