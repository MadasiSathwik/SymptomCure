/**
 * Data management for MediMatch
 * Contains symptom data, medicine data, and related helper functions
 */

// List of common symptoms for autocomplete
const symptomsList = [
  "Hair loss", "Nausea", "Fever",
  "Irregular periods", "Muscle pain", "Back pain",
  "Shortness of breath", "Vomiting", "Irregular periods",
  "Fatigue", "Excessive thirst", "Irregular periods",
  "Memory loss", "Body ache", "Tingling",
  "Loss of appetite", "Cough", "Fever",
  "Body ache", "Dizziness", "Shortness of breath",
  "Stress", "Tremors", "Fever",
  "Confusion", "Chest pain", "Burning urination",
  "Dry skin", "Frequent urination", "Memory loss",
  "Hearing loss", "Shortness of breath", "Weight loss",
  "Tingling", "Muscle pain", "Headache",
  "Hot flashes", "Constipation", "Frequent urination",
  "Loss of appetite", "Bleeding", "Muscle pain",
  "Diarrhea", "Dizziness", "Hot flashes",
  "Bleeding", "Fatigue", "Body ache",
  "Blurred vision", "Fatigue", "Bruising",
  "Bruising", "Tremors", "Joint pain",
  "Cough", "Menstrual pain", "Insomnia",
  "Memory loss", "Nausea", "Blurred vision",
  "Body ache", "Confusion", "Rash",
  "Hair loss", "Seizures", "Eye pain",
  "Numbness", "Chest pain", "Burning urination",
  "Runny nose", "Cough", "Dry mouth",
  "Shortness of breath", "Cold hands and feet", "Rash",
  "Body ache", "Shortness of breath", "Fatigue",
  "Blurred vision", "Muscle pain", "Insomnia",
  "Hair loss", "Eye pain", "Constipation",
  "Eye pain", "Bruising", "Dizziness",
  "Dry mouth", "Muscle pain", "Frequent urination",
  "Excessive thirst", "Dry skin", "Runny nose",
  "Tremors", "Hair loss", "Constipation",
  "Memory loss", "Menstrual pain", "Back pain",
  "Constipation", "Insomnia", "Blurred vision",
  "Muscle pain", "Hair loss", "Frequent urination",
  "Confusion", "Shortness of breath", "Excessive thirst",
  "Swelling", "Cold hands and feet", "Sore throat",
  "Shortness of breath", "Cough", "Swelling",
  "Ear pain", "Muscle pain", "Runny nose",
  "Dizziness", "Numbness", "Burning urination",
  "Swelling", "Dizziness", "Dry skin",
  "Depression", "Ear pain", "Dry skin",
  "Insomnia", "Diarrhea", "Joint pain",
  "Vomiting", "Back pain", "Irregular periods",
  "Confusion", "Memory loss", "Joint pain",
  "Irregular periods", "Tingling", "Loss of appetite",
  "Tingling", "Ear pain", "Eye pain",
  "Shortness of breath", "Vomiting", "Stress",
  "Depression", "Body ache", "Hot flashes",
  "Sore throat", "Nausea", "Diarrhea"
];

