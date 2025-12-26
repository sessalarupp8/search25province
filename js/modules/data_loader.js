import { toStr, isNumericString, padLeft, deriveParentsFromId } from './ui_utils.js';

/**
 * Maps Khmer administrative classes to English terminology
 */
const getClassEn = (khClass) => {
    const map = {
        "រាជធានី": "Capital City",
        "ខេត្ត": "Province",
        "ក្រុង": "Municipality",
        "ស្រុក": "District",
        "ខណ្ឌ": "Khan",
        "ឃុំ": "Commune",
        "សង្កាត់": "Sangkat",
        "ភូមិ": "Village"
    };
    return map[khClass] || "";
};

export async function loadGeographicalData() {
    const [khetRes, srokRes, khumRes, phumRes] = await Promise.all([
        fetch("data/khet_data.json"),
        fetch("data/srok_data.json"),
        fetch("data/khum_data.json"),
        fetch("data/phum_data.json"),
    ]);

    const khetData = await khetRes.json();
    const srokData = await srokRes.json();
    const khumData = await khumRes.json();
    const phumData = await phumRes.json();

    const transform = (item, type, parentKey) => ({
        id: toStr(item.id),
        khmer_name: item.khmer_name,
        name: item.english_name || `${type} ${item.id}`,
        classKh: item.class || "",      
        classEn: getClassEn(item.class), 
        ...(parentKey ? { [parentKey]: deriveParentsFromId(item.id)[parentKey] } : {})
    });

    return {
        provinces: khetData.map(item => transform(item, "Province")),
        districts: srokData.map(item => transform(item, "District", "provinceId")),
        communes: khumData.map(item => transform(item, "Commune", "districtId")),
        villages: phumData.map(item => transform(item, "Village", "communeId"))
    };
}