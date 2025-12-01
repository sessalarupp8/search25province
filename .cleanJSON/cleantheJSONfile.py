import json
import os

# Define file paths for input and output using RAW STRINGS (r"...")
# This fixes the SyntaxError: (unicode error) on Windows by preventing Python 
# from interpreting '\U' (in \Users) or other backslash combinations as escape characters.
INPUT_FILE = r"C:\Users\Chhay\Documents\Coding\search25province\search25province\cleanJSON\cPhum.json"
OUTPUT_FILE = r"C:\Users\Chhay\Documents\Coding\search25province\search25province\cleanJSON\Phum_data.json"

def rename_json_keys(data, key_map):
    """
    Renames keys in a list of dictionaries based on a provided mapping.

    Args:
        data (list): A list of dictionaries (the JSON array).
        key_map (dict): A dictionary mapping old keys to new keys.

    Returns:
        list: A new list of dictionaries with the renamed keys.
    """
    transformed_data = []
    for item in data:
        new_item = {}
        for old_key, new_key in key_map.items():
            # Check if the old key exists in the item before trying to access it
            if old_key in item:
                new_item[new_key] = item[old_key]
            # No 'else' block needed, as we only care about the keys we map
        transformed_data.append(new_item)
    return transformed_data

def process_file_transformation():
    """
    Main function to read data from a file, transform it, and write it back.
    """
    # --- 1. Define the Key Mapping ---
    key_mapping = {
        "CODE_text": "id",
        "Class": "class",
        "Name_UNC": "khmer_name",
        "Name": "english_name"
    }

    # --- 2. Read Data from Input File ---
    if not os.path.exists(INPUT_FILE):
        print(f"Error: Input file '{INPUT_FILE}' not found.")
        print("Please ensure the file path is correct and the file exists.")
        # Removed the sample data creation logic since you are using specific, absolute paths
        return

    try:
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            print(f"Reading data from {INPUT_FILE}...")
            # Load the entire list of JSON objects
            input_data = json.load(f)
            # Ensure the loaded data is a list (a common format for JSON arrays of records)
            if not isinstance(input_data, list):
                print("Warning: The loaded JSON is not a list/array. The transformation will attempt to proceed, but results may vary.")
                # Wrap it in a list if it's a single object, to avoid errors in the loop
                input_data = [input_data]

            print(f"Successfully loaded {len(input_data)} entries.")

    except json.JSONDecodeError as e:
        print(f"Error: Failed to decode JSON from '{INPUT_FILE}'.")
        print(f"Check your file format (e.g., ensure it starts and ends with square brackets [ ] and uses valid JSON syntax). Details: {e}")
        return
    except Exception as e:
        print(f"An unexpected error occurred during file reading: {e}")
        return


    # --- 3. Run the Transformation ---
    print("Starting key transformation...")
    transformed_data = rename_json_keys(input_data, key_mapping)
    print("Transformation complete.")


    # --- 4. Write Results to Output File ---
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            print(f"Writing transformed data to {OUTPUT_FILE}...")
            # Use json.dump to save the data
            json.dump(transformed_data, f, indent=2, ensure_ascii=False)
        
        print(f"\nSUCCESS: All {len(transformed_data)} entries have been saved to '{OUTPUT_FILE}'.")
        print(f"The resulting file is: {OUTPUT_FILE}")
        
        # Print a sample of the transformed data to the console
        sample_size = min(4, len(transformed_data))
        if sample_size > 0:
            print(f"\n--- Sample of the first {sample_size} transformed entries ---")
            print(json.dumps(transformed_data[:sample_size], indent=2, ensure_ascii=False))

    except Exception as e:
        print(f"Error: Failed to write data to '{OUTPUT_FILE}': {e}")


# Execute the main function
if __name__ == "__main__":
    process_file_transformation()