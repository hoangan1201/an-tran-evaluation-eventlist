const Buttons = (() => {
    function editButton() {
      return `
              <button class="edit-button">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" class="edit-icon">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                  </svg>
              </button>
          `;
    }
  
    function deleteButton() {
      return `
              <button class="delete-button">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" class="delete-icon">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                  </svg>
              </button>
          `;
    }
  
    function saveButton() {
      return `
          <button class="save-button">
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" class="save-icon">
                  <path d="M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"/>
              </svg>
          </button>
      `;
    }
  
    function cancelButton(specifyClass) {
      return `
          <button class="cancel-button ${specifyClass}">
              <svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" class="cancel-icon">
                  <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>
              </svg>
          </button>
      `;
    }
  
    function addButton() {
      return `
          <button class="add-button">
              <svg focusable viewBox="0 0 24 24" aria-hidden="true" class="add-icon">
                  <path d="M12 6V18M18 12H6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </button>
      `;
    }
  
    return {
      editButton,
      deleteButton,
      saveButton,
      cancelButton,
      addButton,
    };
  })();
  