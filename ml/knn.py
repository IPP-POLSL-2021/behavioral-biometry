from collections import Counter
from time import time

import numpy as np


class KNN:
    X_train: np.ndarray[np.ndarray[np.float64]]
    Y_train: np.ndarray[np.ndarray[np.float64]]

    def __init__(self, k: int):
        self.k = k

    def fit(
        self,
        X: np.ndarray[np.ndarray[np.float64]],
        Y: np.ndarray[np.ndarray[np.float64]],
    ) -> None:
        self.X_train = X
        self.Y_train = Y

    def predict(
        self, X: np.ndarray[np.ndarray[np.float64]]
    ) -> np.ndarray[str]:
        def predict_point(x: np.ndarray[np.float64]) -> str:
            distances = np.array(
                [np.linalg.norm(x - x_train) for x_train in self.X_train],
                dtype=np.float64,
            )
            # print(time() - start)
            k_indices = np.argsort(distances)[: self.k]
            k_nearest_labels = np.array(
                [self.Y_train[i] for i in k_indices], dtype=np.string_
            )
            most_common = Counter(k_nearest_labels).most_common(1)
            return most_common[0][0]

        print(len(X))
        return np.array([predict_point(x) for x in X], dtype=np.string_)
