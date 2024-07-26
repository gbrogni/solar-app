"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl flex justify-center">
        <div className="text-center mx-8">
          <span className="footer-title">Company</span>
          <a className="link-hover link block">About us</a>
          <a className="link-hover link block">Contact</a>
          <a className="link-hover link block">Jobs</a>
        </div>
        <div className="text-center mx-8">
          <span className="footer-title">Legal</span>
          <a className="link-hover link block">Terms of use</a>
          <a className="link-hover link block">Privacy policy</a>
          <a className="link-hover link block">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
}