// Medicine database with detailed information
const medicines = [
{
    id: "m1",
    name: "Ashwagandha",
    type: "ayurvedic",
    description: "An ancient medicinal herb used for stress reduction, improving concentration, and increasing energy levels.",
    dosage: "300-500 mg extract twice daily",
    sideEffects: ["Drowsiness", "Upset stomach", "Diarrhea"],
    allergies: ["Nightshade family plants"],
    conditions: ["Stress", "Anxiety", "Fatigue", "Insomnia"],
    contraindications: ["Pregnancy", "Autoimmune diseases", "Thyroid disorders"],
    image: "Images/Herbal images/ashwagandha.jpg"
  },
  {
    id: "m2",
    name: "Tulsi",
    type: "ayurvedic",
    description: "Holy Basil, known for its immunity-boosting and anti-inflammatory properties.",
    dosage: "Tea 1-2 times daily or 300 mg capsule",
    sideEffects: ["Lowers blood sugar", "Lowers fertility with long-term use"],
    allergies: ["Mint family sensitivity"],
    conditions: ["Cold", "Flu", "Inflammation", "Stress"],
    contraindications: ["Pregnancy", "Hypoglycemia", "Fertility concerns"],
    image: "Images/Herbal images/tulsi.jpg"
  },
  {
    id: "m3",
    name: "Turmeric",
    type: "ayurvedic",
    description: "A powerful anti-inflammatory and antioxidant herb used for joint and skin health.",
    dosage: "500 mg curcumin extract or 1/2 tsp powder with milk",
    sideEffects: ["Stomach upset", "Blood thinning", "Heating effect"],
    allergies: [],
    conditions: ["Joint pain", "Inflammation", "Skin issues"],
    contraindications: ["Pregnancy (high doses)", "Heavy menstrual bleeding"],
    image: "Images/Herbal images/turmeric.png"
  },
  {
    id: "m4",
    name: "Ginger",
    type: "ayurvedic",
    description: "Widely used for nausea, digestion, and inflammation relief.",
    dosage: "1-2 tsp fresh or dried ginger tea, or 500 mg supplement",
    sideEffects: ["Heartburn", "Thins blood", "Drying effect"],
    allergies: ["Ginger family sensitivity"],
    conditions: ["Nausea", "Joint pain", "Cold"],
    contraindications: ["Ulcers", "Pregnancy (excess)"],
    image: "Images/Herbal images/ginger.jpg"
  },
  {
    id: "m5",
    name: "Neem",
    type: "ayurvedic",
    description: "Known for its antibacterial, antifungal and detoxifying properties.",
    dosage: "Neem decoction or 1 capsule (250-500 mg)",
    sideEffects: ["Hypoglycemia", "Liver toxicity in excess"],
    allergies: [],
    conditions: ["Skin irritation", "Fever", "Allergy", "Infection"],
    contraindications: ["Pregnancy", "Children", "Fertility concerns", "Elderly (in liver issues)"],
    image: "Images/Herbal images/Neem.jpg"
  },
  {
    id: "m6",
    name: "Giloy",
    type: "ayurvedic",
    description: "An immunity booster used in treating fever, infections, and inflammatory conditions.",
    dosage: "20-30 ml juice daily",
    sideEffects: ["Constipation", "Liver impact in excess"],
    allergies: [],
    conditions: ["Fever", "Viral infection", "Fatigue"],
    contraindications: ["Pregnancy"],
    image: "Images/Herbal images/giloy.png"
  },
  {
    id: "m7",
    name: "Amla",
    type: "ayurvedic",
    description: "Rich in Vitamin C, enhances immunity, improves skin, hair, and digestive health.",
    dosage: "30 ml juice or 1 tsp powder daily",
    sideEffects: ["May cause chills", "Loose stools if excess"],
    allergies: [],
    conditions: ["Hair fall", "Fatigue", "Skin irritation"],
    contraindications: [],
    image: "Images/Herbal images/amla.png"
  },
  {
    id: "m8",
    name: "Chamomile",
    type: "ayurvedic",
    description: "Mild sedative and digestive relaxant used for anxiety, insomnia, and bloating.",
    dosage: "Tea 1-2 times daily",
    sideEffects: ["Drowsiness", "Allergy (especially to ragweed)"],
    allergies: ["Ragweed family"],
    conditions: ["Insomnia", "Anxiety", "Pain"],
    contraindications: ["Pregnancy", "Young children", "With sedatives"],
    image: "Images/Herbal images/chamomile.jpg"
  },
  {
    id: "m9",
    name: "Fennel",
    type: "ayurvedic",
    description: "Used for bloating, indigestion, and hormonal balance.",
    dosage: "1 tsp seeds after meals or tea",
    sideEffects: ["Hormonal sensitivity", "Photosensitivity"],
    allergies: [],
    conditions: ["Acidity", "Hormonal imbalance", "Gut health"],
    contraindications: ["Pregnancy", "Hormone-sensitive conditions"],
    image: "Images/Herbal images/fennel.png"
  },
  {
    id: "m10",
    name: "Triphala",
    type: "ayurvedic",
    description: "A detoxifying herbal blend used for digestion and cleansing.",
    dosage: "1/2 to 1 tsp powder with warm water at night",
    sideEffects: ["Laxative effect"],
    allergies: [],
    conditions: ["Constipation", "Indigestion"],
    contraindications: ["Children <10 years"],
    image: "Images/Herbal images/triphala.jpg"
  },
  {
    id: "m11",
    name: "Omeprazole",
    type: "allopathic",
    description: "A proton pump inhibitor used to reduce stomach acid, treat gastritis, GERD, and related dizziness and pain.",
    dosage: "20 mg once daily before food",
    sideEffects: ["Headache", "Diarrhea", "Abdominal pain"],
    allergies: ["Hypersensitivity to PPIs"],
    conditions: ["Gastritis", "GERD", "Acidity"],
    contraindications: ["Pregnancy (consult doctor)", "Severe liver disease"],
    image: "Images/Medicines Images/omeprazole pic.jpg"
  },
  {
    id: "m12",
    name: "Sertraline",
    type: "allopathic",
    description: "An SSRI antidepressant used for anxiety, stress, and depression management.",
    dosage: "50-100 mg once daily",
    sideEffects: ["Nausea", "Drowsiness", "Dry mouth"],
    allergies: ["Hypersensitivity to SSRIs"],
    conditions: ["Anxiety", "Stress", "Depression"],
    contraindications: ["Bipolar disorder", "Liver impairment"],
    image: "Images/Medicines Images/sertraline.jpg"
  },
  {
    id: "m13",
    name: "Paracetamol",
    type: "allopathic",
    description: "Common analgesic and antipyretic used for fever, headache, and mild pain.",
    dosage: "500 mg to 1 g every 4-6 hours (max 4g/day)",
    sideEffects: ["Liver toxicity (in overdose)"],
    allergies: ["Hypersensitivity"],
    conditions: ["Fever", "Cold", "Pain"],
    contraindications: ["Severe liver disease"],
    image: "Images/Medicines Images/paracetamol.jpg"
  },
  {
    id: "m14",
    name: "Ibuprofen",
    type: "allopathic",
    description: "A non-steroidal anti-inflammatory drug (NSAID) used to reduce pain, inflammation, and fever.",
    dosage: "200–400 mg every 6–8 hours",
    sideEffects: ["Stomach upset", "GI bleeding", "Kidney strain"],
    allergies: ["NSAID hypersensitivity"],
    conditions: ["Pain", "Inflammation", "Fever"],
    contraindications: ["Peptic ulcer", "Kidney disease", "Pregnancy (3rd trimester)"],
    image: "Images/Medicines Images/Ibuprofen tablet.jpg"
  },
  {
    id: "m15",
    name: "Ondansetron",
    type: "allopathic",
    description: "An antiemetic used to prevent nausea and vomiting from various causes.",
    dosage: "4–8 mg orally or IV every 8 hours",
    sideEffects: ["Constipation", "Headache", "QT prolongation"],
    allergies: ["5-HT3 antagonist hypersensitivity"],
    conditions: ["Nausea", "Vomiting"],
    contraindications: ["QT prolongation", "Liver issues"],
    image: "Images/Medicines Images/ondansetron.jpg"
  },
  {
    id: "m16",
    name: "Cetirizine",
    type: "allopathic",
    description: "An antihistamine used to treat allergies, rashes, and seasonal flu symptoms.",
    dosage: "5-10 mg once daily",
    sideEffects: ["Drowsiness", "Dry mouth", "Dizziness"],
    allergies: ["Cetirizine hypersensitivity"],
    conditions: ["Allergy", "Itching", "Runny nose"],
    contraindications: ["Severe kidney disease", "Pregnancy (consult doctor)"],
    image: "Images/Medicines Images/cetirizine.jpg"
  },
  {
    id: "m17",
    name: "Biotin",
    type: "allopathic",
    description: "A vitamin supplement used to improve hair, nail, and skin health.",
    dosage: "5–10 mg daily",
    sideEffects: ["Mild nausea", "Skin rash (rare)"],
    allergies: ["None known"],
    conditions: ["Hair fall", "Fatigue", "Weak nails"],
    contraindications: ["None significant"],
    image: "Images/Medicines Images/biotin.jpg"
  },
  {
    id: "m18",
    name: "Melatonin",
    type: "allopathic",
    description: "A natural sleep hormone supplement used for sleep disorders and insomnia.",
    dosage: "3–10 mg at bedtime",
    sideEffects: ["Drowsiness", "Headache", "Hormonal interference"],
    allergies: ["Rare"],
    conditions: ["Insomnia", "Jet lag"],
    contraindications: ["Pregnancy", "Depression", "Autoimmune diseases"],
    image: "Images/Medicines Images/melatonin.jpg"
  },
  {
    id: "m19",
    name: "Lactulose",
    type: "allopathic",
    description: "A synthetic sugar used as a laxative to treat constipation and hepatic encephalopathy.",
    dosage: "15–30 ml once or twice daily",
    sideEffects: ["Bloating", "Flatulence", "Cramps"],
    allergies: ["Rare"],
    conditions: ["Constipation", "Indigestion"],
    contraindications: ["Galactosemia", "Diabetes (caution)"],
    image: "Images/Medicines Images/lactulose.jpg"
  },
  {
    id: "m20",
    name: "Metformin",
    type: "allopathic",
    description: "An oral antidiabetic drug also used for hormonal imbalance in PCOS and insulin resistance.",
    dosage: "500–1000 mg twice daily with meals",
    sideEffects: ["Bloating", "Nausea", "Lactic acidosis (rare)"],
    allergies: ["Metformin hypersensitivity"],
    conditions: ["PCOS", "Hormonal imbalance", "Diabetes"],
    contraindications: ["Kidney dysfunction", "Severe infection", "Alcohol abuse"],
    image: "Images/Medicines Images/metformin.jpg"
  },
  {
  id: "m21",
  name: "Licorice (Yashtimadhu)",
  type: "ayurvedic",
  description: "Soothes gastric inflammation and acidity, commonly used in GERD and gastritis.",
  dosage: "1-2 g powder with honey or warm water twice daily",
  sideEffects: ["Water retention", "Increased blood pressure (in excess)"],
  allergies: ["Legume family allergy (rare)"],
  conditions: ["Gastritis", "GERD", "Acidity"],
  contraindications: ["Hypertension", "Kidney disease"],
  image: "Images/Herbal images/licorice.jpg"
},
{
  id: "m22",
  name: "Ashwagandha",
  type: "ayurvedic",
  description: "Supports thyroid function, reduces fatigue, and alleviates hair loss and swelling.",
  dosage: "300-600 mg extract daily",
  sideEffects: ["Drowsiness", "Upset stomach"],
  allergies: [],
  conditions: ["Hypothyroidism", "Fatigue", "Hair loss"],
  contraindications: ["Pregnancy", "Hyperthyroidism"],
  image: "Images/Herbal images/ashwagandha.jpg"
},
{
  id: "m23",
  name: "Guduchi (Giloy)",
  type: "ayurvedic",
  description: "Natural antipyretic and analgesic for fever, pain, and viral infections.",
  dosage: "20-30 ml juice or 1-2 capsules daily",
  sideEffects: ["Constipation", "Liver strain if overused"],
  allergies: [],
  conditions: ["Fever", "Viral infection", "Pain"],
  contraindications: ["Pregnancy"],
  image: "Images/Herbal images/giloy.png"
},
{
  id: "m24",
  name: "Neem",
  type: "ayurvedic",
  description: "Natural antibiotic with antibacterial properties used for infections and fevers.",
  dosage: "1-2 g powder or 20 ml juice daily",
  sideEffects: ["Hypoglycemia", "Liver impact (excess use)"],
  allergies: ["Neem allergy"],
  conditions: ["Infections", "UTIs", "Fever"],
  contraindications: ["Pregnancy", "Infertility"],
  image: "Images/Herbal images/Neem.jpg"
},
{
  id: "m25",
  name: "Amla (Indian Gooseberry)",
  type: "ayurvedic",
  description: "Alkalizing and rich in vitamin C, supports digestion and acidity relief.",
  dosage: "10-20 ml juice or 1-2 g powder daily",
  sideEffects: ["Diarrhea (in excess)"],
  allergies: [],
  conditions: ["GERD", "Liver stress", "Acidity"],
  contraindications: ["Diarrhea tendency"],
  image: "Images/Herbal images/amla.png"
},
{
  id: "m26",
  name: "Tulsi (Holy Basil)",
  type: "ayurvedic",
  description: "Natural antihistamine and anti-inflammatory for allergies and joint pain.",
  dosage: "2-3 leaves daily or 5-10 ml extract",
  sideEffects: ["Mild blood thinning"],
  allergies: [],
  conditions: ["Allergies", "Rhinitis", "Arthritis"],
  contraindications: ["Bleeding disorders"],
  image: "Images/Herbal images/tulsi.jpg"
},
{
  id: "m27",
  name: "Turmeric (Curcumin)",
  type: "ayurvedic",
  description: "Anti-inflammatory and immunomodulatory herb for autoimmune and rheumatic conditions.",
  dosage: "500-1000 mg curcumin extract daily",
  sideEffects: ["Stomach upset", "Blood thinning"],
  allergies: ["Turmeric allergy"],
  conditions: ["Autoimmune diseases", "Rheumatism"],
  contraindications: ["Bleeding disorders", "Gallstones"],
  image: "Images/Herbal images/turmeric.png"
},
{
  id: "m28",
  name: "Shatavari root",
  type: "ayurvedic",
  description: "Antiviral herb effective in early stages of viral infections and flu.",
  dosage: "400 mg extract or 20 ml juice twice daily",
  sideEffects: ["Loss of appetite", "Fatigue"],
  allergies: [],
  conditions: ["Influenza", "Viral infections"],
  contraindications: ["Pregnancy"],
  image: "Images/Herbal images/shatavariroot.jpg"
},
{
  id: "m29",
  name: "Licorice root(Mulethi - Glycyrrhiza glabra)",
  type: "ayurvedic",
  description: "Natural anti-inflammatory for joint pain, nausea, and inflammation.",
  dosage: "300-500 mg extract twice daily",
  sideEffects: ["Acid reflux (rare)", "Skin rash"],
  allergies: [],
  conditions: ["Pain", "Inflammation"],
  contraindications: ["Pregnancy"],
  image: "Images/Herbal images/licoriceroot.jpg"
},
{
  id: "m30",
  name: "Triphala",
  type: "ayurvedic",
  description: "Digestive tonic that balances acidity, supports detox, and relieves stress-related indigestion.",
  dosage: "1-2 tsp powder with warm water at bedtime",
  sideEffects: ["Loose stools (initially)"],
  allergies: [],
  conditions: ["GERD", "Stress-related indigestion", "Acidity"],
  contraindications: ["Diarrhea", "Pregnancy"],
  image: "Images/Herbal images/triphala.jpg"
},
  {
    id: "m31",
    name: "Omeprazole",
    type: "allopathic",
    description: "A proton pump inhibitor used to reduce stomach acid, treat gastritis, GERD, and related dizziness and pain.",
    dosage: "20 mg once daily before food",
    sideEffects: ["Headache", "Diarrhea", "Abdominal pain"],
    allergies: ["Hypersensitivity to PPIs"],
    conditions: ["Gastritis", "GERD", "Acidity"],
    contraindications: ["Pregnancy (consult doctor)", "Severe liver disease"],
    image: "Images/Medicines Images/omeprazole pic.jpg"
  },
  {
    id: "m32",
    name: "Levothyroxine",
    type: "allopathic",
    description: "A synthetic thyroid hormone used for hypothyroidism and managing fatigue, hair loss, and swelling.",
    dosage: "25-100 mcg daily before breakfast (adjusted based on blood tests)",
    sideEffects: ["Palpitations", "Weight loss", "Insomnia"],
    allergies: ["Sensitivity to thyroid hormones"],
    conditions: ["Hypothyroidism"],
    contraindications: ["Acute myocardial infarction", "Untreated adrenal insufficiency"],
    image: "Images/Medicines Images/Levothyroxine Tablets.jpg"
  },
  {
    id: "m33",
    name: "Paracetamol",
    type: "allopathic",
    description: "Used to relieve mild to moderate pain, fever, sore throat and joint aches from viral infections or early RA.",
    dosage: "500 mg every 6-8 hours as needed",
    sideEffects: ["Liver damage in overdose"],
    allergies: ["Paracetamol hypersensitivity"],
    conditions: ["Viral infection", "Fever", "Pain"],
    contraindications: ["Severe liver disease"],
    image: "Images/Medicines Images/Paracetamol.jpg"
  },
  {
    id: "m34",
    name: "Ciprofloxacin",
    type: "allopathic",
    description: "An antibiotic often used to treat UTIs and bacterial fever with swelling and nausea.",
    dosage: "500 mg twice daily for 5-7 days",
    sideEffects: ["Nausea", "Diarrhea", "Tendon rupture (rare)"],
    allergies: ["Quinolone antibiotics"],
    conditions: ["UTI", "Fever", "Infection"],
    contraindications: ["Pregnancy", "Tendon disorders"],
    image: "Images/Medicines Images/ciprofloxacin.jpg"
  },
  {
    id: "m35",
    name: "Ranitidine (discontinued in some countries)",
    type: "allopathic",
    description: "H2 blocker previously used for acidity, GERD, and liver-related digestive stress.",
    dosage: "150 mg twice daily",
    sideEffects: ["Constipation", "Dizziness"],
    allergies: ["H2 receptor antagonist sensitivity"],
    conditions: ["GERD", "Liver stress"],
    contraindications: ["Renal impairment"],
    image: "Images/Medicines Images/ranitidine.jpg"
  },
  {
    id: "m36",
    name: "Cetirizine",
    type: "allopathic",
    description: "Antihistamine used for sneezing, allergic arthritis, and mild joint-related allergy symptoms.",
    dosage: "10 mg once daily",
    sideEffects: ["Drowsiness", "Dry mouth"],
    allergies: ["Antihistamines"],
    conditions: ["Allergies", "Rhinitis", "Arthritis"],
    contraindications: ["Severe liver disease"],
    image: "Images/Medicines Images/Cetirizine.jpg"
  },
  {
    id: "m37",
    name: "Methotrexate",
    type: "allopathic",
    description: "Disease-modifying anti-rheumatic drug (DMARD) used in autoimmune and rheumatic disorders.",
    dosage: "7.5-25 mg weekly (oral/injection)",
    sideEffects: ["Liver toxicity", "Mouth ulcers", "Hair loss"],
    allergies: ["Folate antagonists"],
    conditions: ["Autoimmune diseases", "Rheumatism"],
    contraindications: ["Pregnancy", "Liver disease"],
    image: "Images/Medicines Images/methotrexate.jpg"
  },
  {
    id: "m38",
    name: "Oseltamivir",
    type: "allopathic",
    description: "Antiviral used in early treatment of flu to reduce symptoms like sore throat, fever, and fatigue.",
    dosage: "75 mg twice daily for 5 days",
    sideEffects: ["Nausea", "Vomiting"],
    allergies: ["Oseltamivir hypersensitivity"],
    conditions: ["Influenza", "Viral infections"],
    contraindications: ["Renal failure"],
    image: "Images/Medicines Images/Oseltamivir.jpg"
  },
  {
    id: "m39",
    name: "Ibuprofen",
    type: "allopathic",
    description: "Non-steroidal anti-inflammatory drug (NSAID) used for dizziness, nausea, and joint aches.",
    dosage: "200-400 mg every 6-8 hours",
    sideEffects: ["Gastric irritation", "Kidney impact"],
    allergies: ["NSAIDs"],
    conditions: ["Pain", "Inflammation"],
    contraindications: ["Ulcers", "Pregnancy (3rd trimester)"],
    image: "Images/Medicines Images/Ibuprofen tablet.jpg"
  },
  {
    id: "m40",
    name: "Pantoprazole",
    type: "allopathic",
    description: "Proton pump inhibitor used for stress-induced acidity, headaches, and digestive fatigue.",
    dosage: "40 mg once daily before breakfast",
    sideEffects: ["Flatulence", "Nausea"],
    allergies: ["PPIs"],
    conditions: ["GERD", "Acidity", "Stress-related indigestion"],
    contraindications: ["Liver impairment"],
    image: "Images/Medicines Images/pantoprazole.jpg"
  },
];

