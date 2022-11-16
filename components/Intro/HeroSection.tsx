import React from 'react';

const HeroSection = () => {
  return (
    <section>
      <div className="py-16 md:py-32 bg-[length:100%_55%] bg-no-repeat px-4 flex justify-center items-center bg-gradient-to-r from-purple-400 to-blue-300">
        <div className="p-8 md:p-16 bg-white rounded-xl shadow-lg text-center">
          <h1 className="font-black text-5xl mb-2 bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
            Notion Devlog
          </h1>
          <p>Next.js와 Notion API로 만든 기술 블로그 입니다.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
