"""Misc helpers."""
def clamp(x, lo=0, hi=100):
    return max(lo, min(hi, x))
