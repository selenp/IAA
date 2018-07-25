package com.accenture.svc.dir.iaa;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import javax.imageio.ImageIO;

public class ImageUtils {
    public static File saveImage(String imageName, String data, String ofPath) throws IOException {
        String partSeparator = ",";
        String encodedImg = data.replaceAll("\"", "").trim().split(partSeparator)[1];

        byte[] decodedImg = Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8));
        BufferedImage image = ImageIO.read(new ByteArrayInputStream(decodedImg));

        BufferedImage resized = resize(image, 1100, 850);

        Path destinationFile = Paths.get(
                ofPath,
                imageName);
        File destFile = destinationFile.toFile();
        destFile.getParentFile().mkdirs();

        ImageIO.write(resized, "png", destFile);

        //Files.write(destinationFile, decodedImg);

        return destFile;
    }

    private static BufferedImage resize(BufferedImage img, int height, int width) {
        Image tmp = img.getScaledInstance(width, height, Image.SCALE_DEFAULT);
        BufferedImage resized = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g2d = resized.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();
        return resized;
    }

}
