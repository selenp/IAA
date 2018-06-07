package com.accenture.svc.dir.iaa.entity;

import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collection;

public class AssetTagHistory {
    private String id;
    //	姓名(EID)
    private String fromEid;
    //	姓名(EID)
    private String toEid;
    //  日期 Effective Date
    private String borrowDate;

    //	签名图片 signature_image
    private String signatureImage;

    //	备注 remarks
    private String remarks;

    public Object getTarget() {
        return target;
    }

    public void setTarget(Object target) {
        this.target = target;
    }

    private Object target;

    public String getFromEid() {
        return fromEid;
    }

    public void setFromEid(String fromEid) {
        this.fromEid = fromEid;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public static AssetTagHistory from(TransferEvent transferEvent) {
        AssetTagHistory ah = new AssetTagHistory();

        ah.setId("transfer" + transferEvent.getId());
        ah.setFromEid(transferEvent.getFromEid());
        ah.setToEid(transferEvent.getToEid());
        ah.setBorrowDate(transferEvent.getBorrowDate());
        ah.setSignatureImage(transferEvent.getSignatureImage());
        ah.setRemarks(transferEvent.getRemarks());
        ah.setTarget(transferEvent);
        return ah;
    }

    public static Collection<? extends AssetTagHistory> from(Delivery delivery) {
        Collection<AssetTagHistory> history = new ArrayList<>();
         // borrow
        if (!StringUtils.isEmpty(delivery.getBorrowDate())) {
            AssetTagHistory ah = new AssetTagHistory();
            ah.setId("delivery-borrow" + delivery.getId());
            ah.setToEid(delivery.getEid());
            ah.setBorrowDate(delivery.getBorrowDate());
            ah.setSignatureImage(delivery.getSignatureImage());
            ah.setRemarks(delivery.getRemarks());
            ah.setTarget(delivery);
            history.add(ah);
        }
        //return
        if (!StringUtils.isEmpty(delivery.getReturnDate())) {
            AssetTagHistory ah = new AssetTagHistory();
            ah.setId("delivery-return" + delivery.getId());
            ah.setFromEid(delivery.getEid());
            ah.setBorrowDate(delivery.getReturnDate());
            ah.setSignatureImage(delivery.getReturnSignatureImage());
            ah.setRemarks(delivery.getRemarks());
            ah.setTarget(delivery);
            history.add(ah);
        }
        return history;
    }
}

