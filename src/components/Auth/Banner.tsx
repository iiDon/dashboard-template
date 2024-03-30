const Banner = () => {
  return (
    <div className="container relative h-screen items-center justify-center bg-gradient-to-r from-primary to-blue-600 p-8 md:flex">
      <div className="items-center justify-center" />
      <div className="flex flex-col items-center justify-center space-y-8 ">
        <h1 className="text-4xl font-bold tracking-tighter text-white">
          مرحبا بك
        </h1>
        <h1 className="text-4xl font-bold tracking-tighter text-white">
          بلو | Blue
        </h1>
        <p className="text-white">
          بلو لخدمات السيارات هي مؤسسة مرخصة بالسجل التجاري رقم 1010787669 تهتم
          في تقديم خدمة غسيل وتلميع السيارات بالتقنيات الحديثة بجانب بيع منتجات
          وادوات العناية بالسيارات بجميع انواعها
        </p>
      </div>
    </div>
  );
};

export default Banner;
