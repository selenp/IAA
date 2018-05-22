package com.ruptech.equipment.entity;

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
        @Index(name = "IDX_Transfer_eid", columnList = "eid"),
})
public class TransferEvent {
    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String status; //borrow, return
    //	姓名(EID)
    private String eid;
    //  有效日期 Effective Date
    private String effectiveDate;
    //	资产编号Asset Tag
    private String assetTags;

    //	签名图片 signature_image
    private String signatureImage;

    //	备注 remarks
    private String remarks;
    //	操作者姓名(EID)
    private String ownerEid;

    public String getOwnerEid() {
        return ownerEid;
    }

    public void setOwnerEid(String ownerEid) {
        this.ownerEid = ownerEid;
    }

    @PrePersist
    void preInsert() {
        if (StringUtils.isEmpty(this.effectiveDate))
            this.effectiveDate = sdf.format(new Date());
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

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(String effectiveDate) {
        this.effectiveDate = effectiveDate;
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
}

