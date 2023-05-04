import numpy as np
import pandas as pd


def normalize(dat):
    """Normalize list elements to range [0, 1]."""
    mn = dat.min()
    mx = dat.max()
    return (dat - mn) / (mx - mn)


def split(dat,train_size):
    """Split list into 2 smaller lists given by fraction."""
    idx = int(len(dat) * train_size)
    return dat[:idx], dat[idx:]
