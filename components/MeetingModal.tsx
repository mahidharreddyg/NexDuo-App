"use client";
import { ReactNode } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className = '',
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName = '',
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="meetingmodal-content">
        <div className="meetingmodal-inner">
          {image && (
            <div className="meetingmodal-image">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          <h1 className={`meetingmodal-title ${className}`}>{title}</h1>
          {children}
          <Button
            className={`meetingmodal-btn ${buttonClassName}`}
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
        <style jsx>{`
          .meetingmodal-content {
            display: flex;
            width: 100%;
            max-width: 520px;
            flex-direction: column;
            gap: 1.5rem;
            border: none;
            background: #1a1a1a;
            padding: 2.25rem 1.5rem;
            color: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 32px rgba(65, 18, 106, 0.12);
          }
          .meetingmodal-inner {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .meetingmodal-image {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5rem;
          }
          .meetingmodal-title {
            font-size: 2rem;
            font-weight: bold;
            line-height: 1.2;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .meetingmodal-btn {
            background: #41126A !important;
            color: #fff !important;
            border-radius: 8px !important;
            padding: 0.75rem 1.5rem !important;
            font-weight: 600;
            font-size: 1rem;
            margin-top: 1rem;
          }
          @media (max-width: 600px) {
            .meetingmodal-content {
              max-width: 100%;
              padding: 1rem 0.5rem;
            }
            .meetingmodal-title {
              font-size: 1.25rem;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
