import React from "react";
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineBold,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-300 to-orange-300 p-8 text-white text-lg">
      <div className="flex flex-row flex-wrap justify-between max-w-5xl mx-auto">
        <a href="mailto:hikari980713@gmail.com" className="hover:underline">
          hikari980713@gmail.com
        </a>
        <p className="hover:underline">&copy; Rizy's devlog</p>
        <div>
          <ul className="flex flex-row flex-wrap justify-center gap-4">
            <li className="hover:bg-white/20 rounded-lg">
              <a
                className="p-1"
                href="https://github.com/gyonnmi"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <AiOutlineGithub size="2rem" />
                </span>
              </a>
            </li>
            <li className="hover:bg-white/20 rounded-lg">
              <a
                className="p-1"
                href="https://www.instagram.com/_rariho/"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <AiOutlineInstagram size="2rem" />
                </span>
              </a>
            </li>
            <li className="hover:bg-white/20 rounded-lg">
              <a
                className="p-1"
                href="https://km713.tistory.com/"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <AiOutlineBold size="2rem" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
