import csv
import requests
from bs4 import BeautifulSoup

# Read the csv file with links
with open('links.csv', 'r') as file:
    reader = csv.reader(file)
    links = [row[0] for row in reader]

# Fetch the HTML content of each link and extract the title
titles = []
for link in links:
    response = requests.get(link)
    if response.status_code == 200:
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        title = soup.find('title').text
        titles.append(title)
    else:
        print(f"Failed to fetch content for link: {link}")

# Write the links and titles to a new csv file
with open('links_with_titles.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    for link, title in zip(links, titles):
        writer.writerow([link, title])
