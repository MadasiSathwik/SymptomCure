/**
 * UI functions for MediMatch
 * Contains functions for rendering UI components and handling UI-specific interactions
 */

// Render a medicine card
function renderMedicineCard(medicine) {
    const card = createElement('div', {
        className: 'medicine-card',
        id: `medicine-${medicine.id}`
    });
    
    // Create image container
    const imgContainer = createElement('div', {
        className: 'medicine-img'
    });
    
    // Create image element
    const img = createElement('img', {
        src: medicine.image || 'https://images.pexels.com/photos/4210611/pexels-photo-4210611.jpeg',
        alt: medicine.name
    });
    
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    
    // Create medicine info container
    const infoContainer = createElement('div', {
        className: 'medicine-info'
    });
    
    // Add medicine name
    const nameElement = createElement('div', {
        className: 'medicine-name',
        textContent: medicine.name
    });
    
    // Add medicine type badge
    const typeElement = createElement('span', {
        className: `medicine-tag ${medicine.type}`,
        textContent: medicine.type === 'ayurvedic' ? 'Ayurvedic' : 'Allopathic'
    });
    
    // Add medicine description
    const descriptionElement = createElement('div', {
        className: 'medicine-description',
        textContent: truncateText(medicine.description, 100)
    });
    
    // Create tags container
    const tagsContainer = createElement('div', {
        className: 'medicine-tags'
    });
    
    // Add condition tags (max 3)
    medicine.conditions.slice(0, 3).forEach(condition => {
        const tagElement = createElement('span', {
            className: 'medicine-tag',
            textContent: condition
        });
        tagsContainer.appendChild(tagElement);
    });
    
    // Add allergy warning if applicable
    if (medicine.hasAllergyWarning) {
        const allergyWarning = createElement('div', {
            className: 'allergy-warning'
        });
        
        const warningIcon = createElement('i', {
            className: 'fas fa-exclamation-triangle'
        });
        
        allergyWarning.appendChild(warningIcon);
        allergyWarning.appendChild(document.createTextNode('Potential allergy risk'));
        
        infoContainer.appendChild(nameElement);
        infoContainer.appendChild(typeElement);
        infoContainer.appendChild(descriptionElement);
        infoContainer.appendChild(tagsContainer);
        infoContainer.appendChild(allergyWarning);
    } else {
        infoContainer.appendChild(nameElement);
        infoContainer.appendChild(typeElement);
        infoContainer.appendChild(descriptionElement);
        infoContainer.appendChild(tagsContainer);
    }
    
    // Add view details link
    const viewDetailsLink = createElement('a', {
        className: 'view-details',
        textContent: 'View Details',
        href: '#',
        onclick: (e) => {
            e.preventDefault();
            showMedicineDetails(medicine.id);
        }
    });
    
    infoContainer.appendChild(viewDetailsLink);
    card.appendChild(infoContainer);
    
    return card;
}

