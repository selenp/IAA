package com.accenture.svc.dir.iaa.entity;

import org.springframework.util.StringUtils;

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
        @Index(name = "IDX_Transfer_toEid", columnList = "toEid"),
        @Index(name = "IDX_Transfer_fromEid", columnList = "fromEid"),
})
public class TransferEvent {
    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String status; //borrow, return
    //	姓名(EID)
    private String toEid;
    //  日期 Effective Date
    private String borrowDate;
    //	资产编号Asset Tag
    private String assetTags;

    //	签名图片 signature_image
    private String signatureImage;

    //	备注 remarks
    private String remarks;
    //	操作者姓名(EID)
    private String fromEid;
    private Integer taskId;

    public String getFromEid() {
        return fromEid;
    }

    public void setFromEid(String fromEid) {
        this.fromEid = fromEid;
    }

    @PrePersist
    void preInsert() {
        if (StringUtils.isEmpty(this.borrowDate))
            this.borrowDate = sdf.format(new Date());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getToEid() {
        return toEid;
    }

    public void setToEid(String toEid) {
        this.toEid = toEid;
    }

    public String getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(String borrowDate) {
        this.borrowDate = borrowDate;
    }

    public String getAssetTags() {
        return assetTags;
    }

    public void setAssetTags(String assetTags) {
        this.assetTags = assetTags;
    }

    public String getSignatureImage() {
        return signatureImage;
    }

    public void setSignatureImage(String signatureImage) {
        this.signatureImage = signatureImage;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    @Override
    public String toString() {
        return "TransferEvent{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", eid='" + toEid + '\'' +
                ", borrowDate='" + borrowDate + '\'' +
                ", assetTags='" + assetTags + '\'' +
                ", signatureImage='" + signatureImage + '\'' +
                ", remarks='" + remarks + '\'' +
                ", fromEid='" + fromEid + '\'' +
                ", taskId=" + taskId +
                '}';
    }

    public String toReadable() {
        return "assetTags: " + assetTags;
    }
}

