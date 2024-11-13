import { useRef } from 'react';
import BackgroundVideo from '../assets/BackroundVideo.mp4';

const HeaderSection = () => {
    const sectionRef = useRef(null); 

    const scrollToSection = () => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' }); 
        }
    };

    return (
        <div>
            <div className="relative h-screen">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={BackgroundVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        .اختر طرزك الآن
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6">
                        المتجر الإلكتروني رقم واحد في الطرز على الملابس
                    </p>
                    <button
                        onClick={scrollToSection}
                        className="py-2 px-16 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                    >
                        تسوق الآن
                    </button>
                </div>
            </div>
              <div ref={sectionRef}>

              </div>
        </div>
    );
};

export default HeaderSection;
