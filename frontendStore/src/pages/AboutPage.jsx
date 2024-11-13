import MainLayout from "../layout/MainLayout";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="bg-opacity-5  mt-40 pt-50">
        {/* About Section */}
        <div className="px-4 md:px-20 py-16 bg-white">
          <div className="max-w-3xl text-right mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-black">
              من نحن
            </h2>
            <p className="text-lg leading-relaxed text-black mb-4">
              نحن في <strong>إبرة</strong> نعمل جاهدين لتقديم أفضل تجربة تسوق
              إلكترونية لعملائنا. متجرنا هو وجهتك الجديدة للحصول على منتجات عالية الجودة وبأسعار تنافسية.
              نسعى جاهدين لجعل تجربة التسوق سهلة وآمنة، حيث نوفر لك مجموعة متنوعة من المنتجات التي
              تناسب احتياجاتك. هدفنا هو جعل عملية الشراء ممتعة وسلسة من خلال تقديم أفضل الخدمات
              في اختيار المنتج، الدفع، والشحن.
            </p>
            <p className="text-lg leading-relaxed text-black mb-4">
              لدينا فريق متخصص يعمل على تقديم أفضل دعم وخدمة عملاء لضمان رضاكم الكامل. نحن هنا دائمًا
              لمساعدتكم في جميع مراحل عملية الشراء والتسوق الإلكتروني. نتطلع لتقديم منتجات تلبي احتياجاتك
              وتحقق رضاك الكامل.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
