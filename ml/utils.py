import numpy as np
import pandas as pd


def normalize(dat: "pd.Series[float]") -> "pd.Series[float]":
    """Normalize list elements to range [0, 1]."""
    mn = dat.min()
    mx = dat.max()
    return (dat - mn) / (mx - mn)


def split(
    dat: np.ndarray[np.ndarray[np.float64]], train_size: np.float64
) -> tuple[
    np.ndarray[np.ndarray[np.float64]], np.ndarray[np.ndarray[np.float64]]
]:
    """Split list into 2 smaller lists given by fraction."""
    idx = int(len(dat) * train_size)
    return dat[:idx], dat[idx:]
