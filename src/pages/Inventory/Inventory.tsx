import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

const Inventory: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [modelo, setModelo] = useState<string>("");
  const [serial, setSerial] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<string>("");
  const [fechaCompra, setFechaCompra] = useState<string>("");
  const [voltaje, setVoltaje] = useState<string>("");
  const [potencia, setPotencia] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [uso, setUso] = useState<string>("Fijo");
  const [capacidad, setCapacidad] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [tecnologia, setTecnologia] = useState<string>("Mecánico");
  const [prioridad, setPrioridad] = useState<string>("Baja");

  const handleSubmit = () => {
    const data = {
      nombre,
      marca,
      modelo,
      serial,
      ubicacion,
      fechaCompra,
      voltaje,
      potencia,
      peso,
      uso,
      capacidad,
      material,
      tecnologia,
      prioridad,
    };

    console.log("Datos enviados:", data);

    // Resetear formulario
    setNombre("");
    setMarca("");
    setModelo("");
    setSerial("");
    setUbicacion("");
    setFechaCompra("");
    setVoltaje("");
    setPotencia("");
    setPeso("");
    setUso("Fijo");
    setCapacidad("");
    setMaterial("");
    setTecnologia("Mecánico");
    setPrioridad("Baja");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form>
          <IonItem>
            <IonLabel position="stacked">Nombre del equipo*</IonLabel>
            <IonInput
              value={nombre}
              onIonChange={(e) => setNombre(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Marca*</IonLabel>
            <IonInput
              value={marca}
              onIonChange={(e) => setMarca(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Modelo*</IonLabel>
            <IonInput
              value={modelo}
              onIonChange={(e) => setModelo(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Serial*</IonLabel>
            <IonInput
              value={serial}
              onIonChange={(e) => setSerial(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Ubicación*</IonLabel>
            <IonTextarea
              value={ubicacion}
              onIonChange={(e) => setUbicacion(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Fecha de compra</IonLabel>
            <input
              type="date"
              value={fechaCompra}
              onChange={(e) => setFechaCompra(e.target.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Voltaje del equipo</IonLabel>
            <IonInput
              value={voltaje}
              onIonChange={(e) => setVoltaje(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Potencia del equipo</IonLabel>
            <IonInput
              value={potencia}
              onIonChange={(e) => setPotencia(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Peso aprox. del equipo</IonLabel>
            <IonInput
              value={peso}
              onIonChange={(e) => setPeso(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">De uso*</IonLabel>
            <IonSelect value={uso} onIonChange={(e) => setUso(e.detail.value!)}>
              <IonSelectOption value="Fijo">Fijo</IonSelectOption>
              <IonSelectOption value="Movil">Móvil</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Capacidad</IonLabel>
            <IonInput
              value={capacidad}
              onIonChange={(e) => setCapacidad(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Material</IonLabel>
            <IonInput
              value={material}
              onIonChange={(e) => setMaterial(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Tecnología predominante*</IonLabel>
            <IonSelect
              value={tecnologia}
              onIonChange={(e) => setTecnologia(e.detail.value!)}
            >
              <IonSelectOption value="Mecánico">Mecánico</IonSelectOption>
              <IonSelectOption value="Eléctrico">Eléctrico</IonSelectOption>
              <IonSelectOption value="Hidráulico">Hidráulico</IonSelectOption>
              <IonSelectOption value="Electrónico">Electrónico</IonSelectOption>
              <IonSelectOption value="Neumático">Neumático</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Prioridad de mantenimiento*</IonLabel>
            <IonSelect
              value={prioridad}
              onIonChange={(e) => setPrioridad(e.detail.value!)}
            >
              <IonSelectOption value="Baja">Baja</IonSelectOption>
              <IonSelectOption value="Media">Media</IonSelectOption>
              <IonSelectOption value="Alta">Alta</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonButton expand="full" onClick={handleSubmit}>
            Enviar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Inventory;
