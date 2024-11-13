import ImgCaps from '../assets/images/imagescollection/Caps.jpeg'
import ImgTshrits from '../assets/images/imagescollection/T-shrits.jpeg'
import ImgThoodies from '../assets/images/imagescollection/Hoodies.jpeg'

import { Link } from 'react-router-dom';

const Collection = () => {
  const items = [
    { id: 1, imgSrc: ImgTshrits, alt: "Item 1", label: "T-SHIRTS", links: "/" },
    { id: 2, imgSrc: ImgThoodies, alt: "Item 2", label: "HOODIES", links: "/" },
    { id: 3, imgSrc: ImgCaps, alt: "Item 3", label: "CASQUETTE", links: "/" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-semibold mb-8">التصنيفات</h2>
        
      <div className="flex flex-wrap justify-center space-x-6">
        {items.map((item) => (
          <div className="relative" key={item.id}>
            <Link to={item.links}>

              <div className="rounded-full overflow-hidden w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 transition-transform transform hover:scale-105">
                <img src={item.imgSrc} alt={item.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-50 rounded-full text-white text-sm">
              {item.label}
            </div>
              </div>
            </Link>
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
