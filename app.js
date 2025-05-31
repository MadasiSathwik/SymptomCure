/**
 * Main application code for Symptom-Green
 * Initializes the application and sets up event handlers
 */

// Store selected symptoms
let selectedSymptoms = [];

// Initialize the application
function initApp() {
    setupEventListeners();
    renderSearchHistory();
}

// Set up all event listeners
function setupEventListeners() {
    // Symptom input and autocomplete
    const symptomInput = $('#symptom-input');
    symptomInput.addEventListener('input', debounce(function(e) {
        const value = e.target.value.trim();
        const matchingSymptoms = searchSymptoms(value);
        displayAutocompleteResults(matchingSymptoms, value);
    }, 200));
    
    // Close autocomplete when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('#symptom-input') && !e.target.closest('#autocomplete-list')) {
            $('#autocomplete-list').style.display = 'none';
        }
    });
    
    // Search button
    $('#search-btn').addEventListener('click', function() {
        if (selectedSymptoms.length === 0) {
            const inputValue = $('#symptom-input').value.trim();
            if (inputValue) {
                addSymptom(inputValue);
                $('#symptom-input').value = '';
            } else {
                showNotification('Please enter at least one symptom', 'warning');
                return;
            }
        }
        
        performSearch(selectedSymptoms);
    });
    
    // Tab navigation
    const tabButtons = $$('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            $$('.tab-content').forEach(content => content.classList.remove('active'));
            $(`#${tabName}-content`).classList.add('active');
        });
    });
    
    // Enter key in symptom input
    symptomInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const value = e.target.value.trim();
            if (value) {
                addSymptom(value);
                e.target.value = '';
                $('#autocomplete-list').style.display = 'none';
            }
        }
    });
    
    // Close medicine details
    $('#close-details').addEventListener('click', function() {
        $('#medicine-details').classList.remove('active');
    });
}

// Add a symptom to the selected list
function addSymptom(symptom) {
    // Check if symptom is already selected
    if (selectedSymptoms.includes(symptom)) {
        showNotification('This symptom is already selected', 'info');
        return;
    }
    
    selectedSymptoms.push(symptom);
    
    // Add symptom tag to UI
    const tag = renderSymptomTag(symptom, removeSymptom);
    $('#selected-symptoms-list').appendChild(tag);
    
    // Show the selected symptoms section
    $('#selected-symptoms').style.display = 'block';
}

// Remove a symptom from the selected list
function removeSymptom(symptom) {
    // Remove from array
    selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    
    // Remove from UI
    const tagId = `tag-${symptom.replace(/\s+/g, '-').toLowerCase()}`;
    const tag = $(`#${tagId}`);
    if (tag) {
        tag.remove();
    }
    
    // Hide section if no symptoms left
    if (selectedSymptoms.length === 0) {
        $('#selected-symptoms').style.display = 'none';
    }
}

// Perform search based on selected symptoms
function performSearch(symptoms) {
    if (symptoms.length === 0) {
        showNotification('Please select at least one symptom', 'warning');
        return;
    }
    
    // Show loading state
    $('#allopathic-results').innerHTML = '<div class="loading"></div>';
    $('#ayurvedic-results').innerHTML = '<div class="loading"></div>';
    
    // Make results section visible
    $('#results-section').style.display = 'block';
    
    // Scroll to results
    scrollToElement($('#results-section'), 80);
    
    // Small delay to simulate API call
    setTimeout(() => {
        // Get all medicines matching symptoms
        const allMedicines = getMedicinesWithAllergies(symptoms);
        
        // Filter by type
        const allopathicMedicines = allMedicines.filter(m => m.type === 'allopathic');
        const ayurvedicMedicines = allMedicines.filter(m => m.type === 'ayurvedic');
        
        // Render results
        renderSearchResults(allopathicMedicines, 'allopathic-results');
        renderSearchResults(ayurvedicMedicines, 'ayurvedic-results');
        
        // Save to search history
        saveSearchHistory([...symptoms]);
        
        // Update history display
        renderSearchHistory();
        
        // Show notification
        const totalResults = allopathicMedicines.length + ayurvedicMedicines.length;
        showNotification(`Found ${totalResults} medicines for your symptoms`, 'success');
    }, 500);
}

// Render search results
function renderSearchResults(medicines, containerId) {
    const container = $(`#${containerId}`);
    container.innerHTML = '';
    
    if (medicines.length === 0) {
        const noResults = createElement('p', {
            textContent: 'No medicines found for the selected symptoms.',
            style: 'text-align: center; color: var(--neutral-500); padding: 20px;'
        });
        container.appendChild(noResults);
        return;
    }
    
    medicines.forEach(medicine => {
        const card = renderMedicineCard(medicine);
        container.appendChild(card);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);