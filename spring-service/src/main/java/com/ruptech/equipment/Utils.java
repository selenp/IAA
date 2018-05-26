package com.ruptech.equipment;

import java.util.Arrays;
import java.util.stream.Stream;

public class Utils {

    public static String eid2Email(String eid) {
        return String.format("%s@accenture.com", eid);

    }

    public static String[] concatArray(String[] array1, String[] array2) {
        String[] result = Stream.concat(Arrays.stream(array1), Arrays.stream(array2)).toArray(String[]::new);
        return result;
    }
}
