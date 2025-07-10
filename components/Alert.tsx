import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="alert-section">
      <div className="alert-card">
        <div className="alert-content">
          <div className="alert-header">
              {iconUrl && (
              <div className="alert-icon">
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
            <p className="alert-title">{title}</p>
            </div>
          <Button asChild className="alert-btn">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
      </div>
      <style jsx>{`
        .alert-section {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100%;
        }
        .alert-card {
          width: 100%;
          max-width: 520px;
          background: #41126A;
          border-radius: 18px;
          padding: 2.25rem 1.5rem;
          color: #fff;
          box-shadow: 0 4px 32px rgba(65, 18, 106, 0.12);
        }
        .alert-content {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }
        .alert-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .alert-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .alert-title {
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .alert-btn {
          background: #41126A !important;
          color: #fff !important;
          border-radius: 8px !important;
          padding: 0.75rem 1.5rem !important;
          font-weight: 600;
          font-size: 1rem;
        }
        @media (max-width: 600px) {
          .alert-card {
            max-width: 100%;
            padding: 1rem 0.5rem;
          }
          .alert-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Alert;
