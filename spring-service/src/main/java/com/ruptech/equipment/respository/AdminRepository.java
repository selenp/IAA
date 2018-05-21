package com.ruptech.equipment.respository;

import com.ruptech.equipment.entity.Admin;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface AdminRepository extends CrudRepository<Admin, Long>, JpaSpecificationExecutor<Admin> {

}
