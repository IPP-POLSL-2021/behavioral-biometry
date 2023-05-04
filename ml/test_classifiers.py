from time import time

from sklearn import datasets, svm
from sklearn.ensemble import AdaBoostClassifier, RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.tree import DecisionTreeClassifier

from utils import load_keystroke, normalize


def test(data, classifier):
    X_train, X_test, y_train, y_test = train_test_split(
        data.data, data.target, test_size=0.2
    )
    X_train, X_test = normalize(X_train), normalize(X_test)
    clf = classifier.fit(X_train, y_train)
    start = time()
    y_pred = clf.predict(X_test)
    total_time = time() - start
    accuracy = accuracy_score(y_test, y_pred)
    return round(accuracy, 2), round(total_time, 2)


names = [
    "Nearest Neighbors",
    "Linear SVM",
    "RBF SVM",
    "Decision Tree",
    "Random Forest",
    "Neural Net",
    "AdaBoost",
    "Naive Bayes",
]

classifiers = [
    KNeighborsClassifier(n_neighbors=9, p=1),
    svm.SVC(kernel="linear", C=1),
    svm.SVC(gamma=2, C=1),
    DecisionTreeClassifier(max_depth=5),
    RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1),
    MLPClassifier(alpha=1, max_iter=1000),
    AdaBoostClassifier(),
    GaussianNB(),
]

for name, classifier in zip(names, classifiers):
    print(f"\n{name}:\n")
    print(f"Accuracy Iris {test(datasets.load_iris(), classifier)}")
    print(f"Accuracy Wine {test(datasets.load_wine(), classifier)}")
    print(
        "Accuracy Breast Cancer" f" {test(datasets.load_breast_cancer(), classifier)}"
    )
    print(f"Accuracy Digits {test(datasets.load_digits(), classifier)}")
    print(f"Accuracy KeystrokeDynamics {test(load_keystroke(), classifier)}")
