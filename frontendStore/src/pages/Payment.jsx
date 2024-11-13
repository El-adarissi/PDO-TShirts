import MainLayout from "../layout/MainLayout"

const Payment = () => {
  return (
    <MainLayout>
    <div className="bg-opacity-5 mt-40 pt-50"> {/* Added margin-top */}
         {/* Payment Policy Section */}
         <div className="px-4 md:px-20 py-16 bg-white">
          <div className="max-w-3xl text-right mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-black">
              سياسة الدفع
            </h2>
            <p className="text-lg leading-relaxed text-black mb-4">
              في <strong>إبرة</strong> نوفر طرق دفع مريحة وآمنة لضمان تجربة تسوق سلسة. طريقة الدفع الرئيسية المتاحة حالياً هي الدفع عند الاستلام (COD). 
            </p>
            <p className="text-lg leading-relaxed text-black mb-4">
              عند اختيار الدفع عند الاستلام، يمكنك الدفع نقداً لمندوب التوصيل عند استلام المنتجات. نحرص على أن تكون تجربة الشراء والدفع خالية من أي تعقيدات، ونضمن لك الحصول على منتجاتك بأسرع وقت ممكن.
            </p>
            <p className="text-lg leading-relaxed text-black mb-4">
              في حال وجود أي استفسار أو مساعدة فيما يتعلق بعملية الدفع، لا تتردد في التواصل معنا من خلال فريق دعم العملاء الخاص بنا.
            </p>
          </div>
        </div>
    </div>
    </MainLayout>
  )
}

export default Payment
