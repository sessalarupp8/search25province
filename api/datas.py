import json
import os
import sys
import traceback

# --- Define the JSON filenames based on your ACTUAL file structure ---
# NOTE: Ensure these JSON files are in the SAME directory as this datas.py file.
JSON_FILES = {
    "provinces": "Khet_data.json", 
    "districts": "Srok_data.json",
    "communes": "Khum_data.json",
    "villages": "Phum_data.json",
}

def load_json_data(file_name):
    """
    Loads and returns data from a specified JSON file with detailed error reporting.
    This function handles File Not Found and JSON Syntax Errors gracefully.
    """
    # Construct the absolute path to the JSON file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, file_name)
    
    print(f"Attempting to load data from: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if isinstance(data, list) and len(data) > 0:
            print(f"Successfully loaded {len(data)} items from {file_name}")
            return data
        elif isinstance(data, list) and len(data) == 0:
            print(f"WARNING: File {file_name} loaded successfully but is EMPTY (0 items).")
            return []
        else:
            print(f"WARNING: File {file_name} loaded, but the root element is NOT a list (it's {type(data)}). Returning empty list.")
            return []

    except FileNotFoundError:
        print(f"\n\n--- FATAL FILE ERROR for {file_name} ---")
        print(f"Error: The file was NOT FOUND at {file_path}")
        print("Action: Ensure the file name is EXACTLY correct and it is in the same directory.")
        print("-------------------------------------------\n")
        return []
    except json.JSONDecodeError as e:
        print(f"\n\n--- FATAL JSON SYNTAX ERROR in {file_name} ---")
        print(f"Error: Invalid JSON format found.")
        print(f"Details: {e}")
        # Print the full traceback to help the user find the line number
        traceback.print_exc(file=sys.stdout)
        print("Action: Open the file and fix the JSON syntax (e.g., missing comma, wrong quotes).")
        print("-------------------------------------------\n")
        return []
    
# --- Load Data from JSON Files ---

PROVINCES_DATA = load_json_data(JSON_FILES["provinces"])
DISTRICTS_DATA = load_json_data(JSON_FILES["districts"]) 
COMMUNES_DATA = load_json_data(JSON_FILES["communes"])
VILLAGES_DATA = load_json_data(JSON_FILES["villages"])

# --- Combine Data ---

CAMBODIA_GEOGRAPHY_DATA = {
    "provinces": PROVINCES_DATA,
    "districts": DISTRICTS_DATA,
    "communes": COMMUNES_DATA,
    "villages": VILLAGES_DATA,
}

# Add a check to confirm data loaded successfully (for debugging)
if not any(CAMBODIA_GEOGRAPHY_DATA.get(key) for key in ["provinces", "districts", "communes", "villages"]):
    print("\n--- CRITICAL WARNING: API is running but is serving EMPTY DATA. ---")
    print("Review the FATAL FILE ERROR messages above to fix the underlying JSON issue.")
else:
    print("\n--- Data loading complete. API is ready to serve data. ---")