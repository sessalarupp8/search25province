from flask import Flask, jsonify, request
from flask_cors import CORS
from api import datas
import sys
import json
import traceback
import os
from typing import List, Dict, Any

# --- CRITICAL FIX: Change import to treat datas.py as a file/script in the same directory ---
try:
    # Append the current directory to sys.path to ensure local files are found
    # We expect datas.py to contain a dictionary CAMBODIA_GEOGRAPHY_DATA
    if os.path.dirname(__file__) not in sys.path:
        sys.path.append(os.path.dirname(__file__))
        
    CAMBODIA_GEOGRAPHY_DATA = datas.CAMBODIA_GEOGRAPHY_DATA
    
except Exception as e:
    # This catches errors if datas.py has an internal crash (e.g. JSONDecodeError)
    print(f"FATAL ERROR during data loading from datas.py: {e}")
    print("ACTION: Ensure datas.py is in the same folder and its data is valid.")
    # Fallback to empty data 
    CAMBODIA_GEOGRAPHY_DATA = {"provinces": [], "districts": [], "communes": [], "villages": []}


# Initialize the Flask application
app = Flask(__name__)

# CONFIGURE CORS: Allow requests specifically from the client running on http://127.0.0.1:5500
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5500"}})

# --- HELPER FUNCTION FOR HIERARCHICAL FILTERING ---
def apply_hierarchical_filter(
    data_list: List[Dict[str, Any]], 
    parent_id: str, 
    level_name: str
) -> List[Dict[str, Any]]:
    """
    Filters a list of geographical items based on the parent's hierarchical ID.
    The rule is: Child ID must start with Parent ID AND be exactly 2 digits longer.
    """
    if not parent_id or not parent_id.isdigit():
        return []
        
    parent_len = len(parent_id)
    expected_child_len = parent_len + 2

    filtered_data = [
        item for item in data_list 
        if str(item.get('id', '')).startswith(parent_id) and len(str(item.get('id'))) == expected_child_len
    ]
    
    return filtered_data


# --- API Endpoints ---

@app.route('/', methods=['GET'])
def home():
    """Simple status check."""
    # Check if the data loaded successfully (by checking the provinces list size)
    data_loaded = len(CAMBODIA_GEOGRAPHY_DATA.get('provinces', [])) > 0

    return jsonify({
        "status": "success", 
        "message": "Cambodia Geography API is running!",
        "data_load_status": "Success" if data_loaded else "Failed or Empty (Check datas.py)",
        "endpoints": [
            "/api/provinces",
            "/api/districts?province_id=<id>",
            "/api/communes?district_id=<id>",
            "/api/villages?commune_id=<id>",
            "/api/lookup?code=<id>"
        ]
    })


@app.route('/api/provinces', methods=['GET'])
def get_provinces():
    """
    Returns the list of all provinces, renaming 'khmer_name' to 'name' and hiding 'english_name'.
    """
    provinces = CAMBODIA_GEOGRAPHY_DATA.get('provinces', [])
    
    # We rename 'khmer_name' back to 'name' for frontend compatibility and exclude 'english_name'
    renamed_provinces = [
        {
            "id": p.get("id"), 
            "name": p.get("khmer_name"), 
            "class": p.get("class")
        }
        for p in provinces
    ]

    return jsonify({
        "status": "success",
        "total_provinces": len(renamed_provinces),
        "data": renamed_provinces
    })

@app.route('/api/districts', methods=['GET'])
def get_districts():
    """
    Returns districts filtered by 'province_id'. 
    Uses string prefix matching: District IDs start with the Province ID.
    Includes fallback for missing leading zero (e.g., request '1', data uses '01') and hides 'english_name'.
    """
    province_id_str = request.args.get('province_id')
    districts = CAMBODIA_GEOGRAPHY_DATA.get('districts', [])
    
    if province_id_str:
        if not isinstance(province_id_str, str) or not province_id_str.isdigit():
            return jsonify({"status": "error", "message": "Invalid province_id format. Must be a digit string."}), 400

        # 1. Primary filter attempt (input ID matches data ID)
        final_districts = apply_hierarchical_filter(districts, province_id_str, "districts")

        # 2. Secondary filter attempt (Fallback for missing leading zero: e.g., input '1', data is '01')
        if not final_districts and len(province_id_str) == 1:
            padded_id = '0' + province_id_str
            final_districts = apply_hierarchical_filter(districts, padded_id, "districts")

        if not final_districts:
            return jsonify({"status": "error", "message": f"No districts found for province_id: {province_id_str}"}), 404
            
        # Strip 'english_name' and rename 'khmer_name' to 'name' before returning
        cleaned_districts = [
            {"id": d.get("id"), "name": d.get("khmer_name"), "class": d.get("class")}
            for d in final_districts
        ]

        return jsonify({"status": "success", "data": cleaned_districts})
    
    return jsonify({"status": "success", "total_districts": len(districts), "data": districts})

