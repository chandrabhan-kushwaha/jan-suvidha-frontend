// frontend/src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './HomePage.css'; // We'll create this for custom Swiper styles

import FeatureCard from '../components/FeatureCard';

// Import your slider images
import slider1 from '../assets/slider/slider1.jpg';
import slider2 from '../assets/slider/slider2.jpg';
import slider3 from '../assets/slider/slider3.jpg';
import slider4 from '../assets/slider/slider4.jpg';
import slider5 from '../assets/slider/slider5.jpg';

// Icons for Feature Cards (using inline SVGs)
const ReportIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
const FeedIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0021 12c0-3.866-3.582-7-8-7s-8 3.134-8 7c0 1.76.743 3.37 1.97 4.602" /></svg>;
const TrackIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h16.5v11.25c0 1.242-.93 2.25-2.086 2.25H6.086A2.25 2.25 0 014.02 15.42L3.75 15.25V3zm2.25 0v11.25m12-11.25v11.25" /></svg>;
// Add other icons similarly...

const sliderImages = [slider1, slider2, slider3, slider4, slider5];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="pb-16">
      {/* --- Carousel Slider --- */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="w-full h-48 object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-3xl font-bold">Fix Roads Faster</h1>
          <button onClick={() => navigate('/report')} className="mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
            Report Issue
          </button>
        </div>
      </div>

      {/* --- Feature Grid --- */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <FeatureCard to="/report" icon={ReportIcon} title="Report Issue" />
        <FeatureCard to="/feed" icon={FeedIcon} title="Public Feed" />
        <FeatureCard to="/track" icon={TrackIcon} title="Track Status" />
        <FeatureCard to="/under-development" icon={ReportIcon} title="Settings" />
        <FeatureCard to="/under-development" icon={FeedIcon} title="Rewards" />
        <FeatureCard to="/under-development" icon={TrackIcon} title="Updates" />
      </div>

      {/* --- CTA Banners --- */}
      <div className="space-y-4">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="font-bold">Earn Rewards for Every Contribution</p>
          </div>
          <button onClick={() => navigate('/under-development')} className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow whitespace-nowrap">
            Check Rewards
          </button>
        </div>
        <button onClick={() => navigate('/report')} className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 transition-colors">
          Report Your First Issue Now
        </button>
      </div>
    </div>
  );
}

export default HomePage;