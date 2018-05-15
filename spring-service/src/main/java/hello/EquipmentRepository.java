package hello;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.AbstractMap;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface EquipmentRepository extends CrudRepository<Equipment, Long> {

    @Query("select distinct projectName from Equipment where projectName is not null")
    Iterable<String> findProjectNames();

    @Query("select distinct businessUnit from Equipment where businessUnit is not null")
    Iterable<String> findBusinessUnits();

    @Query("select distinct laptopModel from Equipment where laptopModel is not null")
    Iterable<String> findLaptopModels();
}