// Render detailed medicine information in the modal
function renderMedicineDetails(medicine) {
    const detailsContent = $('#medicine-details-content');
    detailsContent.innerHTML = '';
    
    // Create detail header with image and title
    const detailHeader = createElement('div', {
        className: 'medicine-detail-header'
    });
    
    const detailImg = createElement('div', {
        className: 'medicine-detail-img'
    });
    
    const img = createElement('img', {
        src: medicine.image || 'https://images.pexels.com/photos/4210611/pexels-photo-4210611.jpeg',
        alt: medicine.name
    });
    
    detailImg.appendChild(img);
    
    const detailTitle = createElement('div', {
        className: 'medicine-detail-title'
    });
    
    const titleElement = createElement('h2', {
        textContent: medicine.name
    });
    
    const typeElement = createElement('span', {
        className: `medicine-type ${medicine.type}`,
        textContent: medicine.type === 'ayurvedic' ? 'Ayurvedic Medicine' : 'Allopathic Medicine'
    });
    
    detailTitle.appendChild(titleElement);
    detailTitle.appendChild(typeElement);
    
    detailHeader.appendChild(detailImg);
    detailHeader.appendChild(detailTitle);
    
    // Create detail content with two columns
    const detailContent = createElement('div', {
        className: 'medicine-detail-content'
    });
    
    // Column 1: Description, Dosage, Conditions
    const column1 = createElement('div');
    
    // Description section
    const descriptionSection = createElement('div', {
        className: 'medicine-detail-section'
    });
    
    const descriptionTitle = createElement('h3', {
        textContent: 'Description'
    });
    
    const descriptionText = createElement('p', {
        textContent: medicine.description
    });
    
    descriptionSection.appendChild(descriptionTitle);
    descriptionSection.appendChild(descriptionText);
    
    // Dosage section
    const dosageSection = createElement('div', {
        className: 'medicine-detail-section'
    });
    
    const dosageTitle = createElement('h3', {
        textContent: 'Recommended Dosage'
    });
    
    const dosageText = createElement('p', {
        textContent: medicine.dosage
    });
    
    dosageSection.appendChild(dosageTitle);
    dosageSection.appendChild(dosageText);
    
    // Conditions section
    const conditionsSection = createElement('div', {
        className: 'medicine-detail-section'
    });
    
    const conditionsTitle = createElement('h3', {
        textContent: 'Treats Conditions'
    });
    
    const conditionsList = createElement('ul');
    medicine.conditions.forEach(condition => {
        const conditionItem = createElement('li', {
            textContent: condition
        });
        conditionsList.appendChild(conditionItem);
    });
    
    conditionsSection.appendChild(conditionsTitle);
    conditionsSection.appendChild(conditionsList);
    
    column1.appendChild(descriptionSection);
    column1.appendChild(dosageSection);
    column1.appendChild(conditionsSection);
    
    // Column 2: Side Effects, Allergies, Contraindications
    const column2 = createElement('div');
    
    // Side Effects section
    const sideEffectsSection = createElement('div', {
        className: 'medicine-detail-section'
    });
    
    const sideEffectsTitle = createElement('h3', {
        textContent: 'Possible Side Effects'
    });
    
    const sideEffectsList = createElement('ul', {
        className: 'side-effects-list'
    });
    
    medicine.sideEffects.forEach(effect => {
        const effectItem = createElement('li', {
            textContent: effect
        });
        sideEffectsList.appendChild(effectItem);
    });
    
    sideEffectsSection.appendChild(sideEffectsTitle);
    sideEffectsSection.appendChild(sideEffectsList);
    
    // Allergies section
    const allergiesSection = createElement('div', {
        className: 'medicine-detail-section'
    });
    
    const allergiesTitle = createElement('h3', {
        textContent: 'Potential Allergies'
    });
    
    const allergiesList = createElement('ul', {
        className: 'allergy-list'
    });
    
    medicine.allergies.forEach(allergy => {
        const allergyItem = createElement('li', {
            textContent: allergy
        });
        allergiesList.appendChild(allergyItem);
    });
    
    allergiesSection.appendChild(allergiesTitle);
    allergiesSection.appendChild(allergiesList);
    
    // Contraindications section
    const contraindicationsSection = createElement('div', {
        className: 'medicine-detail-section'
    });
    
    const contraindicationsTitle = createElement('h3', {
        textContent: 'Contraindications'
    });
    
    const contraindicationsList = createElement('ul');
    medicine.contraindications.forEach(contraindication => {
        const contraindicationItem = createElement('li', {
            textContent: contraindication
        });
        contraindicationsList.appendChild(contraindicationItem);
    });
    
    contraindicationsSection.appendChild(contraindicationsTitle);
    contraindicationsSection.appendChild(contraindicationsList);
    
    column2.appendChild(sideEffectsSection);
    column2.appendChild(allergiesSection);
    column2.appendChild(contraindicationsSection);
    
    // Add columns to detail content
    detailContent.appendChild(column1);
    detailContent.appendChild(column2);
    
    // Add print button
    const printBtn = createElement('button', {
        className: 'print-btn',
        onclick: () => {
            printMedicineInfo(medicine);
        }
    });
    
    const printIcon = createElement('i', {
        className: 'fas fa-print'
    });
    
    printBtn.appendChild(printIcon);
    printBtn.appendChild(document.createTextNode('Print Information'));
    
    // Add all elements to details content
    detailsContent.appendChild(detailHeader);
    detailsContent.appendChild(detailContent);
    detailsContent.appendChild(printBtn);
    
    // Create a unique ID for the print content
    const printContentId = 'print-content-' + medicine.id;
    const printContent = createElement('div', {
        id: printContentId,
        style: 'display: none;'
    });
    
    // Clone the content for printing
    printContent.innerHTML = `
        <h1>${medicine.name}</h1>
        <p><strong>${medicine.type === 'ayurvedic' ? 'Ayurvedic Medicine' : 'Allopathic Medicine'}</strong></p>
        <h2>Description</h2>
        <p>${medicine.description}</p>
        <h2>Recommended Dosage</h2>
        <p>${medicine.dosage}</p>
        <h2>Treats Conditions</h2>
        <ul>
            ${medicine.conditions.map(c => `<li>${c}</li>`).join('')}
        </ul>
        <h2>Possible Side Effects</h2>
        <ul>
            ${medicine.sideEffects.map(e => `<li>${e}</li>`).join('')}
        </ul>
        <h2>Potential Allergies</h2>
        <ul class="warning">
            ${medicine.allergies.map(a => `<li>${a}</li>`).join('')}
        </ul>
        <h2>Contraindications</h2>
        <ul>
            ${medicine.contraindications.map(c => `<li>${c}</li>`).join('')}
        </ul>
        <p><em>Generated by MediMatch - ${new Date().toLocaleDateString()}</em></p>
    `;
    
    detailsContent.appendChild(printContent);
}

