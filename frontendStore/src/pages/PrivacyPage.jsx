import MainLayout from "../layout/MainLayout";
const PrivacyPage = () => {
  return (
    <MainLayout>
      <div className="bg-opacity-5 mt-40 pt-50"> {/* Added margin-top */}
        {/* Privacy Policy Section */}
        <div className="px-4 md:px-20 py-16 bg-white">
          <div className="max-w-3xl text-right mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-black">
              سياسة الخصوصية
            </h2>
            <p className="text-lg leading-relaxed text-black mb-4">
              نحن في <strong>إبرة</strong> نحترم خصوصيتك
              ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية
              جمعنا واستخدامنا وحمايتنا لمعلوماتك عند استخدامك لموقعنا
              الإلكتروني.
            </p>
            <p className="text-lg leading-relaxed text-black mb-4">
              نقوم بجمع البيانات مثل اسمك، بريدك الإلكتروني، وعنوان الشحن لضمان
              تجربة تسوق سلسة. كما نستخدم ملفات تعريف الارتباط لتحسين
              تجربتك على الموقع، بما في ذلك التوصيات وتخصيص المحتوى.
            </p>
            <p className="text-lg leading-relaxed text-black mb-4">
              يتم استخدام معلومات الدفع الخاصة بك بشكل آمن ومشفّر. نحن لا نخزن
              معلومات بطاقات الائتمان على خوادمنا بعد إتمام عملية الشراء.
            </p>
            <p className="text-lg leading-relaxed text-black mb-4">
              نلتزم بعدم مشاركة معلوماتك الشخصية مع أطراف خارجية إلا في الحالات
              الضرورية لضمان تقديم الخدمة أو الامتثال للقوانين. نحن نتخذ جميع
              الإجراءات اللازمة لحماية بياناتك الشخصية من الوصول غير المصرح به.
            </p>
            <p className="text-lg leading-relaxed text-black mb-4">
              لديك الحق في طلب حذف أو تعديل بياناتك الشخصية في أي وقت. نحن نحرص
              على احترام رغبتك والحفاظ على بياناتك بطريقة آمنة.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;
