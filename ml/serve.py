import os
from typing import Any, Literal

import numpy as np
import pandas as pd
import pymysql.cursors
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sklearn.neighbors import KNeighborsClassifier

from utils import flattenListOfObjects

sql = (
    "SELECT UserId, H_k1, DD_k1_k2, DU_k1_k2, H_k2, DD_k2_k3, DU_k2_k3, H_k3,"
    " DD_k3_k4, DU_k3_k4, H_k4, DD_k4_k5, DU_k4_k5, H_k5, DD_k5_k6, DU_k5_k6,"
    " H_k6, DD_k6_k7, DU_k6_k7, H_k7, DD_k7_k8, DU_k7_k8, H_k8, DD_k8_k9,"
    " DU_k8_k9, H_k9, DD_k9_k10, DU_k9_k10, H_k10, (u.FixedPromptId ="
    " PromptData.PromptId)=1 AND PromptId IS NOT NULL AS IsFixed FROM"
    " `PromptData` JOIN `Users` AS u ON UserId=u.Id"
)

app = FastAPI()

# disable cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

promptTypes = ("fixed", "flex")
model = KNeighborsClassifier(n_neighbors=9, p=1)


async def hasAuthenticated(
    promptType: Literal["fixed", "flex"], testedUserId: int, request: Request
) -> bool:
    connection = pymysql.connect(
        host=os.environ["HOST"],
        user=os.environ["LOGIN"],
        password=os.environ["PASSWORD"],
        database=os.environ["DB"],
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
    )

    promptTypeId = promptTypes.index(promptType)
    with connection.cursor() as cursor:
        cursor.execute(sql)
        testedUserPrompts = cursor.fetchall()

        userPrompts = pd.DataFrame(flattenListOfObjects(testedUserPrompts))
        
        requestBody = await request.json()
        loggedUserId = requestBody["loggedUserId"]
        del requestBody["loggedUserId"]
        testedPrompt = pd.Series(requestBody)

        prompt = testedPrompt["prompt"]
        del testedPrompt["prompt"]
        userPrompts = userPrompts[
            userPrompts["IsFixed"] == (1 if promptType == "fixed" else 0)
        ]
        del userPrompts["IsFixed"]

        # TODO: dodać normalizacje x'ów?
        x, y = (
            userPrompts.drop("UserId", axis=1).to_numpy(),
            userPrompts["UserId"].to_numpy(),
        )

        model.fit(x, y)
        y_pred = model.predict(np.array([testedPrompt.to_numpy()]))

        result = bool(y_pred[0] == np.int64(testedUserId))
        sqlInsert = (
            "INSERT INTO Results (result, prompt, userId, promptType,"
            f" loggedUserId) VALUES ('{int(result)}', '{prompt}',"
            f" '{testedUserId}', '{promptTypeId}', '{loggedUserId}')"
        )
        cursor.execute(sqlInsert)

    return result


@app.post("/fixed/{testedUserId}")
async def fixed(testedUserId: int, request: Request) -> bool:
    return await hasAuthenticated("fixed", testedUserId, request)


@app.post("/flex/{testedUserId}")
async def flex(testedUserId: int, request: Request) -> bool:
    return await hasAuthenticated("flex", testedUserId, request)


@app.get("/")
async def root() -> Any:
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
    uvicorn.run(app, host="0.0.0.0", port=8000, env_file=".env")
