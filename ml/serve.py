import os

import numpy as np
import pandas as pd
import pymysql.cursors
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sklearn.neighbors import KNeighborsClassifier

sql = (
    "SELECT UserId, H_k1, DD_k1_k2, DU_k1_k2, H_k2, DD_k2_k3, DU_k2_k3, H_k3,"
    " DD_k3_k4, DU_k3_k4, H_k4, DD_k4_k5, DU_k4_k5, H_k5, DD_k5_k6, DU_k5_k6,"
    " H_k6, DD_k6_k7, DU_k6_k7, H_k7, DD_k7_k8, DU_k7_k8, H_k8, DD_k8_k9,"
    " DU_k8_k9, H_k9, DD_k9_k10, DU_k9_k10, H_k10 FROM `PromptData` WHERE"
    " PromptId IS NOT NULL"
)

sql2 = (
    "SELECT UserId, H_k1, DD_k1_k2, DU_k1_k2, H_k2, DD_k2_k3, DU_k2_k3, H_k3,"
    " DD_k3_k4, DU_k3_k4, H_k4, DD_k4_k5, DU_k4_k5, H_k5, DD_k5_k6, DU_k5_k6,"
    " H_k6, DD_k6_k7, DU_k6_k7, H_k7, DD_k7_k8, DU_k7_k8, H_k8, DD_k8_k9,"
    " DU_k8_k9, H_k9, DD_k9_k10, DU_k9_k10, H_k10 FROM `PromptData` WHERE"
    " PromptId IS NOT NULL"
)

model = KNeighborsClassifier(n_neighbors=9, p=1)

app = FastAPI()

# disable cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def flattenListOfObjects(listOfDict):
    if len(listOfDict) == 0:
        return {}
    newDict = {key: [] for key in listOfDict[0].keys()}
    for obj in listOfDict:
        for k in obj.keys():
            newDict[k].append(obj[k])
    return newDict


@app.post("/fixed/{testedUserId}")
async def test(testedUserId: int, request: Request):
    connection = pymysql.connect(
        host=os.environ["HOST"],
        user=os.environ["LOGIN"],
        password=os.environ["PASSWORD"],
        database=os.environ["DB"],
        cursorclass=pymysql.cursors.DictCursor,
    )

    with connection.cursor() as cursor:
        cursor.execute(sql)
        testedUserPrompts = cursor.fetchall()

        userPrompts = pd.DataFrame(flattenListOfObjects(testedUserPrompts))

        testedPrompt = pd.Series(await request.json())
        del testedPrompt["prompt"]

        x, y = (
            userPrompts.drop("UserId", axis=1).to_numpy(),
            userPrompts["UserId"].to_numpy(),
        )

        model.fit(x, y)
        y_pred = model.predict(np.array([testedPrompt.to_numpy()]))
        if y_pred[0] == np.int64(testedUserId):
            return True
        return False


@app.post("/flex/{testedUserId}")
async def test2(testedUserId: int, request: Request):
    connection = pymysql.connect(
        host=os.environ["HOST"],
        user=os.environ["LOGIN"],
        password=os.environ["PASSWORD"],
        database=os.environ["DB"],
        cursorclass=pymysql.cursors.DictCursor,
    )

    with connection.cursor() as cursor:
        cursor.execute(sql2)
        testedUserPrompts = cursor.fetchall()

        userPrompts = pd.DataFrame(flattenListOfObjects(testedUserPrompts))

        testedPrompt = pd.Series(await request.json())
        del testedPrompt["prompt"]

        x, y = (
            userPrompts.drop("UserId", axis=1).to_numpy(),
            userPrompts["UserId"].to_numpy(),
        )

        model.fit(x, y)
        y_pred = model.predict(np.array([testedPrompt.to_numpy()]))
        if y_pred[0] == np.int64(testedUserId):
            return True
        return False


@app.get("/")
async def root():
    connection = pymysql.connect(
        host=os.environ["HOST"],
        user=os.environ["LOGIN"],
        password=os.environ["PASSWORD"],
        database=os.environ["DB"],
        cursorclass=pymysql.cursors.DictCursor,
    )
    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT * FROM `PromptData`"
        cursor.execute(sql)
        result = cursor.fetchall()
        return result


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
