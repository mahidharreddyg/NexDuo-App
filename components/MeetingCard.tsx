"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="meetingcard">
      <article className="meetingcard-header">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="meetingcard-title-row">
          <div className="meetingcard-title-col">
            <h1 className="meetingcard-title">{title}</h1>
            <p className="meetingcard-date">{date}</p>
          </div>
        </div>
      </article>
      <article className="meetingcard-footer">
        <div className="meetingcard-avatars">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={`meetingcard-avatar${index > 0 ? ' meetingcard-avatar-overlap' : ''}`}
              style={{ left: index * 28 }}
            />
          ))}
          <div className="meetingcard-avatar-count">+5</div>
        </div>
        {!isPreviousMeeting && (
          <div className="meetingcard-actions">
            <Button onClick={handleClick} className="meetingcard-btn-primary">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="meetingcard-btn-secondary"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
      <style jsx>{`
        .meetingcard {
          min-height: 258px;
          width: 100%;
          max-width: 568px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 14px;
          background: linear-gradient(90deg, #41126A 0%, #0A0A0A 100%);
          padding: 2rem 1.25rem;
          box-shadow: 0 2px 12px rgba(65, 18, 106, 0.08);
          margin-bottom: 1.5rem;
        }
        .meetingcard-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .meetingcard-title-row {
          display: flex;
          justify-content: space-between;
        }
        .meetingcard-title-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .meetingcard-title {
          font-size: 2rem;
          font-weight: bold;
          color: #fff;
        }
        .meetingcard-date {
          font-size: 1rem;
          font-weight: 400;
          color: #c9ddff;
        }
        .meetingcard-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .meetingcard-avatars {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 180px;
        }
        .meetingcard-avatar {
          border-radius: 50%;
          border: 2px solid #fff;
          position: relative;
          z-index: 1;
          background: #fff;
        }
        .meetingcard-avatar-overlap {
          position: absolute;
          z-index: 0;
        }
        .meetingcard-avatar-count {
          position: absolute;
          left: 136px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 5px solid #fff;
          background: #41126A;
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
        }
        .meetingcard-actions {
          display: flex;
          gap: 0.75rem;
        }
        .meetingcard-btn-primary {
          background: #41126A !important;
          color: #fff !important;
          border-radius: 8px !important;
          padding: 0.5rem 1.5rem !important;
          font-weight: 600;
        }
        .meetingcard-btn-secondary {
          background: #0A0A0A !important;
          color: #fff !important;
          border-radius: 8px !important;
          padding: 0.5rem 1.5rem !important;
          font-weight: 600;
        }
        @media (max-width: 600px) {
          .meetingcard {
            max-width: 100%;
            padding: 1rem 0.5rem;
          }
          .meetingcard-title {
            font-size: 1.25rem;
          }
          .meetingcard-avatar-count {
            left: 80px;
            width: 32px;
            height: 32px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default MeetingCard;
