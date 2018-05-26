package com.ruptech.equipment.entity;

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
        @Index(name = "IDX_Task_eid", columnList = "eid"),
})
public class Task {
    public static final String PROGRESS_RESERVED = "reserved";
    public static final String PROGRESS_PROCESSING = "processing";
    public static final String PROGRESS_FINISHED = "finished";
    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String eid;
    private String progress;//reserved, processing, finished
    private String dueDate;
    private String category;
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

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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