// Print medicine information
function printMedicineInfo(medicine) {
    const printContentId = 'print-content-' + medicine.id;
    printElement(printContentId);
}

// Render symptom tag for the selected symptoms list
function renderSymptomTag(symptom, onRemove) {
    const tag = createElement('div', {
        className: 'symptom-tag',
        id: `tag-${symptom.replace(/\s+/g, '-').toLowerCase()}`
    });
    
    const symptomText = document.createTextNode(symptom);
    tag.appendChild(symptomText);
    
    const removeIcon = createElement('i', {
        className: 'fas fa-times',
        onclick: () => onRemove(symptom)
    });
    
    tag.appendChild(removeIcon);
    return tag;
}

// Render search history item
function renderHistoryItem(historyItem) {
    const item = createElement('div', {
        className: 'history-item',
        id: `history-${historyItem.id}`
    });
    
    // Time container
    const timeContainer = createElement('div', {
        className: 'history-time'
    });
    
    const timeText = createElement('span', {
        textContent: daysAgo(historyItem.timestamp)
    });
    
    timeContainer.appendChild(timeText);
    
    // Symptoms container
    const symptomsContainer = createElement('div', {
        className: 'history-symptoms'
    });
    
    historyItem.symptoms.forEach(symptom => {
        const symptomTag = createElement('span', {
            className: 'history-symptom',
            textContent: symptom
        });
        symptomsContainer.appendChild(symptomTag);
    });
    
    // Actions container
    const actionsContainer = createElement('div', {
        className: 'history-actions'
    });
    
    const searchAgainBtn = createElement('button', {
        title: 'Search Again',
        onclick: () => {
            searchAgain(historyItem.symptoms);
        }
    });
    
    const searchIcon = createElement('i', {
        className: 'fas fa-search'
    });
    
    searchAgainBtn.appendChild(searchIcon);
    
    const deleteBtn = createElement('button', {
        title: 'Remove from History',
        onclick: () => {
            removeSearchFromHistory(historyItem.id);
            item.remove();
        }
    });
    
    const deleteIcon = createElement('i', {
        className: 'fas fa-trash'
    });
    
    deleteBtn.appendChild(deleteIcon);
    
    actionsContainer.appendChild(searchAgainBtn);
    actionsContainer.appendChild(deleteBtn);
    
    // Add all elements to history item
    item.appendChild(timeContainer);
    item.appendChild(symptomsContainer);
    item.appendChild(actionsContainer);
    
    return item;
}

// Show the medicine details modal
function showMedicineDetails(medicineId) {
    const medicine = getMedicineById(medicineId); 
    const but=createElement("button"); 
    if (!medicine) return;
    
    renderMedicineDetails(medicine);
    
    const detailsSection = $('#medicine-details');
    detailsSection.classList.add('active');
    
    // Add event listener to close button
    $('#close-details').onclick = () => {
        detailsSection.classList.remove('active');
    };
    
    // Close on click outside the details container
    detailsSection.onclick = (e) => {
        if (e.target === detailsSection) {
            detailsSection.classList.remove('active');
        }
    };
}

// Render all search history items
function renderSearchHistory() {
    const historyContainer = $('#search-history');
    historyContainer.innerHTML = '';
    
    const history = getSearchHistory();
    
    if (history.length === 0) {
        const emptyMessage = createElement('p', {
            textContent: 'No search history yet.',
            style: 'text-align: center; color: var(--neutral-500);'
        });
        historyContainer.appendChild(emptyMessage);
        return;
    }
    
    history.forEach(item => {
        const historyElement = renderHistoryItem(item);
        historyContainer.appendChild(historyElement);
    });
}

// Search again with symptoms from history
function searchAgain(symptoms) {
    // Clear current selected symptoms
    const selectedSymptomsList = $('#selected-symptoms-list');
    selectedSymptomsList.innerHTML = '';
    
    // Add symptoms from history
    symptoms.forEach(symptom => {
        const tag = renderSymptomTag(symptom, (s) => {
            removeSymptom(s);
        });
        selectedSymptomsList.appendChild(tag);
    });
    
    // Perform search
    performSearch(symptoms);
    
    // Scroll to results
    scrollToElement($('#results-section'), 80);
}

// Function to display autocomplete results
function displayAutocompleteResults(matchingSymptoms, inputValue) {
    const autocompleteList = $('#autocomplete-list');
    autocompleteList.innerHTML = '';
    
    if (inputValue === '') {
        autocompleteList.style.display = 'none';
        return;
    }
    
    if (matchingSymptoms.length === 0) {
        autocompleteList.style.display = 'none';
        return;
    }
    
    matchingSymptoms.forEach(symptom => {
        const item = createElement('div', {
            textContent: symptom,
            onclick: () => {
                addSymptom(symptom);
                $('#symptom-input').value = '';
                autocompleteList.innerHTML = '';
                autocompleteList.style.display = 'none';
            }
        });
        
        autocompleteList.appendChild(item);
    });
    
    autocompleteList.style.display = 'block';
}