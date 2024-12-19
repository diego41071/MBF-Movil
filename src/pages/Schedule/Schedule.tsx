import React, { useEffect, useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonModal,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonListHeader,
  IonIcon,
} from "@ionic/react";
import "./Schedule.css";
import {
  add,
  chevronBack,
  chevronForward,
  search,
  timeOutline,
} from "ionicons/icons";
import { createGesture } from "@ionic/core";

interface Event {
  date: string; // Fecha en formato "YYYY-MM-DD"
  title: string;
  type: string; // Tipo de evento (meeting, holiday, etc.)
  time: string;
}

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      date: "2024-12-05",
      title: "Team Meeting",
      type: "meeting",
      time: "12:00",
    },
    {
      date: "2024-12-05",
      title: "Lunch with Client",
      type: "lunch",
      time: "13:00",
    },
    {
      date: "2024-12-12",
      title: "Project Deadline",
      type: "deadline",
      time: "14:00",
    },
    {
      date: "2024-12-25",
      title: "Christmas Day",
      type: "holiday",
      time: "15:00",
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("meeting"); // Tipo de evento
  const calendarRef = useRef<HTMLDivElement>(null);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right" | ""
  >("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const searchEvents = () => {
    const results = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.date.includes(searchQuery)
    );
    setSearchResults(results);
    setIsSearched(true); // Marca que se ha realizado una búsqueda
  };

  // Generar los días del calendario
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Días del siguiente mes
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setAnimationDirection("right");
    setTimeout(() => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
      setAnimationDirection("");
    }, 300); // Duración de la animación
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setAnimationDirection("left");
    setTimeout(() => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
      setAnimationDirection("");
    }, 300); // Duración de la animación
  };

  const [eventTime, setEventTime] = useState("12:00"); // Estado para la hora del evento

  const addEvent = () => {
    if (selectedDate) {
      // Si ya hay una fecha seleccionada, agregar el evento
      if (eventTitle.trim()) {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            date: selectedDate,
            title: eventTitle,
            type: eventType,
            time: eventTime,
          },
        ]);
        setEventTitle("");
        setEventType("meeting");
        setEventTime("12:00");
        setShowModal(false);
      }
    } else {
      // Si no hay fecha seleccionada, mostrar un modal para que el usuario elija una
      setShowModal(true);
    }
  };

  const getEventsForDate = (date: string) =>
    events.filter((event) => event.date === date);

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const handleDayClick = (date: Date) => {
    const formattedDate = formatDate(date);
    // Si ya hay una fecha seleccionada, permite agregar el evento a esa fecha
    if (selectedDate) {
      setSelectedDate(formattedDate);
      setSelectedEvents(getEventsForDate(formattedDate));
    } else {
      // Si no hay fecha seleccionada, selecciona la fecha al hacer clic
      setSelectedDate(formattedDate);
    }
  };

  // Para asegurar que si se escoge una fecha, se mantenga el formulario actual
  useEffect(() => {
    if (selectedDate) {
      // Muestra el formulario para agregar el evento si ya hay una fecha seleccionada
      setShowModal(true);
    }
  }, [selectedDate]);

  const days = generateCalendarDays();

  useEffect(() => {
    const gesture = createGesture({
      el: calendarRef.current!, // Elemento objetivo del gesto
      gestureName: "calendar-swipe",
      onMove: (ev) => {
        if (ev.deltaX > 50) {
          goToPreviousMonth(); // Deslizar a la derecha
        } else if (ev.deltaX < -50) {
          goToNextMonth(); // Deslizar a la izquierda
        }
      },
    });
    gesture.enable();

    return () => gesture.destroy(); // Limpia el gesto al desmontar
  }, [currentDate]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cronograma</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="calendar-controls">
          <IonIcon icon={chevronBack} onClick={goToPreviousMonth} />
          {currentDate.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
          <IonIcon icon={chevronForward} onClick={goToNextMonth} />
          <IonIcon icon={search} onClick={() => setShowSearchModal(true)} />
          <IonIcon icon={add} onClick={(e) => setShowModal(true)} />
        </div>
        <div
          ref={calendarRef}
          className={`calendar-container ${animationDirection}`}
        >
          <IonGrid>
            {/* Encabezados de días de la semana */}
            <IonRow>
              {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map((day) => (
                <IonCol key={day} className="calendar-header">
                  {day}
                </IonCol>
              ))}
            </IonRow>

            {/* Generación de días */}
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <IonRow key={rowIndex} className="calendar-row">
                {days
                  .slice(rowIndex * 7, rowIndex * 7 + 7)
                  .map((dayObj, index) => (
                    <IonCol key={index}>
                      <div
                        className={`calendar-day ${
                          dayObj.isCurrentMonth ? "" : "calendar-day-outside"
                        }`}
                        onClick={() => handleDayClick(dayObj.date)}
                      >
                        <div
                          className={`${
                            selectedDate === formatDate(dayObj.date)
                              ? "selected-day"
                              : ""
                          }`}
                        >
                          {dayObj.date.getDate()}
                        </div>{" "}
                      </div>
                      {/* Mostrar las barras de eventos */}
                      <div className="event-bars">
                        {getEventsForDate(formatDate(dayObj.date)).map(
                          (event, idx) => (
                            <div
                              key={idx}
                              className={`event-bar ${event.type}`}
                            ></div>
                          )
                        )}
                      </div>
                    </IonCol>
                  ))}
              </IonRow>
            ))}
          </IonGrid>
        </div>
        {/* Lista de eventos debajo del calendario */}
        {selectedEvents.length > 0 && (
          <IonList>
            <IonListHeader>
              <IonLabel>
                <h3>Eventos del {selectedDate}</h3>
              </IonLabel>
            </IonListHeader>
            {selectedEvents.map((event, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h3>{event.title}</h3>
                  <p>Tipo: {event.type}</p>
                  <p>Hora: {event.time}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        {/* Modal para agregar eventos */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent className="ion-padding">
            <h2>Agregar Evento</h2>
            <IonItem className="custom-item">
              <IonLabel position="floating">Título del Evento</IonLabel>
              <IonInput
                value={eventTitle}
                onIonInput={(e) => setEventTitle(e.detail.value!)}
                placeholder="Ingrese el título del evento"
                className="custom-input"
              />
            </IonItem>
            <IonItem className="custom-item">
              <IonLabel position="floating">Tipo de Evento</IonLabel>
              <IonInput
                value={eventType}
                onIonInput={(e) => setEventType(e.detail.value!)}
                placeholder="Ingrese el tipo de evento"
                className="custom-input"
              />
            </IonItem>
            <IonItem className="custom-item">
              <IonLabel position="floating">Hora del Evento</IonLabel>
              <IonInput
                type="time"
                value={eventTime}
                onIonInput={(e) => setEventTime(e.detail.value!)}
                className="custom-input"
                placeholder="Select Time"
              ></IonInput>
            </IonItem>
            <div className="container-button">
              <IonButton
                expand="block"
                onClick={addEvent}
                className="custom-button margin-button"
                color={"danger"}
              >
                Guardar
              </IonButton>
            </div>
            <div className="container-button">
              <IonButton
                expand="block"
                color="medium"
                onClick={() => setShowModal(false)}
                className="custom-button"
              >
                Cancelar
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
        <IonModal
          isOpen={showSearchModal}
          onDidDismiss={() => setShowSearchModal(false)}
        >
          <IonContent className="ion-padding">
            <h2>Buscar Eventos</h2>
            <IonItem className="custom-item">
              <IonLabel position="floating">Criterio de Búsqueda</IonLabel>
              <IonInput
                value={searchQuery}
                onIonInput={(e) => setSearchQuery(e.detail.value!)}
                placeholder="Ingrese título, tipo o fecha (YYYY-MM-DD)"
                className="custom-input"
              />
            </IonItem>
            <div className="container-button">
              <IonButton
                expand="block"
                onClick={searchEvents}
                className="custom-button margin-button"
                color={"danger"}
              >
                Buscar
              </IonButton>
            </div>
            <div className="container-button">
              <IonButton
                expand="block"
                color="medium"
                onClick={() => setShowSearchModal(false)}
                className="custom-button"
              >
                Cerrar
              </IonButton>
            </div>
            {searchResults.length > 0 && (
              <IonList>
                <IonListHeader>
                  <h3>Resultados de la Búsqueda</h3>
                </IonListHeader>
                {searchResults.map((event, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h3>{event.title}</h3>
                      <p>Fecha: {event.date}</p>
                      <p>Tipo: {event.type}</p>
                      <p>Hora: {event.time}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
            {searchResults.length === 0 && isSearched && searchQuery.trim() && (
              <p>
                No se encontraron eventos que coincidan con el criterio de
                búsqueda.
              </p>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
