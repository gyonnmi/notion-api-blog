import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Backdrop from './Backdrop';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  const { pathname } = useRouter(); //현재 경로
  const [isMenuOpen, setIsMenuOpen] = useState(false); //메뉴 토글 상태

  // 사이드메뉴 on/off 클래스 탈부착
  useEffect(() => {
    // window.innerWidth : 스크롤바를 포함한 전체 화면의 너비
    // document.body.clientWidth : 스크롤바를 제외한 화면의 너비
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    document.body.className = isMenuOpen ? 'isMenuOpen' : '';
  }, [isMenuOpen]);

  // 경로가 바뀌면 사이드메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 bg-white/40 backdrop-blur-md z-50">
        <div className="p-6 flex flex-row justify-between max-w-4xl mx-auto">
          <button
            className="p-1 hover:bg-gray-200 rounded-lg"
            onClick={() => setIsMenuOpen(true)}
          >
            <span>
              <AiOutlineMenu size="2rem" />
            </span>
          </button>
          <Link href={'/'}>
            <h1 className="font-bold text-2xl cursor-pointer select-none">
              Rizy's devlog
            </h1>
          </Link>
          <button className="p-1 hover:bg-gray-200 rounded-lg">
            <span>
              <AiOutlineSearch size="2rem" />
            </span>
          </button>
        </div>
      </header>
      <HeaderMenu isMenuOpen={isMenuOpen} />
      {isMenuOpen ? (
        <Backdrop
          onClick={() => {
            setIsMenuOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default Header;
