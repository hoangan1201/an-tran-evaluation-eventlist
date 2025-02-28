class Model {
    #eventsList = [];
  
    constructor() {
      this.#eventsList = [];
    }
  
    setEvents(events) {
      this.#eventsList = events;
    }
  
    getEvents() {
      return this.#eventsList;
    }
  
    addEvent(e) {
      this.#eventsList.push(e);
    }
  
    removeEvent(eventId) {
      this.#eventsList = this.#eventsList.filter((e) => e.id !== eventId);
    }
  }
  
  class View {
    // tableCells = ["event-cell","start-date-cell", "end-date-cell", "action-cell"];
    constructor() {
      this.eventsList = document.querySelector(".table-body");
      this.addNewEventButton = document.querySelector(".new-evn-button");
    }
  
    renderEvents(events) {
      this.eventsList.innerHTML = "";
      events.forEach((event) => {
        this.addEvent(event);
      });
    }
  
    addEvent(event) {
      const { id: eventId, eventName, startDate, endDate } = event;
  
      const eventRow = document.createElement("tr");
      eventRow.classList.add("table-row");
      eventRow.id = `event-${eventId}`;
  
      const eventCell = document.createElement("th");
      eventCell.classList.add("event-cell");
      eventCell.textContent = eventName;
  
      const startDateCell = document.createElement("th");
      startDateCell.classList.add("start-date-cell");
      startDateCell.textContent = startDate;
  
      const endDateCell = document.createElement("th");
      endDateCell.classList.add("end-date-cell");
      endDateCell.textContent = endDate;
  
      const actionCell = document.createElement("th");
      actionCell.classList.add("action-cell");
      actionCell.innerHTML = `${Buttons.editButton()}${Buttons.deleteButton()}`;
      // actionCell
      //   .querySelector(".edit-button")
      //   .addEventListener("click", () => this.editEvent(eventId));
      // actionCell
      //   .querySelector(".delete-button")
      //   .addEventListener("click", () => this.removeEvent(eventId));
      eventRow.append(eventCell, startDateCell, endDateCell, actionCell);
      this.eventsList.appendChild(eventRow);
    }
  
    editEvent(eventId) {
      const eventRow = document.getElementById(`event-${eventId}`);
      const eventCell = eventRow.querySelector(".event-cell");
      const startDateCell = eventRow.querySelector(".start-date-cell");
      const endDateCell = eventRow.querySelector(".end-date-cell");
      const actionCell = eventRow.querySelector(".action-cell");
  
      const oldEventName = eventCell.textContent;
      const oldStartDate = startDateCell.textContent;
      const oldEndDate = endDateCell.textContent;
  
      eventCell.innerHTML = `<input type="text" class="edit-input" value="${oldEventName}" />`;
      startDateCell.innerHTML = `<input type="date" class="edit-input" value="${oldStartDate}" />`;
      endDateCell.innerHTML = `<input type="date" class="edit-input" value="${oldEndDate}" />`;
  
      actionCell.innerHTML = `${Buttons.saveButton()}${Buttons.cancelButton(
        "edit-cancel"
      )}`;
    }
  
    //   handleCancelEditEvent(eventId) {
    //     const eventRow = document.getElementById(`event-${eventId}`);
  
    //     const actionCell = eventRow.querySelector(".action-cell");
    //     actionCell.innerHTML = `${Buttons.editButton()}${Buttons.deleteButton()}`;
    //   }
  
    removeEvent(eventId) {
      document.getElementById(`event-${eventId}`).remove();
    }
  
    addNewEvent() {
      const eventRow = document.createElement("tr");
      eventRow.classList.add("table-row", "input-row");
  
      const eventCell = document.createElement("th");
      eventCell.classList.add("event-cell");
      eventCell.innerHTML = `<input type="text" class="input-field event-input" placeholder="Event Name"/>`;
  
      const startDateCell = document.createElement("th");
      startDateCell.classList.add("start-date-cell");
      startDateCell.innerHTML = `<input type="date" class="input-field start-date-input"/>`;
  
      const endDateCell = document.createElement("th");
      endDateCell.classList.add("end-date-cell");
      endDateCell.innerHTML = `<input type="date" class="input-field end-date-input"/>`;
  
      const actionCell = document.createElement("th");
      actionCell.classList.add("action-cell");
      actionCell.innerHTML = `${Buttons.addButton()}${Buttons.cancelButton(
        "input-cancel"
      )}`;
  
      eventRow.append(eventCell, startDateCell, endDateCell, actionCell);
      this.eventsList.appendChild(eventRow);
    }
  
    removeInputRow() {
      const inputRow = document.querySelector(".input-row");
      inputRow.remove();
    }
  }
  
  class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.init();
    }
  
    async init() {
      const events = await eventAPI.getAllEvents();
      this.model.setEvents(events);
      this.view.renderEvents(events);
      this.attachEventListener();
  
      this.view.addNewEventButton.addEventListener("click", () => {
        this.view.addNewEvent();
        this.attachEventListener();
      });
    }
  
    async handleAddNewEvent() {
      const eventName = document.querySelector(".event-input").value;
      const startDate = document.querySelector(".start-date-input").value;
      const endDate = document.querySelector(".end-date-input").value;
  
      if (!eventName || !startDate || !endDate) {
        alert("Input Not Valid!");
        return;
      }
      const newEvent = { eventName, startDate, endDate };
      const addedEvent = await eventAPI.addNewEvent(newEvent);
      newEvent.id = addedEvent.id; 
  
      this.model.addEvent(newEvent);
      this.view.removeInputRow();
      this.view.addEvent(newEvent);
      this.attachEventListener();
    }
  
    handleCancelAddNewEvent() {
      this.view.removeInputRow();
    }
  
    handleEditEvent(eventId, updatedEvent) {
      // await eventAPI.editEvent(eventId, updatedEvent);
      this.view.editEvent(eventId);
      this.attachEventListener();
    }
  
    async handleSaveEditEvent(eventId, updatedEvent) {
      await eventAPI.editEvent(eventId, updatedEvent);
      this.model.setEvents(
        this.model
          .getEvents()
          .map((event) =>
            event.id == eventId ? { ...event, ...updatedEvent } : event
          )
      );
  
      this.view.renderEvents(this.model.getEvents());
      this.attachEventListener();
    }
  
    handleCancelEditEvent(eventId) {
      const eventRow = document.getElementById(`event-${eventId}`);
  
      const event = this.model.getEvents().find((e) => e.id == eventId);
  
      this.view.renderEvents(this.model.getEvents());
      this.attachEventListener();
    }
  
    async handleRemoveEvent(eventId) {
      await eventAPI.removeEvent(eventId);
      this.model.removeEvent(eventId);
      this.view.removeEvent(eventId);
    }
  
    attachEventListener() {
      /**ADD */
      const addButton = document.querySelector(".add-button");
      if (addButton) {
        addButton.addEventListener("click", () => this.handleAddNewEvent());
      }
      /**CANCEL new */
      const inputCancelButton = document.querySelector(
        ".cancel-button.input-cancel"
      );
      if (inputCancelButton) {
        inputCancelButton.addEventListener("click", () =>
          this.handleCancelAddNewEvent()
        );
      }
      /**CANCEL edit */
      document
        .querySelectorAll(".cancel-button.edit-cancel")
        .forEach((button) => {
          const eventId = button.closest("tr").id.replace("event-", "");
          button.addEventListener("click", () =>
            this.handleCancelEditEvent(eventId)
          );
        });
      /**EDIT */
      document.querySelectorAll(".edit-button").forEach((button) => {
        const eventId = button.closest("tr").id.replace("event-", "");
        button.addEventListener("click", () => this.handleEditEvent(eventId));
      });
      /**SAVE edit */
      document.querySelectorAll(".save-button").forEach((button) => {
        const eventId = button.closest("tr").id.replace("event-", "");
        button.addEventListener("click", () => this.handleSaveEditEvent(eventId));
      });
      /**DELETE */
      document.querySelectorAll(".delete-button").forEach((button) => {
        const eventId = button.closest("tr").id.replace("event-", "");
        button.addEventListener("click", () => this.handleRemoveEvent(eventId));
      });
    }
  }
  
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  