@app.route('/api/communes', methods=['GET'])
def get_communes():
    """
    Returns communes filtered by 'district_id'. 
    Uses string prefix matching. Includes fallback for missing leading zero and hides 'english_name'.
    """
    district_id_str = request.args.get('district_id')
    communes = CAMBODIA_GEOGRAPHY_DATA.get('communes', [])
    
    if district_id_str:
        if not isinstance(district_id_str, str) or not district_id_str.isdigit():
            return jsonify({"status": "error", "message": "Invalid district_id format. Must be a digit string."}), 400

        # 1. Primary filter attempt
        final_communes = apply_hierarchical_filter(communes, district_id_str, "communes")

        # 2. Secondary filter attempt (Fallback for missing leading zero if district ID is short)
        if not final_communes and len(district_id_str) == 3: # e.g., '101' might be padded to '0101' in data
            # NOTE: We only pad if the ID is 3 digits long, assuming province 1-9 district IDs are 4 digits.
            padded_id = '0' + district_id_str
            final_communes = apply_hierarchical_filter(communes, padded_id, "communes")
        
        if not final_communes:
            return jsonify({"status": "error", "message": f"No communes found for district_id: {district_id_str}"}), 404
            
        # Strip 'english_name' and rename 'khmer_name' to 'name' before returning
        cleaned_communes = [
            {"id": c.get("id"), "name": c.get("khmer_name"), "class": c.get("class")}
            for c in final_communes
        ]

        return jsonify({"status": "success", "data": cleaned_communes})

    return jsonify({"status": "success", "total_communes": len(communes), "data": communes})

@app.route('/api/villages', methods=['GET'])
def get_villages():
    """
    Returns villages filtered by 'commune_id'. 
    Uses string prefix matching. Hides 'english_name'.
    """
    commune_id_str = request.args.get('commune_id')
    villages = CAMBODIA_GEOGRAPHY_DATA.get('villages', [])
    
    if commune_id_str:
        if not isinstance(commune_id_str, str) or not commune_id_str.isdigit():
            return jsonify({"status": "error", "message": "Invalid commune_id format. Must be a digit string."}), 400

        # 1. Primary filter attempt
        final_villages = apply_hierarchical_filter(villages, commune_id_str, "villages")

        # 2. Secondary filter attempt (Fallback for missing leading zero if commune ID is short)
        if not final_villages and len(commune_id_str) == 5: # e.g., '10101' might be padded to '010101' in data
            padded_id = '0' + commune_id_str
            final_villages = apply_hierarchical_filter(villages, padded_id, "villages")
        
        if not final_villages:
            return jsonify({"status": "error", "message": f"No villages found for commune_id: {commune_id_str}"}), 404
            
        # Strip 'english_name' and rename 'khmer_name' to 'name' before returning
        cleaned_villages = [
            {"id": v.get("id"), "name": v.get("khmer_name"), "class": v.get("class")}
            for v in final_villages
        ]

        return jsonify({"status": "success", "data": cleaned_villages})
    
    return jsonify({"status": "success", "total_villages": len(villages), "data": villages})

