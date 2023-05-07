import csv
from time import time

from sklearn import datasets, svm
from sklearn.ensemble import AdaBoostClassifier, RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import HistGradientBoostingClassifier
from utils import load_keystroke, normalize
from tqdm.contrib import tzip

delimiter = ";"
decimal = ","

def test(data, classifier):
    X_train, X_test, y_train, y_test = train_test_split(
        data.data, data.target, test_size=0.2
    )
    X_train, X_test = normalize(X_train), normalize(X_test)
    start = time()
    clf = classifier.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    total_time = time() - start
    accuracy = accuracy_score(y_test, y_pred)
    return round(accuracy, 4), round(total_time, 5)


names = [
    "Nearest Neighbors",
    "Linear SVM",
    "RBF SVM",
    "Decision Tree",
    "Random Forest",
    "Neural Net",
    "AdaBoost",
    "Naive Bayes",
    "Logistic Regression",
    "Gradient Boosting",
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
    LogisticRegression(max_iter=1000),
    HistGradientBoostingClassifier(max_iter=1000),
]

datasets = [
    ("Iris", datasets.load_iris()),
    ("Wine", datasets.load_wine()),
    ("Breast Cancer", datasets.load_breast_cancer()),
    ("Digits", datasets.load_digits()),
    ("KeyStrokeDynamics", load_keystroke()),
]

with open('accuracy_table.csv', 'w', newline='') as accuracy_file, open('time_table.csv', 'w', newline='') as time_file:
    accuracy_writer = csv.writer(accuracy_file, delimiter=delimiter, quotechar='"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
    time_writer = csv.writer(time_file, delimiter=delimiter, quotechar='"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
    
    # Write headers
    accuracy_writer.writerow(["Classifier"] + [name for name, _ in datasets])
    time_writer.writerow(["Classifier"] + [name for name, _ in datasets])
    
    for name, classifier in tzip(names, classifiers):
        accuracy_row = [name]
        time_row = [name]
        
        for dataset_name, dataset in datasets:
            accuracy, total_time = test(dataset, classifier)
            accuracy_row.append(f"{accuracy:.4f}".replace(".", decimal))
            time_row.append(f"{total_time:.5f}".replace(".", decimal))
            
        accuracy_writer.writerow(accuracy_row)
        time_writer.writerow(time_row)

