from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.ui import Select
import os
import pandas as pd
from typing import Union
import time

def create_driver(headless, url) -> webdriver.Chrome:
    from selenium.webdriver.chrome.options import Options
    chromeOptions = Options()
    chromeOptions.add_argument("--start-maximized")
    chromeOptions.add_argument("--log-level=3")
    if headless:
        chromeOptions.add_argument('headless')
    driver = webdriver.Chrome(options=chromeOptions)
    driver.get(url)
    return driver

sql = ""
def create_sql(department,fk):
    global sql
    driver = create_driver(False,"https://www.google.com/")
    time.sleep(2)
    input = driver.find_element(By.CLASS_NAME,"gLFyf")
    input.send_keys(f"{department} municipios")
    form = driver.find_element(By.TAG_NAME,"form")
    form.submit()

    time.sleep(2)

    href = driver.find_element(By.ID,"center_col").find_element(By.TAG_NAME,"a")
    href.click()

    time.sleep(2)
    table = driver.find_elements(By.TAG_NAME,"table")[2]
    items = table.find_elements(By.TAG_NAME,"li")

    for item in items:
        sql += f"('{item.text}', {fk})\n"
   

departamentos_guatemala = [
    "Alta Verapaz",
    "Baja Verapaz",
    "Chimaltenango",
    "Chiquimula",
    "El Progreso",
    "Escuintla",
    "Guatemala",
    "Huehuetenango",
    "Izabal",
    "Jalapa",
    "Jutiapa",
    "Petén",
    "Quetzaltenango",
    "Quiché",
    "Retalhuleu",
    "Sacatepéquez",
    "San Marcos",
    "Santa Rosa",
    "Sololá",
    "Suchitepéquez",
    "Totonicapán",
    "Zacapa"
]

index = 1
for i in departamentos_guatemala:
    try:
        time.sleep(2)
        create_sql(i,index)
    except:
        print("ERROR->",i)
    index += 1

print(sql)