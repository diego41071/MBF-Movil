import FullCalendar from "@fullcalendar/react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Schedule.css";
const Schedule: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Evento seleccionado
  const [showModal, setShowModal] = useState(false);

  // Ejemplo de datos de servicios programados
  const events = [
    {
      id: "1",
      title: "Servicio de mantenimiento A",
      date: "2024-12-18",
      description: "Revisión técnica completa del equipo A.",
      technician: "Juan Pérez",
    },
    {
      id: "2",
      title: "Instalación equipo B",
      date: "2024-12-20",
      description: "Instalación de equipo B en la planta 2.",
      technician: "Ana López",
    },
  ];

  // Manejar clic en un evento
  const handleEventClick = (clickInfo: any) => {
    const eventDetails = events.find(
      (event) => event.id === clickInfo.event.id
    );
    setSelectedEvent(eventDetails);
    setShowModal(true);
  };

  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.updateSize();
      }
    }, 500); // Espera medio segundo antes de forzar la actualización

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
  }, []);

  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    // Forzar renderizado después de un breve tiempo
    const timeout = setTimeout(() => {
      setRenderKey((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Cronograma</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          {/* Calendario */}
          <div className="calendar-container">
            <FullCalendar
              key={renderKey} // Actualiza el componente forzando el re-render
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              slotDuration="00:30:00" // Ajusta la duración del intervalo del calendario
              events={events}
              eventClick={handleEventClick}
              locale="es"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              showNonCurrentDates={true}
              height={"auto"}
            />
          </div>

          {/* Modal para mostrar detalles del evento */}
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Detalles del servicio</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              {selectedEvent ? (
                <div>
                  <h2>{selectedEvent.title}</h2>
                  <p>
                    <strong>Fecha:</strong> {selectedEvent.date}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {selectedEvent.description}
                  </p>
                  <p>
                    <strong>Técnico:</strong> {selectedEvent.technician}
                  </p>
                </div>
              ) : (
                <p>No hay detalles disponibles.</p>
              )}
              <IonButton expand="full" onClick={() => setShowModal(false)}>
                Cerrar
              </IonButton>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
