import requests
from bs4 import BeautifulSoup
import time

base_url = 'https://www.tapology.com'
fightcenter_url = f'{base_url}/fightcenter?group=major&schedule=upcoming&sport=mma'
headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(fightcenter_url, headers=headers)
soup = BeautifulSoup(response.content, 'html.parser')

if response.status_code == 200:
    print("Successfully fetched the page!")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
    

event_links = soup.select('div.promotion a[href^="/fightcenter/events/"]')

for link in event_links:
    event_name = link.get_text(strip=True)
    event_href = link['href']
    full_url = base_url + event_href
    print(f'Event Name: {event_name}')
    print(f'Event URL: {full_url}')
    print('-' * 40)

    # Be respectful of the server
    time.sleep(1)
