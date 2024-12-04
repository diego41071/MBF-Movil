import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import QrScanner from "react-qr-scanner";

const QRScan: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null); // Resultado del escaneo
  const [error, setError] = useState<string | null>(null);

  const handleScan = (data: any) => {
    if (data) {
      setScanResult(data.text); // El texto del código QR escaneado
    }
  };

  const handleError = (err: any) => {
    console.error("Error al escanear:", err);
    setError("No se pudo acceder a la cámara. Revisa los permisos.");
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Escáner QR</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {scanResult ? (
          <div>
            <h2>Resultado del QR:</h2>
            <p>{scanResult}</p>
            <IonButton expand="block" onClick={resetScanner}>
              Escanear otro código
            </IonButton>
          </div>
        ) : (
          <div>
            <h2>Apunta al código QR</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default QRScan;
