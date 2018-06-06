package com.accenture.svc.dir.iaa.respository;

import com.accenture.svc.dir.iaa.entity.Task;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer>, JpaSpecificationExecutor<Task> {

}
