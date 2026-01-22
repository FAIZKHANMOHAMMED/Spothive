import React, { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { useState } from 'react';
import { bookingDataContext } from '../Context/BookingContext';
import { IoPeople } from "react-icons/io5";
import { MdBedroomParent, MdBathroom } from "react-icons/md";
import { FaWifi, FaSwimmingPool, FaParking } from "react-icons/fa";
import { MdOutlineAir } from "react-icons/md";

function Card({ title, landMark, image1, image2, image3, rent, city, id, ratings, isBooked, host, guests, bedrooms, bathrooms, amenities, highlights }) {
    let navigate = useNavigate()
    let { userData } = useContext(userDataContext)
    let { handleViewCard } = useContext(listingDataContext)
    let [popUp, setPopUp] = useState(false)
    let { cancelBooking } = useContext(bookingDataContext)

    const getAmenityIcon = (amenity) => {
        const amenityLower = amenity.toLowerCase();
        if (amenityLower.includes('wifi')) return <FaWifi className="w-4 h-4" />;
        if (amenityLower.includes('pool')) return <FaSwimmingPool className="w-4 h-4" />;
        if (amenityLower.includes('parking')) return <FaParking className="w-4 h-4" />;
        if (amenityLower.includes('air') || amenityLower.includes('ac')) return <MdOutlineAir className="w-4 h-4" />;
        return null;
    };

    const handleClick = () => {
        if (userData) {
            handleViewCard(id)
        }
        else {
            navigate("/login")
        }
    }

    return (
        <div className='w-[330px] max-w-[85%] h-[530px] flex items-start justify-start flex-col rounded-lg cursor-pointer relative z-[10] hover:shadow-xl transition-shadow duration-300' onClick={() => !isBooked ? handleClick() : null}>

            {isBooked && <div className='text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] z-10 shadow-md'><GiConfirmed className='w-[20px] h-[20px] text-[green]' />Booked</div>}
            {isBooked && host == userData?._id && <div className='text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px] z-10 shadow-md' onClick={(e) => { e.stopPropagation(); setPopUp(true) }} ><FcCancel className='w-[20px] h-[20px]' />Cancel Booking</div>}

            {popUp && <div className='w-[300px] h-[100px]  bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg z-20 shadow-lg' onClick={(e) => e.stopPropagation()}>
                <div className='w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto text-[20px]  p-[10px]'>Booking Cancel!</div>
                <div className='w-[100%] h-[50%] text-[18px] font-semibold flex items-start justify-center gap-[10px] text-[#986b6b]'>Are you sure? <button className='px-[20px] bg-[red] text-[white] rounded-lg hover:bg-slate-600 ' onClick={(e) => { e.stopPropagation(); cancelBooking(id); setPopUp(false) }}>Yes</button><button className='px-[10px] bg-[red] text-[white] rounded-lg hover:bg-slate-600' onClick={(e) => { e.stopPropagation(); setPopUp(false) }}>No</button></div>
            </div>}

            <div className='w-[100%] h-[60%]  rounded-lg overflow-auto flex relative'>
                <img src={image1} alt="" className='w-[100%] flex-shrink-0 object-cover' />
                <img src={image2} alt="" className='w-[100%] flex-shrink-0 object-cover' />
                <img src={image3} alt="" className='w-[100%] flex-shrink-0 object-cover' />

                {/* Highlights Badge */}
                {highlights && highlights.length > 0 && (
                    <div className='absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md'>
                        ⭐ {highlights[0]}
                    </div>
                )}
            </div>

            <div className='w-[100%] h-[40%] py-[15px] px-[5px] flex flex-col gap-[8px]'>
                {/* Location and Rating */}
                <div className='flex items-center justify-between text-[18px]'>
                    <span className='w-[70%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>
                        {landMark.charAt(0).toUpperCase() + landMark.slice(1)}, {city.charAt(0).toUpperCase() + city.slice(1)}
                    </span>
                    <span className='flex items-center justify-center gap-[5px]'>
                        <FaStar className='text-[#eb6262]' />{ratings}
                    </span>
                </div>

                {/* Title */}
                <span className='text-[15px] w-[95%] text-ellipsis overflow-hidden text-nowrap text-gray-600'>
                    {title}
                </span>

                {/* Room Details */}
                {(guests || bedrooms || bathrooms) && (
                    <div className='flex items-center gap-3 text-sm text-gray-600'>
                        {guests > 0 && (
                            <span className='flex items-center gap-1'>
                                <IoPeople className='w-4 h-4' />
                                {guests} guests
                            </span>
                        )}
                        {bedrooms > 0 && (
                            <span className='flex items-center gap-1'>
                                <MdBedroomParent className='w-4 h-4' />
                                {bedrooms} bed
                            </span>
                        )}
                        {bathrooms > 0 && (
                            <span className='flex items-center gap-1'>
                                <MdBathroom className='w-4 h-4' />
                                {bathrooms} bath
                            </span>
                        )}
                    </div>
                )}

                {/* Amenities Icons */}
                {amenities && amenities.length > 0 && (
                    <div className='flex items-center gap-2 flex-wrap'>
                        {amenities.slice(0, 4).map((amenity, index) => (
                            <span key={index} className='flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md'>
                                {getAmenityIcon(amenity)}
                                <span className='hidden sm:inline'>{amenity.length > 8 ? amenity.slice(0, 8) + '...' : amenity}</span>
                            </span>
                        ))}
                        {amenities.length > 4 && (
                            <span className='text-xs text-gray-500'>+{amenities.length - 4} more</span>
                        )}
                    </div>
                )}

                {/* Price */}
                <span className='text-[17px] font-semibold text-[#986b6b] mt-auto'>
                    ₹{rent.toLocaleString()}<span className='text-[14px] font-normal text-gray-600'>/night</span>
                </span>
            </div>

        </div>
    )
}

export default Card
