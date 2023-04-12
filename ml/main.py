import pandas as pd
from random import randint
from sklearn.utils import shuffle
import numpy as np
from sklearn.model_selection import train_test_split

class ProcessingData:
    @staticmethod
    def normalize(dat: pd.Series) -> np.ndarray:
        """Normalize list elements to range [0, 1]."""
        mn = dat.min()
        mx = dat.max()
        return np.array([(x - mn) / (mx - mn) for x in dat])

    @staticmethod
    def shuffle(dat) -> pd.DataFrame:
        """Shuffle list elements."""
        ret = dat.copy()
        for i in reversed(range(1, len(ret))):
            j = randint(0, i)
            ret.iloc[i], ret.iloc[j] = ret.iloc[j], ret.iloc[i]
        return ret

    @staticmethod
    def split(dat: np.ndarray, fraction: float) -> tuple[np.ndarray, np.ndarray]:
        """Split list into 2 smaller lists given by fraction."""
        idx = int(dat.size * fraction)
        return dat[:idx], dat[idx:]

from collections import Counter

from time import time
class KNN:
    X_train: np.ndarray
    Y_train: np.ndarray
        
    def __init__(self, k: int = 3):
        self.k = k

    @staticmethod
    def euclidean_distance(X1: list[float], X2: list[float]) -> float:
        return sum([(a - b) ** 2 for a, b in zip(X1, X2)]) ** 0.5
    
    @staticmethod
    def argsort(dat: list[float]) -> list[int]:
        return sorted(range(len(dat)), key=dat.__getitem__)

    def fit(self, X: np.ndarray, Y: np.ndarray) -> None:
        self.X_train = X
        self.Y_train = Y

    def predict(self, X: np.ndarray) -> np.ndarray:
        def predict_point(x: float) -> float:
            start = time()
            distances = np.array([np.linalg.norm(x - x_train) for x_train in self.X_train])
            k_indices = KNN.argsort(distances)[:self.k]
            k_nearest_labels = [self.Y_train[i] for i in k_indices]
            most_common = Counter(k_nearest_labels).most_common(1)
            print(time() - start)
            return most_common[0][0]
        print(len(X))
        return np.ndarray([predict_point(x) for x in X])


df = pd.read_csv('data.csv')
df.drop(columns=['sessionIndex','rep'], axis=1, inplace=True)
df = shuffle(df)
values = df.columns.values[1:]
X = np.array([ProcessingData.normalize(df.loc[:, value]) for value in values])
X = X.T
Y = np.array(df.loc[:, "subject"])

# TODO: write own
x_train, x_test, y_train, y_test = train_test_split(X, Y)

from sklearn.neighbors import KNeighborsClassifier
import matplotlib.pyplot as plt
# best accuracy is with k=4, and is equal to 0.789
with open("result.txt", "w") as f:
    start = time()
    model = KNeighborsClassifier(n_neighbors=4)
    # model = KNN(k=4)
    model.fit(x_train, y_train)
    predicted = model.predict(x_test)
    accuracy = model.score(x_test, y_test)
    # accuracy = sum([predicted[i] == y_test[i] for i in range(len(y_test))]) / len(y_test)
    print("time taken (seconds): " + str(time() - start))
    print(f"accuracy: {round(accuracy, 3)}")
    for i in range(len(predicted)):
        f.write(f"Predicted: {predicted[i]}, actual: {y_test[i]}\n")

# plt.figure(figsize=(10,6))
# plt.plot(range(1,142+1, 2),acc,color = 'blue',linestyle='dashed', 
#          marker='o',markerfacecolor='red', markersize=10)
# plt.title('accuracy vs. K Value')
# plt.xlabel('K')
# plt.ylabel('Accuracy')
# print("Maximum accuracy:-",max(acc),"at K =",acc.index(max(acc)) + 1)
# plt.savefig("acc_k_correlation.png")
# plt.show()


# time taken for scikit learn knn: 0.66