import numpy as np
import time
from collections import Counter

class KNN:
    X_train: np.ndarray[np.ndarray[float]]
    Y_train: np.ndarray[np.ndarray[float]]
        
    def __init__(self, k: int):
        self.k = k
    
    @staticmethod
    def argsort(dat: np.ndarray) -> np.ndarray:
        return np.array(sorted(range(len(dat)), key=dat.__getitem__))

    def fit(self, X: np.ndarray, Y: np.ndarray) -> None:
        self.X_train = X
        self.Y_train = Y

    def predict(self, X: np.ndarray[np.ndarray[float]]) -> np.ndarray:
        def predict_point(x: np.ndarray) -> float:
            start = time()
            distances = np.array(np.linalg.norm(x - x_train) for x_train in self.X_train)
            # print(time() - start)
            k_indices = np.argsort(distances)[:self.k]
            k_nearest_labels = np.array(self.Y_train[i] for i in k_indices)
            most_common = Counter(k_nearest_labels).most_common(1)
            return most_common[0][0]
        print(len(X))
        return np.array([predict_point(x) for x in X])