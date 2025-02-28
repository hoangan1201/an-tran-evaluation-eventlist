const eventAPI = (() => {
    const API_URL = "http://localhost:3000/events";
  
    async function getAllEvents() {
      const res = await fetch(API_URL);
      const events = await res.json();
      return events;
    }
  
    async function addNewEvent(newEvent) {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      const newEventID = await res.json();
      return newEventID;
    }
  
    async function editEvent(eventId, updatedEvent) {
      try {
        await fetch(`${API_URL}/${eventId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        });
      } catch (error) {
        console.log("Error edit event:", error);
      }
    }
  
    async function removeEvent(eventId) {
      try {
        const res = await fetch(`${API_URL}/${eventId}`, { method: "DELETE" });
      } catch (error) {
        console.log("Error delete event:", error);
      }
    }
  
    return {
      getAllEvents,
      addNewEvent,
      editEvent,
      removeEvent
    };
  })();
  