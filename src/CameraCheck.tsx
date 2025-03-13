import { useState } from "react";
import styles from "./CameraCheck.module.css";

function CameraCheck() {
  const [status, setStatus] = useState("ステータス未確認");

  const checkCameraUsage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("カメラは使用可能");
      setStatus("カメラは使用可能");

      // 取得したストリームを即時停止
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      if (error instanceof Error === false) {
        return;
      }
      if (error.name === "NotReadableError") {
        console.log("カメラが他のアプリまたはタブで使用中の可能性があります");
        setStatus("カメラが他のアプリで使用中の可能性あり");
      } else {
        console.log("カメラにアクセスできません:", error);
        setStatus("カメラにアクセスできません: " + error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>カメラ使用状況確認</h1>
      <button className={styles.button} onClick={checkCameraUsage}>カメラ確認</button>
      <p className={styles.status}>{status}</p>
    </div>
  );
}



export default CameraCheck;
