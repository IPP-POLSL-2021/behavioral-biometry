import numpy as np
import pandas as pd
from sklearn.utils import Bunch


def normalize(dat):
    """Normalize list elements to range [0, 1]."""
    mn = dat.min()
    mx = dat.max()
    return (dat - mn) / (mx - mn)


def split(dat, train_size):
    """Split list into 2 smaller lists given by fraction."""
    idx = int(len(dat) * train_size)
    return dat[:idx], dat[idx:]


def load_keystroke():
    df = pd.read_csv("data.csv")
    df.drop(columns=["sessionIndex", "rep"], axis=1, inplace=True)
    values = df.columns.values[1:]
    df = df.sample(frac=1)
    X = np.array([np.array(normalize(df.loc[:, value])) for value in values])
    X = X.T
    Y = np.array(df.loc[:, "subject"])
    return Bunch(data=X, target=Y)
