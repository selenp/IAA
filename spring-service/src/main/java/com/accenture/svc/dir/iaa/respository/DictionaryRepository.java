package com.accenture.svc.dir.iaa.respository;

import com.accenture.svc.dir.iaa.entity.Dictionary;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface DictionaryRepository extends CrudRepository<Dictionary, Integer>, JpaSpecificationExecutor<Dictionary> {

}
