package com.accenture.svc.dir.iaa;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

public class ImageUtils {
    public static File saveImage(String imageName, String data, String ofPath) throws IOException {
        String partSeparator = ",";
        String encodedImg = data.replaceAll("\"", "").trim().split(partSeparator)[1];

        byte[] decodedImg = Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8));
        Path destinationFile = Paths.get(
                ofPath,
                imageName);
        destinationFile.toFile().getParentFile().mkdirs();

        Files.write(destinationFile, decodedImg);

        return destinationFile.toFile();
    }

}
