package com.ruptech.equipment.respository;

import com.ruptech.equipment.entity.Task;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer>, JpaSpecificationExecutor<Task> {

}
