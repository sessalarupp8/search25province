import { toStr, isNumericString, padLeft, deriveParentsFromId } from './ui_utils.js';

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

    return {
        provinces: khetData.map(item => ({
            id: isNumericString(toStr(item.id)) ? padLeft(item.id, 2) : toStr(item.id),
            khmer_name: item.khmer_name,
            name: item.english_name || `Province ${item.id}`,
            class: item.class || "" // Added
        })),
        districts: srokData.map(item => ({
            id: toStr(item.id),
            khmer_name: item.khmer_name,
            name: item.english_name || `District ${item.id}`,
            provinceId: deriveParentsFromId(item.id).provinceId,
            class: item.class || "" // Added
        })),
        communes: khumData.map(item => ({
            id: toStr(item.id),
            khmer_name: item.khmer_name,
            name: item.english_name || `Commune ${item.id}`,
            districtId: deriveParentsFromId(item.id).districtId,
            class: item.class || "" // Added
        })),
        villages: phumData.map(item => ({
            id: toStr(item.id),
            khmer_name: item.khmer_name,
            name: item.english_name || `Village ${item.id}`,
            communeId: deriveParentsFromId(item.id).communeId,
            class: item.class || "" // Added
        }))
    };
}