import pandas as pd
import numpy as np

def normalize(dat: pd.Series) -> pd.Series:
    """Normalize list elements to range [0, 1]."""
    mn = dat.min()
    mx = dat.max()
    return (dat - mn) / (mx - mn)

def split(dat: np.ndarray, train_size: float) -> tuple[np.ndarray, np.ndarray]:
    """Split list into 2 smaller lists given by fraction."""
    idx = int(len(dat) * train_size)
    return dat[:idx], dat[idx:]