@app.route('/api/lookup', methods=['GET'])
def lookup_code():
    """
    Identifies the code level and returns the full address hierarchy,
    using the hierarchical nature of the ID string (Child ID length = Parent ID length + 2).
    """
    code_str = request.args.get('code')
    
    # Input validation
    if not code_str or not code_str.isdigit() or len(code_str) > 8: 
        return jsonify({"status": "error", "message": "Invalid code format. Must be 1 to 8 digits."}), 400
        
    address_parts = {}
    match_level = None
    
    # Initialize IDs for the response payload
    village_id, commune_id, district_id, province_id = None, None, None, None
    
    provinces = CAMBODIA_GEOGRAPHY_DATA.get('provinces', [])
    districts = CAMBODIA_GEOGRAPHY_DATA.get('districts', [])
    communes = CAMBODIA_GEOGRAPHY_DATA.get('communes', [])
    villages = CAMBODIA_GEOGRAPHY_DATA.get('villages', [])
    
    
    # --- 1. Find the Exact Match based on Code String ---
    
    match_info = next((v for v in villages if str(v.get('id')) == code_str), None)
    if match_info:
        match_level = "village"
        village_id = code_str
        address_parts['village'] = match_info.get('khmer_name')

    if match_info is None:
        match_info = next((c for c in communes if str(c.get('id')) == code_str), None)
        if match_info:
            match_level = "commune"
            commune_id = code_str
            address_parts['commune'] = match_info.get('khmer_name')
            
    if match_info is None:
        match_info = next((d for d in districts if str(d.get('id')) == code_str), None)
        if match_info:
            match_level = "district"
            district_id = code_str
            address_parts['district'] = match_info.get('khmer_name')
            
    if match_info is None:
        match_info = next((p for p in provinces if str(p.get('id')) == code_str), None)
        if match_info:
            match_level = "province"
            province_id = code_str
            address_parts['province'] = match_info.get('khmer_name')

    if match_info is None:
        return jsonify({"status": "error", "message": f"Code {code_str} not found at any level."}), 404

    # --- 2. Walk Up the Hierarchy using String Slicing (removing last 2 digits) ---

    # 2.1 Derive Commune ID
    if match_level == "village":
        commune_id = code_str[:len(code_str) - 2]
        
    # 2.2 Derive District ID
    if match_level in ["village", "commune"] and commune_id:
        district_id = commune_id[:len(commune_id) - 2] 
    elif match_level == "district":
        district_id = code_str

    # 2.3 Derive Province ID (Handle 1 digit vs 2 digit padding here)
    if match_level in ["village", "commune", "district"] and district_id:
        province_id_base = district_id[:len(district_id) - 2]
        
        # Check for both 1-digit ID and 2-digit padded ID
        province_info = next((p for p in provinces if str(p.get('id')) == province_id_base), None)
        if not province_info and len(province_id_base) == 1:
            province_id = '0' + province_id_base
            province_info = next((p for p in provinces if str(p.get('id')) == province_id), None)
        else:
            province_id = province_id_base

    elif match_level == "province":
        province_id = code_str

    # --- 3. Gather full address parts using derived IDs ---
    
    # Gather Commune Name
    if commune_id and 'commune' not in address_parts:
        commune_info = next((c for c in communes if str(c.get('id')) == commune_id), None)
        if commune_info:
             address_parts['commune'] = commune_info.get('khmer_name')

    # Gather District Name
    if district_id and 'district' not in address_parts:
        district_info = next((d for d in districts if str(d.get('id')) == district_id), None)
        if district_info:
             address_parts['district'] = district_info.get('khmer_name')

    # Gather Province Name
    if province_id and 'province' not in address_parts:
        province_info = next((p for p in provinces if str(p.get('id')) == province_id), None)
        if province_info:
             address_parts['province'] = province_info.get('khmer_name')


    # --- 4. Construct the Final Response ---
        
    # Construct the full address string (Khmer)
    parts = []
    # Append parts in order from smallest to largest scope
    if 'village' in address_parts: parts.append(address_parts['village'])
    if 'commune' in address_parts: parts.append(address_parts['commune'])
    if 'district' in address_parts: parts.append(address_parts['district'])
    if 'province' in address_parts: parts.append(address_parts['province'])
        
    full_address_khmer = ", ".join([p for p in parts if p is not None])

    # Ensure final IDs are returned as strings (as they are in the data)
    return jsonify({
        "status": "success",
        "code": code_str, # Return the original string code
        "address": full_address_khmer,
        "village_id": village_id,
        "commune_id": commune_id,
        "district_id": district_id,
        "province_id": province_id,
        "match_level": match_level
    })

# --- GLOBAL ERROR HANDLER for 500 errors ---
@app.errorhandler(500)
def internal_error(error):
    # Log the full traceback to the console for debugging
    app.logger.error('Server Error: %s', (error))
    print("\n--- SERVER CRASH: Full Python Traceback Below ---")
    traceback.print_exc()
    print("--------------------------------------------------\n")
    
    # Return a generic, safe JSON response for the frontend
    return jsonify({
        "status": "error",
        "message": "Internal Server Error. Check the Python console for details (Data Load Failure)."
    }), 500


# Run the application
if __name__ == '__main__':
    print("Running Cambodia Geography API (Flask) on http://127.0.0.1:5000")
    print("--- Client Origin Allowed: http://127.0.0.1:5500 ---")
    app.run(debug=True, port=5000, host='127.0.0.1')