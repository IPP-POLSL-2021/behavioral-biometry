from time import time
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import numpy as np
import pandas as pd
from utils_erwin import normalize, split
# Load iris dataset
#data = datasets.load_breast_cancer()
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
# Split dataset into training and testing sets
#X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.4, random_state=0)

# Create SVM classifier object
start = time()
clf = svm.SVC(kernel='linear', C=1).fit(x_train, y_train)

# Predict the response for test dataset
y_pred = clf.predict(x_test)

# Compute the accuracy of the SVM classifier
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy} with Time: {time() - start}")
