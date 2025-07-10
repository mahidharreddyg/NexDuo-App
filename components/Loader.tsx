import Image from 'next/image';

const Loader = () => {
  return (
    <div className="loader-container">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
      <style jsx>{`
        .loader-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Loader;
