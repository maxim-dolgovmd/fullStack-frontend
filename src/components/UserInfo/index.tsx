import React from "react";
import styles from "./UserInfo.module.scss";

interface InfoType {
  avatarUrl?: string,
  fullName?: string,
  additionalText?: string
}

export const UserInfo: React.FC<InfoType> = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText && additionalText}</span>
      </div>
    </div>
  );
};
