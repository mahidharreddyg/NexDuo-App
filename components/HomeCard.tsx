'use client';

import Image from 'next/image';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className = '', img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={`homecard ${className}`}
      onClick={handleClick}
    >
      <div className="homecard-icon">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>
      <div className="homecard-content">
        <h1 className="homecard-title">{title}</h1>
        <p className="homecard-desc">{description}</p>
      </div>
      <style jsx>{`
        .homecard {
          background: linear-gradient(135deg, #FF742E 0%, #FF3C00 100%);
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          max-width: 270px;
          min-height: 260px;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(255, 116, 46, 0.08);
          transition: box-shadow 0.3s;
        }
        .homecard:hover {
          box-shadow: 0 0 15px 4px rgba(255, 116, 46, 0.3);
        }
        .homecard-icon {
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .homecard-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .homecard-title {
          font-size: 2rem;
          font-weight: bold;
          color: #fff;
        }
        .homecard-desc {
          font-size: 1.125rem;
          font-weight: 400;
          color: #fff;
        }
        @media (max-width: 600px) {
          .homecard {
            max-width: 100%;
            min-height: 180px;
            padding: 1rem 0.5rem;
          }
          .homecard-title {
            font-size: 1.25rem;
          }
          .homecard-desc {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeCard;
