import { useState } from 'react';
import MainLayout from "../layout/MainLayout";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "ما هي سياسة الشحن الخاصة بك؟", answer: "نحن نقدم شحن مجاني ." },
    { question: "كيف يمكنني إرجاع منتج؟", answer: "يمكنك إرجاع المنتج خلال 14 يومًا من استلام الطلب، بشرط أن يكون في حالته الأصلية." },
    { question: "ما هي خيارات الدفع المتاحة؟", answer: "نقبل بطاقات الائتمان،والدفع عند الاستلام." },
    { question: "كيف يمكنني تتبع طلباتي؟", answer: "بعد شحن الطلب، سنرسل لك رابط تتبع عبر البريد الإلكتروني." },
    { question: "هل يمكنني تعديل أو إلغاء الطلب بعد الدفع؟", answer: "يمكنك تعديل أو إلغاء الطلب." },
    { question: "هل توفرون خدمة العملاء؟", answer: "نعم، يمكنك الاتصال بنا عبر الهاتف أو البريد الإلكتروني في أي وقت." },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <MainLayout>
      <div className="bg-opacity-5 mt-40 "> {/* Added margin-top */}
        <div className="px-4 md:px-20 py-16 bg-white">
          <div className="max-w-3xl text-right mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-black">
              الأسئلة المتكررة  
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-600">
                  <div
                    className="flex justify-between items-center py-4 cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-lg text-black">{faq.question}</h3>
                    <span className="text-black">{openIndex === index ? '-' : '+'}</span>
                  </div>
                  {openIndex === index && (
                    <p className="text-gray-400 mb-4">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;
