import json
import requests
import time

# --- CONFIGURATION ---
# Replace these with your actual Shopify store credentials
SHOP_NAME = 'your-store-name'
API_PASSWORD = 'shpat_your_admin_api_access_token'
API_VERSION = '2023-07'

BASE_URL = f"https://{SHOP_NAME}.myshopify.com/admin/api/{API_VERSION}/products.json"

def push_to_shopify(product_data):
    headers = {
        "X-Shopify-Access-Token": API_PASSWORD,
        "Content-Type": "application/json"
    }
    
    payload = {
        "product": product_data
    }
    
    try:
        response = requests.post(BASE_URL, headers=headers, json=payload)
        if response.status_code == 201:
            print(f"Successfully created: {product_data['title']}")
            return True
        else:
            print(f"Failed to create {product_data['title']}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"Error pushing {product_data['title']}: {e}")
        return False

def main():
    # Load the structured data
    try:
        with open('shopify_products.json', 'r', encoding='utf-8') as f:
            products = json.load(f)
    except FileNotFoundError:
        print("Error: shopify_products.json not found.")
        return

    print(f"Starting push for {len(products)} products...")
    
    success_count = 0
    for product in products:
        # Note: Metafields usually need a separate API call or specific structure
        # For simplicity in this script, we'll focus on the main product data.
        # Shopify allows creating metafields during product creation in some API versions.
        
        if push_to_shopify(product):
            success_count += 1
        
        # Respect Shopify API rate limits (2 requests per second for standard)
        time.sleep(0.5)

    print(f"Finished! Successfully pushed {success_count} out of {len(products)} products.")

if __name__ == "__main__":
    print("--- SHOPIFY PUSH SCRIPT ---")
    print("Please ensure you have updated SHOP_NAME and API_PASSWORD in the script.")
    # main() # Uncomment to run when ready
