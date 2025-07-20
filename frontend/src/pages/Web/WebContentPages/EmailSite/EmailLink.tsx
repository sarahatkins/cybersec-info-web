import React from "react";

interface EmailLinkProps {
  link: string;
  onClick: any;
}

const Link: React.FC<EmailLinkProps> = ({ link, onClick }) => {


  return <p className="link" onClick={() => onClick}>{link}</p>;
};

export default Link;
