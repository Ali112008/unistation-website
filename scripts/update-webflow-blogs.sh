#!/bin/bash
TOKEN="91068beafa44f0f4442c67a2c75b94f472be033015abdd7a82fa6bdec225d1b2"
COLLECTION="6a51d3b689432b9105b65065"
BASE="https://api.webflow.com/v2/collections/$COLLECTION/items"

echo "Updating Post 1..."
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "$BASE/6a51d5e05e9255c011cc3749" \
  -d '{"fieldData":{"name":"Why Georgia is the Top Destination for Medical Students in 2025","slug":"why-georgia-top-medical-destination-2025","title":"Why Georgia is the Top Destination for Medical Students in 2025","excerpt":"Discover why thousands of international students are choosing Georgia for their medical education \u2014 from affordable tuition to globally recognized degrees and English-taught programs.","author":"UniStation Team","featured":true}}' | python3 -c "import sys,json;d=json.load(sys.stdin);print('  OK:',d.get('fieldData',{}).get('title','ERR'))" 2>/dev/null

echo "Updating Post 2..."
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "$BASE/6a51d5e05e9255c011cc3746" \
  -d '{"fieldData":{"name":"Complete Guide to Studying Medicine in Tbilisi","slug":"complete-guide-studying-medicine-tbilisi","title":"Complete Guide to Studying Medicine in Tbilisi","excerpt":"Everything you need to know about pursuing your medical degree in Tbilisi \u2014 from university selection and admission requirements to student life and career prospects.","author":"UniStation Team","featured":false}}' | python3 -c "import sys,json;d=json.load(sys.stdin);print('  OK:',d.get('fieldData',{}).get('title','ERR'))" 2>/dev/null

echo "Updating Post 3..."
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "$BASE/6a51d5e05e9255c011cc3743" \
  -d '{"fieldData":{"name":"Cost of Living in Georgia: A Student Budget Breakdown","slug":"cost-of-living-georgia-student-budget","title":"Cost of Living in Georgia: A Student Budget Breakdown","excerpt":"A detailed breakdown of monthly expenses for international students in Georgia \u2014 including accommodation, food, transport, and entertainment.","author":"UniStation Team","featured":true}}' | python3 -c "import sys,json;d=json.load(sys.stdin);print('  OK:',d.get('fieldData',{}).get('title','ERR'))" 2>/dev/null

echo "Updating Post 4..."
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "$BASE/6a51d5e05e9255c011cc3740" \
  -d '{"fieldData":{"name":"English-Taught Medical Programs in Eastern Europe","slug":"english-taught-medical-programs-eastern-europe","title":"English-Taught Medical Programs in Eastern Europe","excerpt":"Comparing English-taught medical programs across Georgia, Poland, Romania, and other Eastern European countries \u2014 find the best fit for your medical career.","author":"UniStation Team","featured":false}}' | python3 -c "import sys,json;d=json.load(sys.stdin);print('  OK:',d.get('fieldData',{}).get('title','ERR'))" 2>/dev/null

echo "Updating Post 5..."
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "$BASE/6a51d5e05e9255c011cc373d" \
  -d '{"fieldData":{"name":"How to Get Your Medical Degree Recognized Internationally","slug":"medical-degree-recognition-international-guide","title":"How to Get Your Medical Degree Recognized Internationally","excerpt":"A step-by-step guide to licensing and recognizing your Georgian medical degree in the UAE, UK, USA, and other countries.","author":"UniStation Team","featured":true}}' | python3 -c "import sys,json;d=json.load(sys.stdin);print('  OK:',d.get('fieldData',{}).get('title','ERR'))" 2>/dev/null

echo ""
echo "All 5 posts updated!"