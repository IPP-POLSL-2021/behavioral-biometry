from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
from time import time
# Load iris dataset
def dataset(data):
    X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2, random_state=0)
    start = time()
    clf = svm.SVC(kernel='linear', C=1).fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    total_time = time() - start
    return accuracy,total_time

print(f"Accuracy Iris {dataset(datasets.load_iris())}")
print(f"Accuracy Wine {dataset(datasets.load_wine())}")
print(f"Accuracy Breast Cancer {dataset(datasets.load_breast_cancer())}")
print(f"Accuracy Digits {dataset(datasets.load_digits())}")


