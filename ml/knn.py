from collections import Counter

import numpy as np
from scipy.spatial import distance


class KNN:
    def __init__(self, k: int):
        self.k = k

    def fit(self, X, Y):
        self.X_train = X
        self.Y_train = Y

    def predict(self, X):
        def predict_point(x):
            distances = np.array(
                [distance.cityblock(x, x_train) for x_train in self.X_train]
            )
            k_indices = np.argsort(distances)[: self.k]
            k_nearest_labels = np.array([self.Y_train[i] for i in k_indices])
            most_common = Counter(k_nearest_labels).most_common(1)
            return most_common[0][0]

        return np.array([predict_point(x) for x in X])
