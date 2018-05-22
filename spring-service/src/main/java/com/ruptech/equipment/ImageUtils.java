package com.ruptech.equipment;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

public class ImageUtils {
    public static void saveImg(String imageName, String data, String ofPath) throws IOException {
        String partSeparator = ",";
        String encodedImg = data.replaceAll("\"", "").trim().split(partSeparator)[1];

        byte[] decodedImg = Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8));
        Path destinationFile = Paths.get(
                ofPath,
                imageName);
        Files.write(destinationFile, decodedImg);
    }

}
