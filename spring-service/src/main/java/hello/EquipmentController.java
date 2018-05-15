package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller    // This means that this class is a Controller
@RequestMapping(path = "/equipment") // This means URL's start with /demo (after Application path)
public class EquipmentController {

    @Value("${signature.images.path}")
    private String signaturePath;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @PostMapping(path = "/")
    public @ResponseBody
    Equipment post(
            @RequestBody Equipment e
    ) {
        equipmentRepository.save(e);
        return e;
    }

    @GetMapping(path = "/dictionary")
    public @ResponseBody
    Map<String, Iterable<String>> dictionary() {
       Iterable<String> projectNames =  equipmentRepository.findProjectNames();
       Iterable<String> businessUnits =  equipmentRepository.findBusinessUnits();
       Iterable<String> laptopModels =  equipmentRepository.findLaptopModels();

       Map<String, Iterable<String>> dic = new HashMap();
       dic.put("projectNames", projectNames);
       dic.put("businessUnits", businessUnits);
       dic.put("laptopModels", laptopModels);

       return dic;
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody
    Optional<Equipment> get(@PathVariable(value = "id") Long id) {
        return equipmentRepository.findById(id);
    }

    @GetMapping(path = "/")
    public @ResponseBody
    Iterable<Equipment> getAll() {
        return equipmentRepository.findAll();
    }

    @PostMapping(path = "/{id}/signature")
    public @ResponseBody
    Equipment signature(@PathVariable(value = "id") Long id, @RequestBody String data
    ) throws Exception {
        String partSeparator = ",";
        String encodedImg = data.split(partSeparator)[1];

        String imageName = String.format("%d.png", id);
        byte[] decodedImg = Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8));
        Path destinationFile = Paths.get(
                signaturePath,
                imageName);
        Files.write(destinationFile, decodedImg);

        //save data to  signatureImage
        Equipment e = equipmentRepository.findById(id).get();
        e.setSignatureImage(imageName);
        equipmentRepository.save(e);

        return e;
    }
}
