from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

from knn import KNN
from utils import load_keystroke, normalize

if __name__ == "__main__":
    data = load_keystroke()
    X, Y = data.data, data.target
    X_train, X_test, y_train, y_test = train_test_split(X, Y, train_size=0.8)
    X_train, X_test = normalize(X_train), normalize(X_test)

    model = KNeighborsClassifier(n_neighbors=9, p=1)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(accuracy)
