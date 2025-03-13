import { useEffect, useRef, useState } from "react";
import styles from "./CameraCheck.module.css";

function CameraCheck() {
  const [status, setStatus] = useState("ステータス未確認");
  const refModelViewer = useRef<HTMLElement | null>(null);

  const checkCameraUsage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("カメラは使用可能");
      setStatus("カメラは使用可能");

      // 取得したストリームを即時停止
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.log("カメラにアクセスできません:", error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setStatus("カメラにアクセスできません: " + (error as any).message);
    }
  };

  useEffect(() => {
    refModelViewer.current = document.getElementById("viewer");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (refModelViewer.current as any).activateAR()
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>カメラ使用状況確認</h1>
      <button className={styles.button} onClick={checkCameraUsage}>
        カメラ確認
      </button>
      <p className={styles.status}>{status}</p>
    </div>
  );
}

export default CameraCheck;
