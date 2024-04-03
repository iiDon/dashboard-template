const Banner = () => {
  return (
    <div className="container rounded-r-3xl shadow-2xl relative h-screen items-center justify-center bg-gradient-to-r from-primary to-blue-600 p-8 md:flex">
      <div className="items-center justify-center" />
      <div className="flex flex-col items-center justify-center space-y-8 ">
        <h1 className="text-4xl font-bold tracking-tighter text-white">
          مرحبا بك
        </h1>
        <h1 className="text-4xl font-bold tracking-tighter text-white">
          اسم المنشأة{" "}
        </h1>
        <p className="text-white">
          لوريم ايبسوم هو نص تجريبي يستخدم في صناعات الطباعة والتنضيد. لقد كان
          لوريم ايبسوم النص القياسي في هذه الصناعة منذ القرن الخامس عشر
        </p>
      </div>
    </div>
  );
};

export default Banner;
