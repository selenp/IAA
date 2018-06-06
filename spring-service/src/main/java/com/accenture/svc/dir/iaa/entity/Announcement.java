package com.accenture.svc.dir.iaa.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(indexes = {
        @Index(name = "IDX_Announcement_eid", columnList = "eid"),
})
public class Announcement {
    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String eid;
    private Boolean deleteFlag;
    private String content;
    private String createdDate;
    /**
     * @see Admin#roles
     */
    private String assignToRole;

    @PrePersist
    void preInsert() {
        if (this.createdDate == null)
            this.createdDate = sdf.format(new Date());
        if (this.deleteFlag == null)
            this.deleteFlag=false;
    }

    public static SimpleDateFormat getSdf() {
        return sdf;
    }

    public static void setSdf(SimpleDateFormat sdf) {
        Announcement.sdf = sdf;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public Boolean getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Boolean deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getAssignToRole() {
        return assignToRole;
    }

    public void setAssignToRole(String assignToRole) {
        this.assignToRole = assignToRole;
    }
}


