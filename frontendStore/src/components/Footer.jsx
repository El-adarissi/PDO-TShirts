import logo from '../assets/icons/logo3.png';
import { socialMedia, footerLinks } from '../constants';
import { copyrightSign } from '../assets/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='max-container mt-20 border-t py-10 border-neutral-700 container px-4 mx-auto relative lg:text-sm'>
      <div className='flex justify-between items-start gap-20 flex-wrap max-lg:flex-col max-lg:items-end lg:items-start'>
        <div className='flex flex-col lg:justify-start'>
          <a href='/'>
            <img
              src={logo}
              alt='logo'
              width={50}
              height={50}
              className='m-1'
            />
          </a>
          <p className='mt-6 leading-7 font-montserrat text-white-400 text-xl text-right sm:text-center lg:text-right font-medium'>
            لا تفوتوا فرصة اقتناء أرقى المنتجات بأسعار لا تقاوم وبجودة لا تُضاهى. استمتعوا بتجربة تسوق فريدة ومريحة واكتشفوا تشكيلاتنا المتنوعة التي تلبي جميع الأذواق. أسرعوا الآن واطلبوا ما تحبون! 🛍️✨
          </p>

          {/* Social Media Icons */}
          <div className='flex items-center gap-5 mt-6 justify-end lg:justify-start sm:justify-center'>
            {socialMedia.map((icon) => (
              <div
                className='flex justify-center items-center w-8 h-8 bg-white rounded-full hover:bg-orange-500'
                key={icon.alt}
              >
                <a href={icon.link}>
                  <img src={icon.src} alt={icon.alt} width={20} height={20} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className='flex px-6 md:px-20 text-right mt-6 flex-1 justify-between lg:gap-8 gap-10 flex-wrap'>
        {footerLinks.map((section) => (
          <div key={section.title} className='w-full lg:w-auto sm:text-center lg:text-right'>
            <h4 className='font-montserrat text-2xl leading-normal font-medium mb-6 text-orange-600 font-serif'>
              {section.title}
            </h4>
            <ul>
              {section.links.map((link) => (
                <li
                  className='mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray hover:text-yellow-500 font-serif'
                  key={link.name}
                >  
                  <Link to={link.link}>{link.name}</Link> 
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright Section */}
      <div className="container mt-2 border-t py-2 border-neutral-700 mx-auto flex justify-between items-center bg-zinc-900/50 shadow-2xl text-right relative">
        <div className="flex items-center mx-4">
          <img
            src={copyrightSign}
            alt='copyright sign'
            width={10}
            height={10}
            className='rounded-full m-0 mr-2'
          />
          <span className='text-white'>كل الحقوق محفوظة</span>
        </div>
        <div className='flex flex-col items-end'>
          <a href='/'>
            <img
              src={logo}
              alt='logo'
              width={40}
              height={40}
              className='m-1'
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