// Check if two arrays have any elements in common
function hasCommonElement(array1, array2) {
    return array1.some(item => array2.includes(item));
}

// Filter medicines based on symptoms and type
function filterMedicines(selectedSymptoms, type = null) {
    return medicines.filter(medicine => {
        const matchesSymptoms = hasCommonElement(medicine.conditions, selectedSymptoms);
        const matchesType = type ? medicine.type === type : true;
        return matchesSymptoms && matchesType;
    });
}

// Get medicines with potential allergies based on user input
function getMedicinesWithAllergies(selectedSymptoms, userAllergies = []) {
    const filteredMedicines = filterMedicines(selectedSymptoms);
    
    return filteredMedicines.map(medicine => {
        const hasAllergies = userAllergies.length > 0 && 
                            hasCommonElement(medicine.allergies, userAllergies);
        
        return {
            ...medicine,
            hasAllergyWarning: hasAllergies
        };
    });
}

// Search for symptoms matching a query string
function searchSymptoms(query) {
    const lowerQuery = query.toLowerCase();
    return symptoms.filter(symptom => 
        symptom.toLowerCase().includes(lowerQuery)
    );
}

// Get medicine by ID
function getMedicineById(id) {
    return medicines.find(medicine => medicine.id === id);
}

// Get related medicines (medicines that treat similar conditions)
function getRelatedMedicines(medicineId) {
    const medicine = getMedicineById(medicineId);
    if (!medicine) return [];
    
    return medicines.filter(med => 
        med.id !== medicineId && 
        hasCommonElement(med.conditions, medicine.conditions)
    ).slice(0, 3); // Return up to 3 related medicines
}

// Local storage functions for search history
function saveSearchHistory(symptomsList) {
    let history = getSearchHistory();
    
    // Create a unique ID for this search
    const searchId = 'search_' + Date.now();
    
    const newSearch = {
        id: searchId,
        symptoms: symptomsList,
        timestamp: new Date().toISOString()
    };
    
    // Add to beginning of array (most recent first)
    history.unshift(newSearch);
    
    // Keep only the 10 most recent searches
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    localStorage.setItem('medicineSearchHistory', JSON.stringify(history));
    return searchId;
}

function getSearchHistory() {
    const history = localStorage.getItem('medicineSearchHistory');
    return history ? JSON.parse(history) : [];
}

function clearSearchHistory() {
    localStorage.removeItem('medicineSearchHistory');
}

function removeSearchFromHistory(searchId) {
    let history = getSearchHistory();
    history = history.filter(item => item.id !== searchId);
    localStorage.setItem('medicineSearchHistory', JSON.stringify(history));
}