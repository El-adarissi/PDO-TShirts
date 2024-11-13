import headphonesIcon from "../assets/icons/headphones.svg";
import transportationIcon from "../assets/icons/transportation.svg";
import RecoveryIcon from "../assets/icons/recovery.svg";
const InfoSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-around items-center  rounded-lg shadow-md">
        <div className="text-center m-4">
          <div className="mb-2 text-blue-500">
            <img
              src={headphonesIcon}
              alt="Headphones Icon"
              className="h-12 w-12 mx-auto"
            />
          </div>
          <h3 className="text-lg font-bold">الدعم التقني 24/7</h3>
          <p className="text-gray-300">
            الدعم متوفر طوال الأسبوع من 9 صباحا إلى 10 مساء
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center border-separate p-6 rounded-lg shadow-md">
        <div className="text-center m-4">
          <div className="mb-2 text-blue-500">
            <img
              src={transportationIcon}
              alt="transportation Icon"
              className="h-12 w-12 mx-auto"
            />
          </div>
          <h3 className="text-lg font-bold">التوصيل السريع</h3>
          <p className="text-gray-300">توصيل سريع و محلي في جميع مدن المملكة</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center border-separate p-6 rounded-lg shadow-md">
        <div className="text-center m-4">
          <div className="mb-2 ">
            <img
              src={RecoveryIcon}
              alt="Recovery Icon"
              className="h-12 w-12 mx-auto bg-blue-300"
            />
          </div>
          <h3 className="text-lg font-bold">الإستبدال و الإسترجاع</h3>
          <p className="text-gray-300">
            إستبدال أو إسترجاع النقود في حالة عدم الرضا
          </p>
        </div>
      </div>
    </div>

  );
};

export default InfoSection;
