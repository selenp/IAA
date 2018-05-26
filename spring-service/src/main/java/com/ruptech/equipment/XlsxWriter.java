package com.ruptech.equipment;

public interface XlsxWriter<T> {
    String[] getHeaders();

    Iterable<T> getIterableData();

    Object getValue(int colIndex, T data);
}
