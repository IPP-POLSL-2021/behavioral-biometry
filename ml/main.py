from time import time

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

from knn import KNN
from utils import normalize, split

if __name__ == "__main__":
    df = pd.read_csv("data.csv")
    df.drop(columns=["sessionIndex", "rep"], axis=1, inplace=True)
    values = df.columns.values[1:]

    df = df.sample(frac=1)
    X = np.array(
        [
            np.array(normalize(df.loc[:, value]), dtype=np.float64)
            for value in values
        ],
        dtype=np.float64,
    )
    X = X.T
    Y = np.array(df.loc[:, "subject"], dtype=np.string_)

    x_train, x_test = split(X, 0.8)
    y_train, y_test = split(Y, 0.8)

    # best accuracy is with k=4, and is equal to 0.789, time taken: 0.66 [euclidean]
    # best accuracy is with k=4, and is equal to 0.885, time taken: 1.07 [manhattan]
    # knn time taken: 314seconds
    start = time()
    model = KNeighborsClassifier(n_neighbors=4, p=1)
    # model = KNN(k=4)
    model.fit(x_train, y_train)
    predicted = model.predict(x_test)
    accuracy = model.score(x_test, y_test)
    # accuracy = sum(
    #     [predicted[i] == y_test[i] for i in range(len(y_test))]
    # ) / len(y_test)
    print("time taken (seconds): " + str(time() - start))
    print(f"accuracy: {round(accuracy, 3)}")

    # plt.figure(figsize=(10,6))
    # plt.plot(range(1,142+1, 2),acc,color = 'blue',linestyle='dashed',
    #          marker='o',markerfacecolor='red', markersize=10)
    # plt.title('accuracy vs. K Value')
    # plt.xlabel('K')
    # plt.ylabel('Accuracy')
    # print("Maximum accuracy:-",max(acc),"at K =",acc.index(max(acc)) + 1)
    # plt.savefig("acc_k_correlation.png")
    # plt.show()