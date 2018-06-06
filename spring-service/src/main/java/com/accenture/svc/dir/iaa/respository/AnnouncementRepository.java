package com.accenture.svc.dir.iaa.respository;

import com.accenture.svc.dir.iaa.entity.Announcement;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface AnnouncementRepository extends CrudRepository<Announcement, Integer>, JpaSpecificationExecutor<Announcement> {

}
