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
import "./Inventory.css";

const Inventory: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    modelo: "",
    serial: "",
    ubicacion: "",
    fechaCompra: "",
    voltaje: "",
    potencia: "",
    peso: "",
    uso: "Fijo",
    capacidad: "",
    material: "",
    tecnologia: "Mecánico",
    prioridad: "Baja",
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const fields = [
    { label: "Nombre del equipo*", key: "nombre", type: "input" },
    { label: "Marca*", key: "marca", type: "input" },
    { label: "Modelo*", key: "modelo", type: "input" },
    { label: "Serial*", key: "serial", type: "input" },
    { label: "Ubicación*", key: "ubicacion", type: "input" },
    { label: "Fecha de compra", key: "fechaCompra", type: "date" },
    { label: "Voltaje del equipo", key: "voltaje", type: "input" },
    { label: "Potencia del equipo", key: "potencia", type: "input" },
    { label: "Peso aprox. del equipo", key: "peso", type: "input" },
    { label: "Capacidad", key: "capacidad", type: "input" },
    { label: "Material", key: "material", type: "input" },
  ];

  const selects = [
    {
      label: "De uso*",
      key: "uso",
      options: [
        { value: "Fijo", label: "Fijo" },
        { value: "Movil", label: "Móvil" },
      ],
    },
    {
      label: "Tecnología predominante*",
      key: "tecnologia",
      options: [
        { value: "Mecánico", label: "Mecánico" },
        { value: "Eléctrico", label: "Eléctrico" },
        { value: "Hidráulico", label: "Hidráulico" },
        { value: "Electrónico", label: "Electrónico" },
        { value: "Neumático", label: "Neumático" },
      ],
    },
    {
      label: "Prioridad de mantenimiento*",
      key: "prioridad",
      options: [
        { value: "Baja", label: "Baja" },
        { value: "Media", label: "Media" },
        { value: "Alta", label: "Alta" },
      ],
    },
  ];

  const handleSubmit = () => {
    console.log("Datos enviados:", formData);
    // Reinicia los datos del formulario
    setFormData({
      nombre: "",
      marca: "",
      modelo: "",
      serial: "",
      ubicacion: "",
      fechaCompra: "",
      voltaje: "",
      potencia: "",
      peso: "",
      uso: "Fijo",
      capacidad: "",
      material: "",
      tecnologia: "Mecánico",
      prioridad: "Baja",
    });
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
          {fields.map((field) => (
            <IonItem key={field.key} className="custom-item">
              <IonLabel position="floating">{field.label}</IonLabel>
              {field.type === "date" ? (
                <input
                  type="date"
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="custom-date"
                />
              ) : (
                <IonInput
                  value={formData[field.key]}
                  onIonChange={(e) =>
                    handleInputChange(field.key, e.detail.value!)
                  }
                  className="custom-input"
                  placeholder={field.label}
                />
              )}
            </IonItem>
          ))}

          {selects.map((select) => (
            <IonItem key={select.key} className="custom-item">
              <IonLabel position="floating">{select.label}</IonLabel>
              <IonSelect
                value={formData[select.key]}
                onIonChange={(e) =>
                  handleInputChange(select.key, e.detail.value!)
                }
                className="custom-select"
              >
                {select.options.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          ))}
          <div className="container-button">
            <IonButton
              onClick={handleSubmit}
              className="custom-button margin-button"
              color="danger"
            >
              Enviar
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Inventory;
